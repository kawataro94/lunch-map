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
      places: []
    };
  }

  componentDidMount() {
    db.collection("shops")
      .get()
      .then(querySnapshot => {
        const shopData = [];
        querySnapshot.forEach(doc => {
          shopData.push({
            shopName: doc.data().name,
            lat: doc.data().lat,
            lng: doc.data().lng,
            id: doc.data().id
          });
        });
        this.setState({
          places: shopData
        });
      });
  }

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
                  lat={place.lat}
                  lng={place.lng}
                  key={place.id}
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
