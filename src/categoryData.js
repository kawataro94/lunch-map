import { db } from "./resource"

export const getCategoryData = () => {
  const categoryData = db
    .collection("categories")
    .get()
    .then(querySnapshot => {
      const dataArray = [];
      querySnapshot.forEach(doc => {
        dataArray.push({
          name: doc.data().name,
        });
      });
      return dataArray;
    });

  return categoryData;
};

export const addCategoryData = (categoryName) => {
  db.collection("categories")
    .doc()
    .set({
      name: categoryName,
    })
    .catch(error => {
      console.error("Error writing document: ", error);
    });
};