import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyAJ6jAFHZqlLCtXX0OwlnF1dltP5omfBYY",
    authDomain: "booksanta-app-bbc67.firebaseapp.com",
    databaseURL: "https://booksanta-app-bbc67.firebaseio.com",
    projectId: "booksanta-app-bbc67",
    storageBucket: "booksanta-app-bbc67.appspot.com",
    messagingSenderId: "513494054734",
    appId: "1:513494054734:web:4393802e1f53855406d01f",
    measurementId: "G-CJGXZ6ZH9N"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();

