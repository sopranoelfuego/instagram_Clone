import firebase from "firebase"


const firebaseConfig=firebase.initializeApp({
    apiKey: "AIzaSyDeA-x-u-mxlugxo6s--8KKId_CUuSk2MY",
    authDomain: "instagramclone-255f3.firebaseapp.com",
    databaseURL: "https://instagramclone-255f3.firebaseio.com",
    projectId: "instagramclone-255f3",
    storageBucket: "instagramclone-255f3.appspot.com",
    messagingSenderId: "124543206714",
    appId: "1:124543206714:web:36099453712ba79bf03c03"
  })

  const db=firebaseConfig.firestore()
  const auth=firebaseConfig.auth()
  const storage=firebaseConfig.storage()
  export {db,auth,storage}
