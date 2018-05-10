import firebase from "firebase/app";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyD2W0Rv4pDl-VSL0tBiwNIVrAX_aHPSJHw",
    authDomain: "react-login-76586.firebaseapp.com",
    databaseURL: "https://react-login-76586.firebaseio.com",
    projectId: "react-login-76586",
    storageBucket: "react-login-76586.appspot.com",
    messagingSenderId: "852241777088"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;