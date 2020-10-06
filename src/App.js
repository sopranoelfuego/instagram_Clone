import React ,{useState,useEffect}from 'react';
import logo from './logo.svg';
import Post from "./Post";
import './App.css';
import radium from "radium"
import Grid from "@material-ui/core/Grid"
import {makeStyles} from '@material-ui/styles'
import {db,auth} from "./firebaseConfig"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import { TextField, Button, DialogContentText } from '@material-ui/core';
import MenuBar from "./components/MenuBar"
import SignUpModal from "./components/SignUpModal"
import SignInModal from "./components/SigninModal"
import Alert from  "@material-ui/lab/Alert"




const useStyle=makeStyles((theme)=>({
  
   header__image:{
    width:"50px",
    height:"50px",
    opacity:"0.9",
    boxSizing:"border-box",
    
    borderRadius:"20px",
    margin:"20px  0 0 100px",
    

    objectFit:"container",
    ':hover':{
     opacity:"1.0",
     width:"55px",
    height:"55px",
    transition:"ease-out"

    }


   },
   paper:{
     width:"60%",
     height:"500px",

     border:"1px solid #f5f5f5",
     backgroundColor:"#FAFAFA"
   },
   containers:{
    alginItems:"center",
     height:"500px",
     marginTop:"70px",
     margin:"0",
     padding:"0"


   },
   post :{
     overflow:"scroll",
     maxHeight:"500px",
     width:"100%",
     boxSizing:"border-box",
     height:"500px",
     display:"block"

   },
   
   Dialog:{
     padding:"0 50px 0 50px",
     border:"1px solid grey",
     
   }

 
}))
const App=(props)=>{
   
const classes=useStyle()
const [postes,setPostes]=useState([
  
])
const [openSignupModal,setOpenModal]=useState(false)
const [openModalSignin,setOpenModalSign]=useState(false)
const [email,setEmail]=useState("")
const [userName,setUserName]=useState("")
const [password,setPassword]=useState("")
const [user,setUser]=useState(null)



// this hooks help to track userActivity wether the user is logged 
// or not then fires the event or keep trackin him
useEffect(()=>{
  // unsubscribe const help to takeoff onAnthStateChanged backend listener to the useEffect frontend listener once is poped
  const unsubscribe=auth.onAuthStateChanged(userAuth=>{
      if(userAuth){
        console.log("this mention user is logged in",userAuth)
        setUser(userAuth)
        // what to do  if user is logged
        if(userAuth.displayName){
          // in this block means dat user already exist then we don t want to reupdate his profile
        }else{
          // otherwise it s means that the user is nearly created then we update his profile
          userAuth.updateProfile({
            displayName:userName
          })
        }
      }else{
        // whata to do if user is no longer logged (is logout)
        setUser(null)
      }

  })

  return ()=>unsubscribe()
},[userName,user])
// this hook help to get a snapshot of post collection in other to use it datas
useEffect(() => {
    db.collection("post").onSnapshot(snapshot => {
      snapshot.docs.map(doc => console.log("doc content ",doc))
      setPostes(snapshot.docs.map(doc =>
        ({
          id:doc.id,
          post:doc.data()
        })
      ))

    })
}, [])

// this is just a simple useEffect for debugging
useEffect(()=>{

console.log("OpenModalSignin value after update:",openModalSignin)


},[openModalSignin])

  // function which help to get data from the form then submit them
  const signup=(e)=>{
    e.preventDefault()
    auth.createUserWithEmailAndPassword(email,password)
    .then(authUser => {return authUser.user.updateProfile({
      displayName:userName
    })})
    .catch(error=> alert(error.message))
    
  console.log("here is data from form: ",password,email)
    setOpenModal(false)
  }
  const signin=(e)=>{

   e.preventDefault()
   auth.signInWithEmailAndPassword(email,password).then(authuser => 
    <Alert severity="success" >welcome {authuser.displayName}...</Alert>)
   .catch(err => <Alert severity="error">{err.message}</Alert> )

   setOpenModalSign(false)
  


  }

  return (
    <div className="root">
    <MenuBar setOpenModalSign={setOpenModalSign} setOpenModal={setOpenModal} openModalSignin={openModalSignin} user={user}/>
    <SignUpModal openSignUpModal={openSignupModal} setUserName={setUserName} setEmail={setEmail} setPassword={setPassword} signup={signup} setOpenModal={setOpenModal} classes={classes}/>
    <SignInModal openModalSignin={openModalSignin} setEmail={setEmail} setPassword={setPassword} signin={signin} setOpenModalSign={setOpenModalSign} classes={classes}/>
    {/*posts*/}
       
      <div className="post__container">
      <div className="post">
           {postes.map(post =><Post key={post.id} id={post.id} post={post.post} />)}
           

         </div>
         <div className="post__online">
         <img src="/images/1.jpg" style={{width:"100%"}}/>
         </div>

      
         
    
    </div>
    </div> 


  )
}
export default App;
{/** <div className="post">
           {postes.map(post =><Post key={post.id} id={post.id} post={post.post} />)}

         </div>
         <div className="post__online">
         <img src="/images/1.jpg" style={{width:"100%"}}/>
         </div>
         {body()}

      */}