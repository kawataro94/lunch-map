export default (updateShopData = () => {
  db.collection("stores")
    .doc(this.state.data.shopId)
    .set({
      ...this.state.places[this.state.data.shopId],
      shopDetail: this.state.data.shopDetail
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
});

export const getShopData = () => {
  db.collection("stores")
    .get()
    .then(querySnapshot => {
      const shopData = [];
      querySnapshot.forEach(doc => {
        shopData.push({
          shopName: doc.data().shopName,
          shopDetail: doc.data().shopDetail,
          lat: doc.data().lat,
          lng: doc.data().lng,
          id: doc.id
        });
      });

      this.setState({
        places: shopData
      });
    });
};
