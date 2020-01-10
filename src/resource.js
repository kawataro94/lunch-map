import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

import { apiKey, authDomain, projectId, storageBucket } from '../.env/resource'

firebase.initializeApp({
<<<<<<< HEAD
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket
=======
  apiKey: "AIzaSyDGaGnMkdC7ldX2dGNiz6K_j4uLMl0WNIQ",
  authDomain: "lunch-map-1555836368736.firebaseapp.com",
  projectId: "lunch-map-1555836368736",
  storageBucket: "lunch-map-1555836368736.appspot.com"
>>>>>>> a986f50f02a594c708682be0ab4cd1df5c4c87cd
});

export const db = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
