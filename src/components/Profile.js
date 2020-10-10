import React,{useState,useEffect} from 'react'
import {db} from "../firebaseConfig"

const Profile=(props)=>{

  const [posts,setPost]=useState([])
   const [name,setName]=useState("")
   const [prenom,setPrenom]=useState("")
   const [image,setImage]=useState(null)
  {/** useEffect(() => {
     const unsubscrib=db.collection("post").onSnapshot((snapshot)=>{
       const postFound=snapshot.docs.find({username:"babu"})
      setPost( postFound.map(post=>(
        {id:post.id,
          post:post.data()
        }
      )))  
      
      console.log("data from profile which is fetched from post in firebase...",posts)
    })
     return () =>unsubscrib()
   }, []) */}
    const onSubmit=(e)=>{
      e.preventDefault()
      const cont={name:name,place:prenom}
     db.collection("post").doc("ville").set({
      ville:{...cont}
     }).then(place => console.log("success",place)).catch(err=>console.log("error over here",err))
    }
    return(
        <div style={{marginTop:"100px"}}>
        <form>
        <input type="text" placeholder="name..." onChange={(e)=>setName(e.target.value)}/>
        <input type="text" placeholder="prenom" onChange={(e)=>setPrenom(e.target.value)}/>
        <input type="file" onChange={(e)=>console.log("this is what u want from input file",e.target.files[0])}/>
        <button onClick={onSubmit}>sumit</button>
        </form>
        <div>
          {posts?(posts.map(post=><p>{post.name}</p>)):null}
        </div>
        </div>
    )
}
export default Profile