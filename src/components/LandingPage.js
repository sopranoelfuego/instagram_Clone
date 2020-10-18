import React,{useState,useEffect} from 'react'
import Post from "../components/Post"
import {db,auth} from "../firebaseConfig"

const LandingPage=()=> {
   

    const [user,setUser]=useState(null)
    // useEffect(()=>{
    //     // unsubscribe const help to takeoff onAnthStateChanged backend listener to the useEffect frontend listener once is poped
    //     const unsubscribe=auth.onAuthStateChanged(userAuth=>{
    //         if(userAuth){
    //           console.log("this mention user is logged in",userAuth)
    //           setUser(userAuth)
    //           // what to do  if user is logged
    //           if(userAuth.displayName){
    //             // in this block means dat user already exist then we don t want to reupdate his profile
    //           }else{
    //             // otherwise it s means that the user is nearly created then we update his profile
    //             userAuth.updateProfile({
    //               displayName:userName
    //             })
    //           }
    //         }else{
    //           // whata to do if user is no longer logged (is logout)
    //           setUser(null)
    //         }
      
    //     })
      
    //     return ()=>unsubscribe()
    //   },[user])
      

    
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
                {postes?postes.map(post =><Post key={post.id}  post={post} />):<h2>cannot display postes</h2>}
                

                </div>
                <div className="post__online">
                <img src="/images/1.jpg" style={{width:"100%"}}/>
                </div>

            
                
            
            </div>
        </div>
    )
}
export default LandingPage
