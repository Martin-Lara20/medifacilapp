import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyAMvYD86RSz7JenjNe6l2jg86Y1INA8QSk",
    authDomain: "medifacilapp-f1e09.firebaseapp.com",
    projectId: "medifacilapp-f1e09",
    storageBucket: "medifacilapp-f1e09.appspot.com",
    messagingSenderId: "634889924100",
    appId: "1:634889924100:web:05d502db96104809548f51"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig)