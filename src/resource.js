import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyDGaGnMkdC7ldX2dGNiz6K_j4uLMl0WNIQ",
  authDomain: "lunch-map-1555836368736.firebaseapp.com",
  projectId: "lunch-map-1555836368736",
  storageBucket: "lunch-map-1555836368736.appspot.com"
});

export const db = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
