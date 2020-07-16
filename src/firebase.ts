import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyBfklXzhecBngme5eFfao_xjkCJrxcWI0k",
  authDomain: "vue-firebase-1efee.firebaseapp.com",
  databaseURL: "https://vue-firebase-1efee.firebaseio.com",
  projectId: "vue-firebase-1efee",
  storageBucket: "vue-firebase-1efee.appspot.com",
  messagingSenderId: "820032240217",
  appId: "1:820032240217:web:7ddcd1f0e5b5d7b227cf48",
  measurementId: "G-1XMYBQS1CD"
};
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}