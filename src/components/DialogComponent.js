import React from "react"

import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import ListItem from "@material-ui/core/ListItem"
import List from  "@material-ui/core/List"


const DialogModal=({openPostDialog,setOpenDialog,id})=>{



    return(
        <Dialog onClose={()=>setOpenDialog(!openPostDialog)} open={openPostDialog}  aria-labelledby="form-dialog-title">
            <div>
            <DialogTitle><p><strong>choose one option among them...</strong></p></DialogTitle>
        
            <DialogContent>
             <DialogContText></DialogContText>
            <div>
              <List>
                <ListItem>
                   <p>edit post</p>   
                </ListItem>
                <ListItem>
                <p>delete post</p>
                </ListItem>
              </List>
             </div>
            </DialogContent>      
            </div>
        </Dialog>
    )
}
export default DialogModal