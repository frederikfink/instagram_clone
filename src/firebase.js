import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD_RTZyhEmxm33OgE4FlwKOj8sW2B4X4HE",
    authDomain: "instagram-clone-cfb33.firebaseapp.com",
    databaseURL: "https://instagram-clone-cfb33.firebaseio.com",
    projectId: "instagram-clone-cfb33",
    storageBucket: "instagram-clone-cfb33.appspot.com",
    messagingSenderId: "995376386705",
    appId: "1:995376386705:web:9f0c317caeed27ee1ea530",
    measurementId: "G-WDRZ1CX8P7"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

// export default db;