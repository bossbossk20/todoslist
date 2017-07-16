import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCZMgHE1arzXUJYn1AZFUQXqiQArC4jT7g",
  authDomain: "todolists-b0589.firebaseapp.com",
  databaseURL: "https://todolists-b0589.firebaseio.com",
  projectId: "todolists-b0589",
  storageBucket: "todolists-b0589.appspot.com",
  messagingSenderId: "689084912126"
}
firebase.initializeApp(config)
export default firebase.database()
