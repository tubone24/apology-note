import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyAoAhF0kTLRcdvUR4nhG4DH03hIIfSg6go",
      authDomain: "apology-note.firebaseapp.com",
      databaseURL: "https://apology-note.firebaseio.com",
      projectId: "apology-note",
      storageBucket: "apology-note.appspot.com",
      messagingSenderId: "113929884727",
      appId: "1:113929884727:web:4cc85d2f3cf8690e595bb2",
      measurementId: "G-R2ZTL8NRBL"
    }
  )
}

export default firebase
