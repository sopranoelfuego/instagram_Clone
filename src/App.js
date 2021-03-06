import React ,{useState,useEffect}from 'react';
import {Route,Switch} from "react-router-dom"
import logo from './logo.svg';
import Post from "./components/Post";
import './App.css';
import Grid from "@material-ui/core/Grid"
import {makeStyles} from '@material-ui/styles'
import {db,auth} from "./firebaseConfig"
import MenuBar from "./components/MenuBar"
import SignUpModal from "./components/SignUpModal"
import SignInModal from "./components/SigninModal"
import Alert from  "@material-ui/lab/Alert"
import AddPost from "./components/AddPost"
import Profile from "./components/Profile"
import LandingPage from "./components/LandingPage"
import firebase from "firebase"





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
const [openAddPost,setOpenAddPost]=useState(false)
const [user,setUser]=useState(null)
const [exemple,setExemple]=useState("")



// this hooks help to track userActivity wether the user is logged 
// or not then fires the event or keep trackin him



useEffect(()=>{
  // unsubscribe const help to takeoff onAnthStateChanged backend listener to the useEffect frontend listener once is poped
  const unsubscribe=auth.onAuthStateChanged(userAuth=>{
      if(userAuth){

        setUser(userAuth)
        console.log("this is user from App line 105",user)
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
        // what to do if user is no longer logged (is logout)

        console.log("error  user not found from App line 105",user)
        setUser(null)

      }

  })

  return ()=>unsubscribe()
},[userName,user])


  // function which help to get data from the form then submit them
  const signup=(e)=>{
    e.preventDefault()
    auth.createUserWithEmailAndPassword(email,password)
    .then(authUser => {return authUser.user.updateProfile({
      displayName:userName
    })})
    .catch(error=> alert(error.message))
    
    db.collection("profile").doc(email).set({
      
      username:userName,
      profilePic:"",
      followers:[],
      following:[],
      posts:0,
      email:email,
      password:password,

    })
    setOpenModal(true)
    localStorage.setItem("displayName",userName)

  }
  const signin=(e)=>{
    
   e.preventDefault()
   auth.signInWithEmailAndPassword(email,password).then(authuser => {
            if(!localStorage.getItem("displayName")){
              localStorage.setItem("displayName",authuser.displayName)
            
        }
   }
      
       
    )
   .catch(err => <Alert severity="error">{err.message}</Alert> )

   setOpenModalSign(false)

  }
  return (
    <div className="root">


    <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route path="/Profile" component={Profile} />
    </Switch>



    <MenuBar setOpenModalSign={setOpenModalSign} setOpenModal={setOpenModal} openModalSignin={openModalSignin} user={user} setOpenAddPost={setOpenAddPost}/>
    <SignUpModal openSignUpModal={openSignupModal} setUserName={setUserName} setEmail={setEmail} setPassword={setPassword} signup={signup} setOpenModal={setOpenModal} classes={classes}/>
    <SignInModal openModalSignin={openModalSignin} setEmail={setEmail} setPassword={setPassword} signin={signin} setOpenModalSign={setOpenModalSign} classes={classes}/>
     
    {/**i make this to bind the crash with displayName
       which need to be in ternair condition  or to be destructuring
 */}
   { user ? <AddPost openAddPost={openAddPost} setOpenAddPost={setOpenAddPost} username={user.displayName}/>:console.log("error user not found on App components line 191")}

  
    </div> 


  )
}
export default App;
