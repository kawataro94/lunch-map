import React from "react";
<<<<<<< HEAD
import "../LunchMap.css";
import GoogleMapReact from "google-map-react";
=======
import styled from "styled-components";
import "../LunchMap.css";
import GoogleMapReact from "google-map-react";
// import ReactTooltip from "react-tooltip";
>>>>>>> 273ef8516cb4d3c309cdd12bb1a928f8c86aaf5c
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

<<<<<<< HEAD
import Tooltip from "../atoms/Tooltip";

const OurOffice = ({ text }) => <div>{text}</div>;

=======
// import Tooltip from "../atoms/Tooltip";

const OurOffice = ({ text }) => <div>{text}</div>;

// const Pointer = styled.div`
//   width: 15px;
//   height: 15px;
//   border-radius: 100%;
//   background-color: red;
// `;

const Tip = styled.div`
  position: relative;
  display: inline-block;
  top: -48px;
  margin: 0 -60px;
  padding: 7px 10px;
  min-width: 120px;
  max-width: 100%;
  color: #555;
  font-size: 16px;
  background: #fff;
  border: solid 2px #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  :before {
    content: "";
    position: absolute;
    bottom: -24px;
    left: 50%;
    margin-left: -15px;
    border: 12px solid transparent;
    border-top: 12px solid #fff;
    z-index: 2;
  }
  :after {
    content: "";
    position: absolute;
    bottom: -29px;
    left: 50%;
    margin-left: -17px;
    border: 14px solid transparent;
    border-top: 14px solid #ddd;
    z-index: 1;
  }
  :hover {
    z-index: 100;
  }
`;

const ShopName = styled.div`
  margin: 0;
  padding: 0;
  text-align: center;
`;

const Tooltip = ({ shopName, lat, lng }) => {
  return (
    <Tip lat={lat} lng={lng}>
      <ShopName>{shopName}</ShopName>
    </Tip>
  );
};

>>>>>>> 273ef8516cb4d3c309cdd12bb1a928f8c86aaf5c
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
<<<<<<< HEAD
      places: [],
      modalId: ""
    };

    this.setModalId = id => {
      this.setState({
        modalId: id
      });
    };

    this.handleChange = e => {
      db.collection("stores")
        .doc(this.state.modalId)
        .set({
          shopName: this.state.places[this.state.modalId].shopName,
          shopDetail: e.target.value,
          lat: this.state.places[this.state.modalId].lat,
          lng: this.state.places[this.state.modalId].lng,
          id: this.state.places[this.state.modalId].id
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
=======
      places: []
>>>>>>> 273ef8516cb4d3c309cdd12bb1a928f8c86aaf5c
    };
  }

  componentDidMount() {
<<<<<<< HEAD
    db.collection("stores")
=======
    // db.collection("shops")
    //   .get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       console.log(`${doc.id} => ${doc.data().id}`);
    //     });
    //   });
    db.collection("shops")
>>>>>>> 273ef8516cb4d3c309cdd12bb1a928f8c86aaf5c
      .get()
      .then(querySnapshot => {
        const shopData = [];
        querySnapshot.forEach(doc => {
          shopData.push({
<<<<<<< HEAD
            shopName: doc.data().shopName,
            shopDetail: doc.data().shopDetail,
            lat: doc.data().lat,
            lng: doc.data().lng,
            id: doc.id
=======
            shopName: doc.data().name,
            lat: doc.data().lat,
            lng: doc.data().lng,
            id: doc.data().id
>>>>>>> 273ef8516cb4d3c309cdd12bb1a928f8c86aaf5c
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
<<<<<<< HEAD
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
=======
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBaBZTLNvI_6C3eDd5d-XRKoX-LedbUnFU"
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <OurOffice lat={33.585284} lng={130.392775} text="●Pear●" />
          {/* {places.map(place => ( */}

          {/* ))} */}
        </GoogleMapReact>
      </div>
>>>>>>> 273ef8516cb4d3c309cdd12bb1a928f8c86aaf5c
    );
  }
}

export default Map;
