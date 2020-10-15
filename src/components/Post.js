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

             margin:"30px",
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
    
const {username,avatar,caption,imageUrl,like,unlike}=props.post
const {id}=props.id
const [comments,setComments]=useState([])
const [comment,setComment]=useState("")
const [liked,setLikes]=useState(0)
const [isLiked,setIsLiked]=useState(false)
const [isUnliked,setIsUnliked]=useState(false)
const [unliked,setUnliked]=useState(0)
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
    let likeOnce=db.collection("post").onSnapshot(snapshot =>{
        console.log("this is a snapshot from firestore ",snapshot.docs.find(post=>post.id===id))
    })

}
// this useEffect is for jst debuging 
useEffect(()=>{
    let docRef
    if(id){
        docRef=db.collection("post").doc(id)
    docRef.get().then(doc=>{
        doc.exists?console.log("data from firestore",doc.data()):console.log("data not found")
    })
    }
    
    return ()=>docRef()

},[id])
    
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
                <LikeOutlined style={{ fontSize:"25px"}} />
                 <p style={{paddingRight:"10px"}}>{like}</p>
                <DislikeOutlined style={{fontSize:"25px"}}/>
                <p>{unlike}</p>
                </div>
                {caption?(
                    <div className={classes.post__caption}><p>{username}:<small>{caption}</small></p></div>
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