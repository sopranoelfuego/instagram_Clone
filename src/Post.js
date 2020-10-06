import React from "react"
import radium from "radium";
import {makeStyles}from "@material-ui/core/styles"
import Avatar from "@material-ui/core/Avatar"

import Skeleton from "@material-ui/lab/Skeleton"

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
            ':hover':{
                opacity:"1.0",
                
                
            }
         },
         post__header:{
             display:"flex",
             alignItems:"center",
             borderBottom:"1px solid lightgray"

         },
         post__avatar:{
            margin:theme.spacing(1),
             zIndex:"-1"
         },
         post__username:{
             margingTop:"2px",
             width:"100%"   
         },
         post__caption:{
             padding:"10px",
             margin:"10px",
             width:"100%"

             
         }


     }
))
const Post=(props)=>{
    
const {username,avatar,caption,imageUrl}=props.post
const {id}=props.id
const classes=useStyle()

    const styleImage={
       
       height:"450px",
       objectFit:"contain",
       opacity:"0.99",
       margin:"0",
       ':hover':{
           opacity:"1.0",
           
       }
    }
    return (
        <div className={classes.root}>

           {/* header post__header*/ }
           <div className={classes.post__header}>
           {avatar?<Avatar src={avatar} className={classes.post__avatar} />:<Skeleton variant="circle"><Avatar/></Skeleton>
        }
           <p className={classes.post__username}>{username}</p> 

           </div>


           {/*image post__image*/}
           {/*post caption*/}
           {imageUrl?<img src={imageUrl} alt="A" className={classes.post__image} />:
           <Skeleton animation="wave" variant="rect" width="100%" height="100%"/> }

            {caption?<p className={classes.post__caption}>{caption}</p>:
           <Skeleton variant="text" width="100%"/>}
        </div>
    )

}
export default radium(Post)