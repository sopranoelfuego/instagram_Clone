import React,{useState,useEffect} from "react"
import {Col} from "antd"
import Container from "@material-ui/core/Container"
import {makeStyles} from "@material-ui/core/styles"
import {db} from "../firebaseConfig"
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled, ConsoleSqlOutlined } from '@ant-design/icons';
import IconButton from "@material-ui/core/IconButton"

import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';




const useStyle=makeStyles(theme =>({
    root:{
        width:"32%",
        backgroundColor:"grey",
        border:"2px solid grey"
    },
    image :{
      width:"100%",
      height:"70%"  ,
      zIndex:"-1",

    },
    information:{
        zIndex:"1",
        position:"relative",
        button:"30%"
        
    }
}))


const EachPost=({post})=>{
const {like,unliked,imageUrl}=post.post
const {id}=post.id
 
const [comments,setComments]=useState([])
// THIS HOOK IS FETCHS COMMENTS 
useEffect(()=>{
    let unsubscribe
  if(id){
      unsubscribe=db.collection("post").doc(id).collection("comments").get()
      .then(
          (doc) => {
              if(doc){
                  setComments(doc.docs.map(comment =>({
                      id:comment.id,
                      comment:comment.data()
                  })))
              }

          })
          .catch(error => console.log("error pay attention..",error))
          return ()=>unsubscribe()
      
  }

},[])
const classes=useStyle()

    return (
        
          <div className={classes.root}>
          <Container>
             <div  className={classes.image}>
              <img src={imageUrl} style={{width:"100%",objectFit:"contain"}}/>
             </div>
              <div className={classes.information}>
                 <span>
                  
                     <LikeOutlined/> {like}
                   
                 </span>
                 <span>
                   
                    <DislikeOutlined/>{unliked}
                   
                 </span>
                 <span>
                    <CommentOutlinedIcon/>{comments.length}
                 </span>
              </div>
              </Container>
          </div>
        
        
    )

}

export {EachPost}