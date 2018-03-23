import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const app = firebase.initializeApp({
  apiKey: "AIzaSyDZsDsVEpkQYXm1W6n3RbSiwKyJYHGPBEU",
  authDomain: "codenames-duet.firebaseapp.com",
  databaseURL: "https://codenames-duet.firebaseio.com",
  projectId: "codenames-duet",
  storageBucket: "codenames-duet.appspot.com",
  messagingSenderId: "223154508246"
});

function connect(path) {
  return app.database().ref(path);
}

function auth() {
  return app.auth();
}

export default {connect, auth};