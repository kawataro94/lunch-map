import React from "react";
import "../LunchMap.css";
import GoogleMapReact from "google-map-react";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

import Tooltip from "../atoms/Tooltip";

const OurOffice = ({ text }) => <div>{text}</div>;

firebase.initializeApp({
  apiKey: "AIzaSyDGaGnMkdC7ldX2dGNiz6K_j4uLMl0WNIQ",
  authDomain: "lunch-map-1555836368736.firebaseapp.com",
  projectId: "lunch-map-1555836368736"
});

const db = firebase.firestore();
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

    this.handleChange = e => {
      // this.setState({
      //   places: [{ ...this.state.places, shopDetail: e.target.value }]
      // });

      console.log(e.target.value);

      // db.collection("shop")
      //   .where(this.state.modalId)
      //   .get()
      //   .then(querySnapshot => {
      //     console.log("hey");
      //     console.log(querySnapshot);
      //   });

      db.collection("stores")
        .doc(this.state.modalId)
        .set({
          shopName: this.state.places[this.state.modalId].shopName,
          shopDetail: e.target.value,
          lat: this.state.places[this.state.modalId].lat,
          lng: this.state.places[this.state.modalId].lng
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    };
  }

  componentDidMount() {
    db.collection("stores")
      .get()
      .then(querySnapshot => {
        const shopData = [];
        querySnapshot.forEach(doc => {
          console.log(doc.id);
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
  }

  render() {
    const { places } = this.state;
    console.log(this.state.places);
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
                />
              );
            })}
          </GoogleMapReact>
        </div>
      </>
    );
  }
}

export default Map;
