import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyDGaGnMkdC7ldX2dGNiz6K_j4uLMl0WNIQ",
  authDomain: "lunch-map-1555836368736.firebaseapp.com",
  projectId: "lunch-map-1555836368736"
});
const db = firebase.firestore();

export const updateShopDetail = (stores, updatedData) => {

  const updatedShopData = stores.filter(store => (store.id === updatedData.shopId))[0]
  updatedShopData.shopDetail = updatedData.shopDetail

  db.collection("stores")
    .doc(updatedData.shopId)
    .set(updatedShopData)
    .catch(error => {
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
          category: doc.data().category,
          shopLink: doc.data().shopLink
        });
      });
      return dataArray;
    });

  return storeData;
};

export const addShopData = (shopData) => {
  db.collection("stores")
    .doc()
    .set({
      shopName: shopData.newShopName,
      shopDetail: shopData.newShopDetail,
      lng: `${shopData.lng}`,
      lat: `${shopData.lat}`,
      category: shopData.newShopCategory,
      shopLink: shopData.newShopLink
    })
    .catch(error => {
      console.error("Error writing document: ", error);
    });
  getShopData()
};
