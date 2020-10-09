import React from "react"
import radium from "radium";
import {makeStyles}from "@material-ui/core/styles"
import Avatar from "@material-ui/core/Avatar"
import MoreVertIcon from  "@material-ui/icons/MoreVert"
import Skeleton from "@material-ui/lab/Skeleton"
import IconButton from "@material-ui/core/IconButton"

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


           {/*image post__image*/}
           {/*post caption*/}
           {imageUrl?<img src={imageUrl} alt="A" className={classes.post__image} />:<Skeleton animation="wave" variant="rect" width="100%" height="100%"/> }

            {caption?<p className={classes.post__caption}>{caption}</p>:
           <Skeleton variant="text" width="100%"/>}
        </div>
    )

}
export default radium(Post)