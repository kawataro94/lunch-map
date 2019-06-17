import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyDGaGnMkdC7ldX2dGNiz6K_j4uLMl0WNIQ",
  authDomain: "lunch-map-1555836368736.firebaseapp.com",
  projectId: "lunch-map-1555836368736"
});
const db = firebase.firestore();

export const updateShopData = (stores, updateData) => {
  db.collection("stores")
    .doc(updateData.shopId)
    .set({
      ...stores[updateData.shopId],
      shopDetail: updateData.shopDetail
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
};

export const getShopData = () => {
  const storeData = db
    .collection("stores")
    .get()
    .then(querySnapshot => {
      const dataArray = [];
      querySnapshot.forEach(doc => {
        dataArray.push({
          shopName: doc.data().shopName,
          shopDetail: doc.data().shopDetail,
          lat: doc.data().lat,
          lng: doc.data().lng,
          id: doc.id,
          category: doc.data().category
        });
      });
      return dataArray;
    });

  return storeData;
};

export const _onClick = ({ lat, lng }) => {
  console.log("click now");
  console.log(lat, lng);
  db.collection("stores")
    .doc("2")
    .set({
      shopName: "sample",
      shopDetail: "sampleの詳細",
      lng: `${lng}`,
      lat: `${lat}`,
      id: "2"
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
};
