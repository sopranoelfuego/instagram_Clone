import React, { useState, useEffect } from 'react'
import { db ,auth,storage} from "../firebaseConfig"
import Avatar from "@material-ui/core/Avatar"
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container"
import Divider from "@material-ui/core/Divider"
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Tooltip from "@material-ui/core/Tooltip"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"
import {EachPost} from "./EachPost"
import {Row} from "antd"


const useStyle=makeStyles(theme=>({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
 
 fab :{
  width:theme.spacing(4),
  height:theme.spacing(4),
  transform:"translate(50%,-30%)",
  margin:"0",
  padding:"0"

 },
  button:{
      padding:" 0 9px 0 9px",
      fontSize:"30px",
      borderRadius:"50%",
      floatRight:"20%",
      marginTop:"-5%",
      
  },
  avatar:{

    width: theme.spacing(15),
    height:theme.spacing(15)
    
  },
  avatarSmall:{
    transform:"translate(50%,0)",
    width: theme.spacing(20),
    height:theme.spacing(20)
    
  }
}))
   const Profile = (props) => {

  const [posts, setPosts] = useState([])
  const [profilesChosen,setProfileChosen]=useState([])
  const [name, setName] = useState("")
  const [prenom, setPrenom] = useState("")
  const [profile,setProfile]=useState([])
  const [image, setImage] = useState(null)
  const [currentUser,setCurrentUser]=useState(null)

  const classes=useStyle()
  const userDisplayName=localStorage.getItem("displayName")
  
  
  // THIS HOOK WILL UPDATE THE PROFILE

  useEffect(()=>{
  let user=auth.currentUser
   let unsubscribe
  if(user){
    unsubscribe=db.collection("post").where("username","==",user.displayName).onSnapshot(
      snapchot => {
        setPosts(snapchot.docs.map(doc =>({
          id:doc.id,
          post: doc.data()
        })))
      }
    )
    return ()=>unsubscribe()
  }


  },[])
  useEffect(()=>{

    let unsubscribe
    let user=auth.currentUser

    if(user){
     unsubscribe = db.collection("profile").where("username","==",user.displayName).get().then(doc =>{
      setProfile(doc.docs.map(document=>({
        id:document.id,
        profile:document.data()
      })))

      })


  
    }
    setCurrentUser(auth.currentUser)

  },[])

  console.log("this is a debug fro profile which show profile info line 111 in Profile",profile)
  // THIS HOOK HELP TO GET THE CURRENT USER 
  useEffect(()=>{
   
    let user=auth.currentUser
    document.cookie="SameSite=none"
    if(user){

        db.collection("post").where("username","==",user.displayName).get()
        .then(doc =>{
          if(doc){
            setPosts(doc.docs.map(doc => (
              {
                id:doc.id,
                post:doc.data()
              }
            )))
          }else console.log("error of fetching data from profile")
        }).catch(error => console.log("error accure",error))
    
       
    }else{
      console.log("user not found from profile",null)

    }

   

  },[])

  
  

  // THIS METHODE HELP TO GET THE FILE(IMAGE) CHOSEN
  
  const handleProfileImage=(e)=>e.target.files[0]?setImage(e.target.files[0]):null
  
  // THIS HOOKS ONCE image IS MODIFIED WILL POP UP AND UPDATE PROFILE
  profile.map(profile => console.log("this is profilePic from Profile component line 148",profile.profile.profilePic))
useEffect(()=>{
      let unsubscribe
      let user =auth.currentUser

      if(image){
        let refImag=storage.ref(`profiles/${user.displayName}`).put(image)

        
    storage.ref(`profiles`).child(user.displayName).getDownloadURL()
    .then(

      urlGot=>{
        db.collection("profile").doc(user.email).update({
          profilePic:urlGot
        })

      }
    ).catch(erro => console.log(erro))

      }



},[image])
  return (

    <div  className="profile">
      { /* this scope will contain the profile avatar and informations below*/} 
      <Container maxWidth="md">

      <div className="profileUp">
      {/*this scope will contain the avatar the biggest one*/}
      <div className="profileAvatar">
      <Container>
      {auth.currentUser.photoURL != null?(<Avatar src={auth.currentUser.photoURL} alt="image" className={classes.avatar} /> ):(<Avatar className={classes.avatar}/>)}
        <label for="upload" >

            <div style={{backgroundColor:"grey",textAlign:"center",borderRadius:"50%",marginTop:"-10%",width:"20%",height:"25%",transform:"translate(60%,-70%)",alignItems:"center", margin:"0 0 20px 30%"}}>
            <Tooltip title="change profile picture..">
            <p style={{fontSize:"20px",}}>+</p>
            </Tooltip>
            </div>
           
    </label>
    <input type="file" id="upload" accept="image/*" style={{display:"none"}} onChange={handleProfileImage}/>


      </Container>
      
       </div>
      
       
      {/* this scope will contain th informatio of the user followers following post and location*/}
      <div className="profileInformation">
         {
           profile.map(profile=>(<Container>
            <div style={{display:"flex",flexDirection:"row",width:"100%",fontSize:"30px"}}>
            <div>{profile.profile.username}</div>
            <button onClick="">edit profile</button>
            </div>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}} className="profileInformationFollwers">
            {posts.length>1?(<div>{posts.length} posts</div>):<div>{posts.length}post</div>}
            {profile.profile.followers>1?(<div>{profile.profile.followers} followers</div>):(<div>{profile.profile.followers} follower</div>)}
            {profile.profile.following>1?(<div>{profile.profile.following} followings</div>):(<div>{profile.profile.following} following</div>)}
            </div>
            </Container>))
         }
      </div>
    </div>
    {/*end of first div which contain the avatar and informations*/}
    {/** this scope will contains post of the current user*/}
    <Divider/>
    <div className="allPost">
      {/*posts...*/}
      
      {
        posts.map(post => <EachPost key={post.id} post={post} />)
        // posts.map(post =><h2>post and post again</h2>)
      }
      
    </div>

    {/*end of the main container*/}

      </Container> 
    </div>
  )
}
export default Profile