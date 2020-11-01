import React,{useState,useEffect} from "react"
import Container from "@material-ui/core/Container"
import {makeStyles} from "@material-ui/core/styles"
import {db} from "../firebaseConfig"



const useStyle=makeStyles(theme =>({
    root:{
        width:"32%",
        backgroundColor:"grey"
    }
}))


const EachPost=({post})=>{
const {like,unliked,imageUrl}=post.post
const {id}=post.id
 
const [comments,setComments]=useState([])

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
      
  }
  return ()=>unsubscribe()
},[id])
const classes=useStyle()


    return (
        
          <div className={classes.root}>
          <Container>
              <img src={imageUrl} style={{width:"100%",objectFit:"contain"}}/>
              <p>{like}</p>
              <p>{unliked}</p>
              </Container>
          </div>
        
        
    )

}

export {EachPost}