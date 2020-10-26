import React,{useState} from 'react'
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContentText from '@material-ui/core/DialogContentText'
import {makeStyles} from "@material-ui/styles"
import Alert from "@material-ui/lab/Alert"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton"
import {storage,db} from "../firebaseConfig"
import firebase from "firebase"
import LinearProgress from "@material-ui/core/LinearProgress"


const useStyle=makeStyles(theme=>({
     container__div:{
        textAlign:"center",
        backgroundColor:"red",

     },
     addPost__container :{
         
         textAlign:"left"

        
     }
     ,
     addPost__textfield :{

         marginLeft:"10px"

     },
     addPost__addIcon:{
         fontSize:"50px",
         color:"black",
         ":hover":{
           color:"blue"
         }
     },
     addPost__imageContainer:{
            height:"200px",
            border:"1px solid #3870AF",
            margin:"0px 10px 10px 10px ",
            alignItems:"center",
            textAlign:"center",paddingTop:"10%",boxSizing:"border-box"},
            "& hover":{
                color:"bleu"
            }
             ,
             progressBar:{
               width:"100%"
             }
        

}))

const AddPost=({openAddPost,setOpenAddPost,username})=>{

    const [caption,setCaption]=  useState("")
    const [image,setImage]=useState(null)
    const [imageUrl,setImageUrl]=useState("")
    const [progressBar,setProgressBar]=useState(0)
   const classes=useStyle()

   const handleImageChange=(e)=>e.target.files[0]?setImage(e.target.files[0]):null
  //  this function set reference to the images in storage which will contain the image and then use the time wich
  //this process will take to update the progressBar
   const uploadImage=()=>{
     const uplaodRef=storage.ref(`images/${image.name}`).put(image)
     uplaodRef.on("state_changed",snapShoot=>{
      //  then here we can update progressBar variable

      const progress=Math.round(
        (snapShoot.bytesTransferred / snapShoot.totalBytes)*100
      )
      setProgressBar(progress)


     },
    //  here i catch error and the as is not a friendly message i 
    // console it hahah lol
     err=>console.log(err),
    //THIS CALLBACK FUNCTION BRIEF GET THE URL OF THE IMAGE FROM THE DATABASE THEN UPDATE THE POST
     ()=>{
      storage.ref("images").child(image.name).getDownloadURL().then(
        url=>{
                      // so we can upload the whole post in db
          db.collection("post").add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            caption:caption,
            imageUrl:url,
            username:username,
            like:0,
            likedBy:[]
            




          }

          )
          setProgressBar(0)
          setCaption("")
          setImage(null)
        }

      )

     }
     )
   }

    return(
              <center>
              <Dialog open={openAddPost} onClose={()=>setOpenAddPost(!openAddPost)} className="app__addPost">
              <DialogTitle>
                 <Alert severity="info">please press on the plus button to download the picture..</Alert>
                {image? <LinearProgress  value={progressBar} max="100" variant="determinate" className={classes.progressBar}/>:null}
              </DialogTitle>
              <DialogContentText>
              <div className={classes.addPost__container}>
                  <div className={classes.addPost__imageContainer}>
                   
                  {/*<label for="upload">  
                        <span>
                        <IconButton>
                        <AddIcon className={classes.addPost__addIcon} />
                        </IconButton></span>
                    
                    <input type="file"id="upload" name="choose" style={{display:"none"}}/>
            </label>*/}
                  <label for="upload">
                    {image?<img src={image} style={{width:"100%",height:"100%"}}/>
                  :<span  className={classes.addPost__addIcon} aria-hidden="true">
                  +
               </span>
                  }
                <input type="file" id="upload" style={{display:"none"}} hidden onChange={handleImageChange}/>
                    </label>
                  
                  
                  </div>
                  <TextField  onChange={(e)=>setCaption(e.target.value)} variant="standard" label="add caption" className={classes.addPost__textfield}/>
              </div>
              </DialogContentText>
              <DialogActions>
                <Button color="danger" variant="contained" onClick={()=>setOpenAddPost(!openAddPost)}>cancel</Button>
                <Button color="primary" variant="contained" onClick={()=>uploadImage()}> post</Button>
              </DialogActions>
            </Dialog>
              </center>
           

    )


}
export default AddPost