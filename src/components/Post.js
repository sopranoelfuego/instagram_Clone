import React,{useState,useEffect} from "react"
import { Comment, Tooltip } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import radium from "radium";
import {db}from  "../firebaseConfig"
import {makeStyles}from "@material-ui/core/styles"
import Avatar from "@material-ui/core/Avatar"
import MoreVertIcon from  "@material-ui/icons/MoreVert"
import Skeleton from "@material-ui/lab/Skeleton"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"


const useStyle=makeStyles(theme=>(
     {
         root:{
            width:"100%",
            border:"1px solid lightgray",
            marginBottom:"45px",
            
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
    
const {username,avatar,caption,imageUrl,like,unlike}=props.post.post
const {id}=props.post
console.log("this is a id from Post",id)
const [comments,setComments]=useState([])
const [comment,setComment]=useState("")
const[action,setAction]=useState(false)

const [isLiked,setIsLiked]=useState(false)
const [isUnliked,setIsUnliked]=useState(false)

const classes=useStyle()
// this hook help to fetch comments from a specifique post 
useEffect(() => {
    let unsubscribe
    if(id){
        unsubscribe=db.collection("post").doc(id).collection("comments").onSnapshot(snapshot=>{
            setComments(snapshot.docs.map(doc=>doc.data()))
      
         })
    }

    
   return ()=>unsubscribe()


}, [id])

// ACTION METHODES=======
const handleLiked=()=>{
    let newLike=like
    newLike++
 if(id){
     console.log("here handleliked is clicked")
    db.collection("post").doc(id).update({
        like:newLike
    })
    setIsLiked(true)
    setAction(!action)
    
 }

}
const handleUnliked=()=>{
    let newUnLike=unlike
    newUnLike++
    if(id){
        db.collection("post").doc(id).update({unlike:newUnLike})
    }

    setIsUnliked(true)
    setAction(!action)
}


const postComment=(e)=>{
    e.preventDefault()
    let unsubscribe
    db.collection("post").doc(id).set({
       username:"" ,
       text:""
    })

}
    
    return (
        <div className={classes.root}>

           {/* header post__header*/ }
           <div className={classes.post_headerContainer}>
                 <div className={classes.post__header}>
                {avatar?<Avatar src={avatar} className={classes.post__avatar} />:<Avatar className={classes.post__avatar}>{username[0]}</Avatar>}
                <p className={classes.post__username}>{username}</p> 
     
                </div>
                <div className={classes.MoreVertIcon}>
                <IconButton aria-label="settings">
                <MoreVertIcon />
                 </IconButton>
                </div>
           </div>
            <div>
              
           {/*image post__image*/}
          
                <div>
                {imageUrl?<img src={imageUrl} alt="A" className={classes.post__image} />:<Skeleton animation="wave" variant="rect" width="100%" height="100%"/> }
            
           
                </div>
           {/*post caption*/}
                <div>
            {/**like dislike block */}    
                <div className={classes.like_dislike_container}>
            {

                action?(
                    <IconButton  className="likeButton" onClick={handleLiked} disabled color={isLiked?"primary":"default"} style={{backgroundColor:"lightgray"}}>
            <LikeOutlined  />{like}
            </IconButton>
                ):(<IconButton  className="likeButton" onClick={handleLiked}  color={isLiked?"primary":"default"}>
                <LikeOutlined  />{like}
                </IconButton>)
            }

            {
                action?(
                    <IconButton   className="unLikeButton" onClick={handleUnliked} disabled color={isUnliked?"danger":"default"}>
                    <DislikeOutlined />{unlike}
                </IconButton>

    
                ):(
                    <IconButton   className="unLikeButton" onClick={handleUnliked} color={isUnliked?"danger":"default"}>
                    <DislikeOutlined />{unlike}
                </IconButton>
    
                )
            }
                </div>
                {caption?(
                    <div className={classes.post__caption}><p><small style={{fontWeight:"bold",fontSize:"15px"}}>{username}</small> <small>{caption}</small></p></div>
                ):
               <Skeleton variant="text" width="100%"/>}
               
                </div>
          
            </div>
            {/** in this scope will contain coments */}

            <form>  
           <div className={classes.commentContainer}>
            {/**this scope  will contain input for comment*/}


            <input onChange={(e)=>setComment(e.target.value)} placeholder="add comment..." className={classes.input}/>
             <Button className={classes.Button}>post</Button> 

           </div>
           </form>

        </div>
    )
                
}
export default Post