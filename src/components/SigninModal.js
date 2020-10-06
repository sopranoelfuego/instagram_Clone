import React from 'react'

import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
const SigninModal=(props)=>{

    const {openModalSignin,setEmail,setPassword,signin,setOpenModalSign,classes}=props

    return (

       <Dialog open={openModalSignin} onClose={()=>setOpenModalSign(false)} aria-labelledby="form-dialog-title">
       <div className={classes.Dialog}>
       <form>
         <DialogTitle><h3 style={{textAlign:"center"}}><strong>signin please</strong></h3></DialogTitle>
         <DialogContent>
         <DialogContText> 

         </DialogContText>
         <TextField label="email" type="email" fullWidth autoFocus onChange={e=>setEmail(e.target.value)}/>
         <TextField label="password" type="password" fullWidth onChange={e => setPassword(e.target.value)}/>
         </DialogContent>
         <DialogActions>
           <Button color="primary" onClick={()=>setOpenModalSign(false)}>cancel</Button>
           <Button color="primary" type="submit" onClick={signin}>signin</Button>
         </DialogActions>
       </form>
       </div>
      
      </Dialog>

    )

}
export default SigninModal