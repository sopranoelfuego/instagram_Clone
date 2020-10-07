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
             
        

}))

const AddPost=(props)=>{
    const {openAddPost,setOpenAddPost}=props
    const [caption,setCaption]=  useState("")
    const [image,setImage]=useState(null)
    const [imageUrl,setImageUrl]=useState("")
    const [progressBar,setProgressBar]=useState(0)
   const classes=useStyle()

    return(
              <center>
              <Dialog open={openAddPost} onClose={()=>setOpenAddPost(!openAddPost)} className="app__addPost">
              <DialogTitle>
                 <Alert severity="info">please press on the plus button to download the picture..</Alert>
                 <h3>here i may put an progress bar </h3>
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
                    <span  className={classes.addPost__addIcon} aria-hidden="true">
                       +
                    </span>
                <input type="file" id="upload" style={{displaye:"none"}} hidden/>
                    </label>
                  
                  
                  </div>
                  <TextField  onChange={(e)=>setCaption(e.target.value)} variant="standard" label="add caption" className={classes.addPost__textfield}/>
              </div>
              </DialogContentText>
              <DialogActions>
                <Button color="danger" variant="contained" onClick={()=>setOpenAddPost(!openAddPost)}>cancel</Button>
                <Button color="primary" variant="contained"> post</Button>
              </DialogActions>
            </Dialog>
              </center>
           

    )


}
export default AddPost