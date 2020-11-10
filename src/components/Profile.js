import React, { useState, useEffect } from 'react'
import { db ,auth} from "../firebaseConfig"
import Avatar from "@material-ui/core/Avatar"
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container"
import Divider from "@material-ui/core/Divider"
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {EachPost} from "./EachPost"
import {Row} from "antd"
import {storage} from "../firebaseConfig"

const useStyle=makeStyles(theme=>({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
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
  const [name, setName] = useState("")
  const [prenom, setPrenom] = useState("")
  const [profile,setProfile]=useState([])
  const [image, setImage] = useState(null)
  const [currentUser,setCurrentUser]=useState(null)
  const classes=useStyle()
  // THIS HOOK HELP TO RETRIEVE THE CURRENT USE WHICH IS LOGGED
  // useEffect(()=>{
  //   let user = auth.currentUser
  //   if(user){
  //       setCurrentUser(user)
  //       console.log("this is user from currentUser",user)
  //   }else{
  //     console.log("user not found from profile",null)

  //   }
  // },[])

  // THIS HOOK WILL UPDATE THE PROFILE
  useEffect(()=>{
      let user =auth.currentUser
      db.collection("profile").where("username","==",user.displayName).get()
      .then(doc =>{
        setProfile(doc.docs.map(document=>({
          id:document.id,
          profile:document.data()
        })))
        .catch(error=>console.log("error profile not found",error))
      })

  },[])
  useEffect(()=>{
    let user = auth.currentUser

    if(user){
      if(user.displayName){

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
    
       }
    }else{
      console.log("user not found from profile",null)

    }

   

  },[])

  
  const onSubmit = (e) => {
    e.preventDefault()
    const cont = { name: name, place: prenom }
    db.collection("post").doc("ville").set({
      ville: { ...cont }
    }).then(place => console.log("success", place)).catch(err => console.log("error over here", err))
  }
  return (
    <div  className="profile">
      { /* this scope will contain the profile avatar and informations below*/} 
      <Container maxWidth="md">

      <div className="profileUp">
      {/*this scope will contain the avatar the biggest one*/}
      <div className="profileAvatar">
      <Container>
      <Avatar src="./images/1.jpg" className={classes.avatar} /> 
      </Container>
      
       </div>
      
       
      {/* this scope will contain th informatio of the user followers following post and location*/}
      <div className="profileInformation">
         <Container>
         <div style={{display:"flex",flexDirection:"row"}}>
         <div>username</div>
         <button onClick="">edit post</button>
         </div>
         <div style={{display:"flex",flexDirection:"row"}} className="profileInformationFollwers">
         <div>0post </div>
         <div>0followers</div>
         <div>0follow</div>
         </div>
         </Container>
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