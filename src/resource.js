import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

import { apiKey, authDomain, projectId, storageBucket } from '../.env/resource'

firebase.initializeApp({
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket
});

export const db = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
