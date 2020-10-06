import React from 'react'
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import { TextField, Button, DialogContentText } from '@material-ui/core';


const  SignUpModal=(props) =>{
    const {openSignUpModal,setUserName,setEmail,setPassword,signup,setOpenModal,classes}=props
  
       
        return(
          <Dialog open={openSignUpModal} onClose={()=>setOpenModal(false)} aria-labelledby="form-dialog-title">
              <div className={classes.Dialog}>
              <form>
              
              <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
              <DialogContent>
                <DialogContentText>
                 
                </DialogContentText>
               <TextField 
                  id="userName"
                  onChange={e=>setUserName(e.target.value)}
                  type="text"
                  label="username"
                  fullWidth
      
               />
                <TextField id="standard-search" 
                label="email address" 
                type="email" 
                fullWidth
                onChange={e=>setEmail(e.target.value)}
                />
                <TextField
                  id="standard-helperText"
                  label="password"
      
                  type="password"
                  fullWidth
                  onChange={e=>setPassword(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={()=>setOpenModal(false)} color="primary">
                  Cancel
                </Button>
                <Button type="submit" onClick={signup} color="primary">
                  validate
                </Button>
              </DialogActions>
              
              </form>
              </div>
            </Dialog>
        )
       
}
export default SignUpModal