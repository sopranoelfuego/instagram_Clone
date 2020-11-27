import React,{useState,useEffect} from "react"
import Button from "@material-ui/core/Button"
import {auth} from  "../firebaseConfig"
import  {Link} from "react-router-dom"
import Avatar from "@material-ui/core/Avatar"
import {db}from '../firebaseConfig'

const MenuBar=(props)=>{
    const {setOpenModal,setOpenModalSign,user,setOpenAddPost}=props
    const [profile,setProfile]=useState([])
    
    //THIS HOOK FETCHS LISTEN TO THE SPECIFY USER PROFILE

    useEffect(()=>{
        let unsubscribe

      if(user){
          unsubscribe=db.collection("profile").where("username","==",user.displayName).onSnapshot(onSnapshot =>{
            setProfile(onSnapshot.docs.map(doc =>({
              id:doc.id,
              profile:doc.data()
            })))
          })
          return ()=> unsubscribe()
      }

    })
    const signout=()=>{
      localStorage.removeItem("displayName")
      auth.signOut()
    }
  
return (
    <div className="app__header">
      <Link to="/" style={{textDecoration:"none"}}>
          <h4 style={{paddingTop:"20px",color:"GrayText"}}>ISoprano</h4>
      </Link>
      <div className="app__headerButton">
        {(auth.currentUser!=null) && user ?(
          <React.Fragment>
         <div className="app__headerButton_buttons">
         <Link to="/Profile" style={{textDecoration:"none"}}><Button color="success" style={{textDecoration:"none !important"}}>profile</Button></Link>
         <Button color="success" onClick={()=>setOpenAddPost(true)}>add post</Button>
         <Button  color="success" onClick={()=>signout()}>log out</Button>
         
         
         </div>
          <div className="app__headerButton_avatar">
          {
              profile.map(profile => profile.profile.profilePic !=null?(
                <Avatar src={profile.profile.profilePic}/>
              ):(<Avatar></Avatar>))
          }
          </div>
          </React.Fragment>
          
        ):
        ( <React.Fragment>
          <Button color="success" onClick={()=>setOpenModal(true)}>sign up</Button>
        <Button color="success" onClick={()=>setOpenModalSign(true)}>sign in</Button>
        </React.Fragment>
        )
      }

      </div>
    </div>
)

}
export default MenuBar