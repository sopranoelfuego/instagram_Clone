import firebase from "firebase"
import config from "./config/firebaseCredit"

const firebaseConfig=firebase.initializeApp(config)

  const db=firebaseConfig.firestore()
  const auth=firebaseConfig.auth()
  const storage=firebaseConfig.storage()
  export {db,auth,storage}
