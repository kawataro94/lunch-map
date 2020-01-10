import { db } from "./resource"

export const updateShopDetail = (store, updatedData) => {

  store.shopDetail = updatedData.shopDetail
  db.collection("stores")
    .doc(store.id)
    .set(store)
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
          shopLink: doc.data().shopLink,
          fileName: doc.data().fileName,
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
      shopLink: shopData.newShopLink,
      fileName: shopData.file.name,
      fileSize: shopData.file.size,
      fileMime: shopData.file.type,
      fileUpdatedDate: shopData.file.lastModifiedDate,
    })
    .catch(error => {
      console.error("Error writing document: ", error);
    });
};

export const deleteShopData = (id) => {

  db.collection("stores")
    .doc(id).delete()
    .catch(error => {
      console.error("Error writing document: ", error);
    });
};





