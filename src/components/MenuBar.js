import React from "react"
import Button from "@material-ui/core/Button"
import {auth} from  "../firebaseConfig"

const MenuBar=(props)=>{
    const {setOpenModal,setOpenModalSign,user,setOpenAddPost}=props
    
return (
    <div className="app__header">
      <h4 style={{paddingTop:"20px",color:"GrayText"}}>ISoprano</h4>
      <div className="app__headerButton">
        {user?(
          <React.Fragment>
          <Button color="success" onClick={()=>setOpenAddPost(true)}>add post</Button>
          <Button  color="success" onClick={()=>auth.signOut()}>log out</Button>

          </React.Fragment>
        ):
        ( <React.Fragment>
          <Button color="success" onClick={()=>setOpenModal}>sign up</Button>
        <Button color="success" onClick={()=>setOpenModalSign(true)}>sign in</Button>
        </React.Fragment>
        )
      }

      </div>
    </div>
)

}
export default MenuBar