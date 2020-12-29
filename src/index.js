import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from "react-router-dom"
import firebase from "firebase"
// this firebase.firestore method help to enlable using firestore servises offline
// MURIKI GIHE UCUSANGA URIKO UKORESHA AMADONNE ARI MURI CACHES BUT NOT ALL I MEAN ONLY 
// WHICH ARE STORED IN FIRESTORE
firebase.firestore().enablePersistence()
  .catch(function(err) {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
firebase.firestore().enablePersistence()
  .catch(function(err) {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
                    // ...
          console.log("error occure while setup enlablePersistence")

      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
          console.log("error occure while setup enlablePersistence")
      }
  });
// Subsequent queries will use persistence, if it was enabled successfully
  
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
          console.log("error occure while setup enlablePersistence")
      }
  });
// Subsequent queries will use persistence, if it was enabled successfully
  

ReactDOM.render(
  <React.StrictMode>
    <Router><App /></Router>
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
