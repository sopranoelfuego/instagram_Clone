import React,{useState,useEffect} from 'react'
import Post from "../components/Post"
import {db,auth} from "../firebaseConfig"
import {makeStyles} from "@material-ui/styles"
import Container from "@material-ui/core/Container"


import { Row, Col } from 'antd';
const useStyle=makeStyles(theme=>({
    root:{
        boxSizing:"border-box",

    },
    post:{
        width:"100%",
        
    }


}))

const LandingPage=()=> {
   

    const [user,setUser]=useState(null)
    const [openDeletePost,setOpenDeletePost]=useState(false)
    const [openPostDialog,setOpenPostDialog]=useState(false)
    // THIS HOOKS HELP  TO GET THE CURRENT USER
useEffect(()=>{
    let user=auth.currentUser
    if(user){
        setUser(user)
    }else{
        console.log("the user is not logged:",user)
    }

},[])

    
    const [postes,setPostes]=useState([])

// this hook help to get a snapshot of post collection and get access to it data
useEffect(()=>{
   db.collection("post").orderBy("timestamp","desc").onSnapshot(snapshot=>{
    //    snapshot.docs.map(document =>console.log("data from landingPage",document.id))
       setPostes(snapshot.docs.map(doc=>({
           id:doc.id,
           post:doc.data()
       })))
   })
 

},[])

  
    return (
        <div>
            
             
               
            <div className="post__container">
            <div className="post">
                {postes?postes.map(post =><Post key={post.id}
                     currentUser={user} 
                     post={post} 
                     openDeletePost={openDeletePost}
                      setOpenDeletePost={setOpenDeletePost}
                      openPostDialog={openPostDialog} 
                      setOpenPostDialog={setOpenPostDialog}
                      />):<h2>cannot display postes</h2>}
                

                </div>
                <div className="post__online">
                <img src="/images/1.jpg" style={{width:"100%"}}/>
                </div>

            
                
            
            </div>

        </div>
    )
}
export default LandingPage



/* 
<div>
            
             
            <div className="post__container">
            <div className="post">
                {postes?postes.map(post =><Post key={post.id} currentUser={user} post={post} />):<h2>cannot display postes</h2>}
                

                </div>
                <div className="post__online">
                <img src="/images/1.jpg" style={{width:"100%"}}/>
                </div>

            
                
            
            </div>
        </div>*/