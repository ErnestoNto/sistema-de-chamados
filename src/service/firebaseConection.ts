// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import App from "next/app";

const firebaseConfig = {
  apiKey: "AIzaSyAVPHWhVY87bbwIwQMzb77lSLjGJJSuOUc",
  authDomain: "meu-sistema-de-login.firebaseapp.com",
  projectId: "meu-sistema-de-login",
  storageBucket: "meu-sistema-de-login.appspot.com",
  messagingSenderId: "897172206797",
  appId: "1:897172206797:web:3f5360a9c91f4bb9086584",
  measurementId: "G-KR0ZHHYYM3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export {
    auth,
    db,
    storage
}