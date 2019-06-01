import React from "react";
import "../LunchMap.css";
import GoogleMapReact from "google-map-react";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

import Tooltip from "../atoms/Tooltip";
import ShopStore from "../flux/stores/ShopStore";
import { Container } from "flux/utils";

import { updateShopData, getShopData } from "../shopData";

const OurOffice = ({ text }) => <div>{text}</div>;

// firebase.initializeApp({
//   apiKey: "AIzaSyDGaGnMkdC7ldX2dGNiz6K_j4uLMl0WNIQ",
//   authDomain: "lunch-map-1555836368736.firebaseapp.com",
//   projectId: "lunch-map-1555836368736"
// });

// const db = firebase.firestore();
class Map extends React.Component {
  static defaultProps = {
    center: {
      lat: 33.585284,
      lng: 130.392775
    },
    zoom: 18
  };

  constructor(props) {
    super(props);

    this.state = {
      places: [],
      modalId: ""
    };

    this.setModalId = id => {
      this.setState({
        modalId: id
      });
    };
  }

  static getStores() {
    return [ShopStore];
  }

  static calculateState() {
    return {
      data: ShopStore.getState()
    };
  }

  // updateShopData = () => {
  //   db.collection("stores")
  //     .doc(this.state.data.shopId)
  //     .set({
  //       ...this.state.places[this.state.data.shopId],
  //       shopDetail: this.state.data.shopDetail
  //     })
  //     .catch(function(error) {
  //       console.error("Error writing document: ", error);
  //     });
  // };

  // getShopData = () => {
  //   db.collection("stores")
  //     .get()
  //     .then(querySnapshot => {
  //       const shopData = [];
  //       querySnapshot.forEach(doc => {
  //         shopData.push({
  //           shopName: doc.data().shopName,
  //           shopDetail: doc.data().shopDetail,
  //           lat: doc.data().lat,
  //           lng: doc.data().lng,
  //           id: doc.id
  //         });
  //       });

  //       this.setState({
  //         places: shopData
  //       });
  //     });
  // };

  setShopData = () => {
    getShopData().then(shopData => {
      console.log(shopData);
      this.setState({
        places: shopData
      });
    });
  };

  componentDidMount() {
    this.setShopData();
  }

  update = () => {
    const { data, places } = this.state;
    updateShopData(places, data);

    this.setShopData();
  };

  render() {
    const { places } = this.state;

    return (
      <>
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyBaBZTLNvI_6C3eDd5d-XRKoX-LedbUnFU"
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <OurOffice lat={33.585284} lng={130.392775} text="●Pear●" />
            {places.map(place => {
              return (
                <Tooltip
                  shopName={place.shopName}
                  shopDetail={place.shopDetail}
                  lat={place.lat}
                  lng={place.lng}
                  id={place.id}
                  key={place.id}
                  onChange={this.handleChange}
                  setModalId={this.setModalId}
                  update={this.update}
                />
              );
            })}
          </GoogleMapReact>
        </div>
      </>
    );
  }
}

export default Container.create(Map);
