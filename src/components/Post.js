import React,{useState,useEffect} from "react"
import firebase from "firebase"
import { Comment, Tooltip } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled, ConsoleSqlOutlined } from '@ant-design/icons';
import radium from "radium";
import {db}from  "../firebaseConfig"
import {makeStyles}from "@material-ui/core/styles"
import Avatar from "@material-ui/core/Avatar"
import MoreVertIcon from  "@material-ui/icons/MoreVert"
import Skeleton from "@material-ui/lab/Skeleton"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import {auth} from "../firebaseConfig"
import Alert from "@material-ui/lab/Alert"
import  DialogModal from "./DialogComponent"




const useStyle=makeStyles(theme=>(
     {
         root:{
            width:"100%",
            border:"1px solid lightgray",
            marginBottom:"45px",
            borderSizing:"border-box",

            
         },
         post__image:{
             width:"100%",
             height:"70%",
            
            objectFit:"contain",
            float:"left",
            margin:"0",
            marginBottom:"10px",
            ':hover':{
                opacity:"1.0",
                
                
            }
         },
         post_headerContainer:{

             display:"flex",
             flexDirection:"row",
             justifyContent:"space between",
             alignItems:"stretch",
             borderBottom:"1px solid lightgray"


         },
         post__header:{
             width:"90%",

             display:"flex",
             alignItems:"center",


         },
          MoreVertIcon:{
              width:"10%",
              paddingTop:"10px",
              zIndex:"-1"
            },
         post__avatar:{
            margin:theme.spacing(1),
             zIndex:"-1",

         },
         post__username:{
             margingTop:"2px",
             width:"100%"   
         },
         post__caption:{

            padding:"5px 0 10px 24px",
             width:"100%",
            


             
         },
         like_dislike_container:{
             padding:"0 0 0 20px",

             display:"flex",
             flexDirection:"row",
             justifyContent:"start",
            
         },
         commentContainer:{
             display:"flex",
             borderTop:"1px solid #BDBDBD"
         },
         input:{
             flex:"1",
             paddingRight:"20px",
             border:"none",
             padding:"10px",
             " :focus":{
                 border:"none"
             }
         },
         Button:{
             flex:"0",
             color:"#119CF6"
         }


     }
))
const Post=(props)=>{
    
const {username,caption,imageUrl,like,unliked,likedBy}=props.post.post

const {id}=props.post
const {openDeletePost,setOpenDeletePost,openPostDialog,setOpenPostDialog}=props



const [user,setUser]=useState(null)

const [comments,setComments]=useState([])
const [comment,setComment]=useState("")
const[action,setAction]=useState(false)
const [userLogged,setUserLogged]=useState(false)

const [isLiked,setIsLiked]=useState(false)
const [isUnliked,setIsUnliked]=useState(false)
const [alreadyLiked,setalreadyLiked]=useState(false)
const [forwardName,setForwardName]=useState("")
const [avatar,setAvatar]=useState(null)



const classes=useStyle()
// THIS HOOK HELP TO GET THE SPECIFIED AVATAR FROM PROFILE WHERE username==this.username from post
useEffect(()=>{
  let unsubscribe
  let data
  if(username){
      unsubscribe=db.collection("profile").where("username","==",username).get()
      .then(profileGot=>{
          profileGot.docs.map(doc=> setAvatar({
              id:doc.id,
              avatar:doc.data()
          }))
      })

  }

},[])
// this hook help to watch wether the post is liked by it owner
useEffect(()=>{
    let nameFound
    if(user){
        nameFound=likedBy.find(name => name==user.displayName)
        if(nameFound){
            setalreadyLiked(!alreadyLiked)
        }
       setForwardName(likedBy.find(name=> name != user.displayName))
       
    }
    // 71025424: julio

},[likedBy,user])
// this hook help to fetch comments from a specifique post 
useEffect(() => {
    let unsubscribe
    
 if(id){
    unsubscribe=db.collection("post").doc(id).collection("comments").orderBy("createdAt").onSnapshot(snapshot=>{
        setComments(snapshot.docs.map(doc=>({
            id:doc.id,
            comment:doc.data()
        })))

     })
  }    
    return ()=>unsubscribe()
},[id])
// THIS HOOKS HELP  TO GET THE CURRENT USER
useEffect(()=>{
    let user=auth.currentUser
   
    if(user){
        setUser(user)
        setUserLogged(false)
        setAction(false)
        console.log("user from Post",user)
    }else{
       console.log("current user",user)
    }

},[])
// LISTEN TO THE USER CHANGE AUTHENTIFICATION
useEffect(()=>{
    let unsubscribe

    unsubscribe=auth.onAuthStateChanged( user=>{
        if(user){
            setUser(user)
            // setAction(!action)
            setUserLogged(false)
        }
    }

    )
},[isLiked,isUnliked])

// ACTION METHODES=======
const handleLiked=()=>{
    
    let newLike=like
    newLike++
    likedBy.push(user.displayName)

    // like:0,
    // likedBy:[]
            
    if(id){

        db.collection("post").doc(id).update({like:newLike,likedBy})
        setIsLiked(true)
        setAction(!action)
        
    }

}
const handleUnliked=()=>{
    let newUnLike=unliked
    newUnLike++
    if(id){
        db.collection("post").doc(id).update({unliked:newUnLike})
    }

    setIsUnliked(true)
    setAction(!action)
  
}

// THIS METHODE HELP TO ACTIVATE THE ALERT WICH SHOW THE USER IS NOT LOGGED
const activate=()=>{
    setUserLogged(!userLogged)
    console.log("user is not logged from activate methode",userLogged)
    setTimeout(()=>{
         console.log("3 secs passe here ...")
       setUserLogged(!userLogged)
       console.log("value of userLogged from active method",userLogged)
    },3000)
}
// THIS HOOK HELP TO DISPLAY ALERT OF REMINDING TO LOGGIN OR CREATE AN ACCOUNT
const displayUserLoggedAlert=()=>setUserLogged(userLogged)
useEffect(()=>{
    displayUserLoggedAlert()
    console.log("value of userLogged from useEffect",userLogged)

},[isLiked,isUnliked,comment])



const postComment=(e)=>{
    e.preventDefault()
     

    if(user.displayName){
        db.collection("post").doc(id).collection("comments").add({
            createdAt:firebase.firestore.FieldValue.serverTimestamp() ,
            username:user.displayName,
            text:comment
        })
        console.log("post posted...")
        setComment("")
    }else console.log("error user post not posted..")

 
}
    
    return (
        <div className={classes.root}>
            <DialogModal openPostDialog={openPostDialog} setOpenDialog={setOpenPostDialog} id={id}/>
           {/* header post__header*/ } 
           <div className={classes.post_headerContainer}>
                 <div className={classes.post__header}>
                   {avatar ?(<Avatar src={avatar.avatar.profilePic} className={classes.post__avatar}/>):(<Avatar className={classes.post__avatar}/>) }
                  
                <p className={classes.post__username}>{username}</p> 
     
                </div>
                <div className={classes.MoreVertIcon} >
                <IconButton onClick={()=>console.log("am clicked")}  aria-label="upload picture" component="span">
                <MoreVertIcon  />
                 </IconButton>
                </div>
           </div>
            <div>
              
           {/*image post__image*/}
          
                <div>
                {imageUrl?<img onDoubleClick={user?handleLiked:activate} src={imageUrl} alt="A" className={classes.post__image} />:<Skeleton animation="wave" variant="rect" width="100%" height="100%"/> }
            
           
                </div>
           {/*post caption*/}
                <div>
            {/**like dislike block */}    
                        <div className={classes.like_dislike_container}>
                                    {

                                        alreadyLiked?(
                                            <IconButton  className="likeButton" onClick={user?handleLiked:activate} disabled color={isLiked?"primary":"default"} style={{backgroundColor:"lightgray"}}>
                                    <LikeOutlined  />{like}
                                    </IconButton>
                                        ):(<IconButton  className="likeButton" onClick={user?handleLiked:activate}  color={isLiked?"primary":"default"}>
                                        <LikeOutlined  />{like}
                                        </IconButton>)
                                    }

                                    {
                                        alreadyLiked?(
                                            <IconButton   className="unLikeButton" onClick={handleUnliked} disabled color={isUnliked?"danger":"default"}>
                                            <DislikeOutlined />{unliked}
                                        </IconButton>

                            
                                        ):(
                                            <IconButton   className="unLikeButton" onClick={handleUnliked} color={isUnliked?"danger":"default"}>
                                            <DislikeOutlined />{unliked}
                                        </IconButton>
                            
                                        )
                                    }
                        </div>
                        {/*CLOSE RESERVED FOR "LIKED BY" SENTENSE*/}
                    {
                        alreadyLiked && likedBy.length>1 && (likedBy.length-2>0)?(
                            <div style={{paddingLeft:"30px"}}><p style={{fontSize:"13px"}}>liked by <strong>you</strong> and {likedBy.length-1} </p></div>
                        ):null
                    }
                  
                    {
                        alreadyLiked && likedBy.length===2?(
                            <div style={{paddingLeft:"30px"}}><p  style={{fontSize:"13px"}}>liked by <strong>you </strong> and <strong>{forwardName}</strong></p></div>
                        ):null
                    }
                    {alreadyLiked && likedBy.length==1?(
                        <div style={{paddingLeft:"30px"}}><p style={{fontSize:"13px"}}>liked by <strong>you</strong></p></div>
                    ):null}
                    {alreadyLiked && likedBy.length==1 && (likedBy.length-2==0)?(
                        <div style={{paddingLeft:"30px"}}><p style={{fontSize:"13px"}}>liked by <strong>you</strong></p></div>
                    ):null}
                    
                    {!alreadyLiked && likedBy.length==1?(
                        <div style={{paddingLeft:"30px"}}><p style={{fontSize:"13px"}}>liked by <strong>{forwardName}</strong></p></div>
                    ):null}
                     
                    {!alreadyLiked && likedBy.length==3?(
                        <div style={{paddingLeft:"30px"}}><p style={{fontSize:"13px"}}>liked by <strong>{forwardName}</strong> and {likedBy.length-1} other</p></div>
                    ):null}
                    
                    {!alreadyLiked && likedBy.length>2 && likedBy.length>3?(
                        <div style={{paddingLeft:"30px"}}><p style={{fontSize:"13px"}}>liked by <strong>{likedBy[0]}</strong> and {likedBy.length-1} others</p></div>
                    ):null}
                    {
                        !alreadyLiked && likedBy.length==2?(
                            <div style={{paddingLeft:"30px"}}><p style={{fontSize:"13px"}}>liked by <strong>{likedBy[0]}</strong> and <strong>{forwardName}</strong></p></div>
                        ):null
                    }
                    {caption?(
                                    <div className={classes.post__caption}><p><small style={{fontWeight:"bold",fontSize:"15px"}}>{username}</small> <small>{caption}</small></p></div>
                                ):
                            <Skeleton variant="text" width="100%"/>}
                    
                   
                </div>
          
            </div>
            {/** in this scope will contain coments */}
               {userLogged?(<Alert severity="error" >you must log in to like a post...</Alert>):null}      
            <form>  
              {/**this scope  will contain input for comment*/}
              
            <div style={{paddingBottom:"10px"}}>
             {comments.map(comment =><p style={{paddingLeft:"30px",fontSize:"15px"}} ><strong>{comment.comment.username}</strong> {comment.comment.text}</p>)}
            
            </div>
           {user?(<div className={classes.commentContainer}>
           
            
            <input onChange={(e)=>setComment(e.target.value)} value={comment} placeholder="add comment..." className={classes.input}/>
             <Button className={classes.Button} onClick={postComment}>post</Button> 

           </div>
           ):(<div className={classes.commentContainer}>
           
            
           <input onChange={(e)=>setComment(e.target.value)} value={comment} placeholder="add comment..." className={classes.input} disabled/>
            <Button disabled className={classes.Button} onClick={postComment}>post</Button> 

          </div>)
          }
           </form>

        </div>
    )
                
}
export default Post