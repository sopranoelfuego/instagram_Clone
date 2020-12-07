import React from 'react'
import Avatar from "@material-ui/core/Avatar"
import { makeStyles } from '@material-ui/core/styles';
import  Button from "@material-ui/core/Button"
import { BorderStyle, RoundedCorner } from '@material-ui/icons';



const useStyle=makeStyles(theme =>({

  root :{
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between",
      backgroundColor:`rgb(247, 244, 244)`,
      border:"1px solid peigne",
     borderRadius:"20%"
           

  },
  informationContainer :{
      display:"flex",
      flexDirection:"row"

  },
  avatar:{
      flex:"0"
  },
  name:{
      flex:"1"
  }


}) )
export const EachUser=(props)=>{
   const classes=useStyle()
  const {profilePic,username,email,followers}=props.profile
  const {id}=props

  console.log("those are the information from EachUser line 34",props.profile)
  return(
        
    <>
      <div className={classes.root}>
       
       <div className={classes.informationContainer}>
                   <div className={classes.avatar}>
                    {/**here i put avatar */}
                    <Avatar src={profilePic}/>
                    </div>
                    <div className={classes.name}>
                    {/**  and here i put username */}
                    <p>{username}</p>
                    {/* here i put email*/}
                     
                    <small>{email}</small>
                    </div>
       
       </div>
       <div className={classes.follow}>
       {/* here i put follow button*/}
       <Button variant='' onClick={()=> console.log("am clicked from eachUser")}>follow</Button>

       </div>
      </div>
    </>
  )

}
