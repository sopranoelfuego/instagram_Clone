import React from "react"
import Button from "@material-ui/core/Button"
import {auth} from  "../firebaseConfig"
import  {Link} from "react-router-dom"

const MenuBar=(props)=>{
    const {setOpenModal,setOpenModalSign,user,setOpenAddPost}=props
    
return (
    <div className="app__header">
      <Link to="/">
          <h4 style={{paddingTop:"20px",color:"GrayText"}}>ISoprano</h4>
      </Link>
      <div className="app__headerButton">
        {user?(
          <React.Fragment>
          <Link to="/Profile"><Button color="success" style={{textDecoration:"none !important"}}>profile</Button></Link>
          <Button color="success" onClick={()=>setOpenAddPost(true)}>add post</Button>
          <Button  color="success" onClick={()=>auth.signOut()}>log out</Button>

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