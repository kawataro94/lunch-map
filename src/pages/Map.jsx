import React from "react";
import "../LunchMap.css";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import { Container } from "flux/utils";
import { updateShopDetail, getShopData } from "../shopData";

import ShopStore from "../flux/stores/ShopStore";
import CurrentStateStore from "../flux/stores/CurrentStateStore";
import Tooltip from "../atoms/Tooltip";
import AddShopModal from "../atoms/AddShopModal";
import SideBar from "../components/SideBar";

import PinImg from './marker.png';


const ModalWrap = styled.div`
  width: 270px; 
  position: absolute; 
  top: 10px;
  left: 10px;
  z-index: 1000;
  border-radius: 10px;
  border: solid 2px #e3e3e3;
  background-color: white;
`

const Marker = styled.div`
  display: ${props => props.disable === true ? 'none' : 'block'};
  background-color: black;
  position: relative;
`

const Pin = styled.img`
  position: absolute;
  top: -40px;
  left: -10px;
  bottom: 0;
  right: 0;
`

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
      stores: [],
      modalId: "",
      isAddModal: false,
      selectedPoint: true,
      category: "all",
      lat: 33.585284,
      lng: 130.392775,
      start: null,
      end: null
    };

    this.setModalId = id => {
      this.setState({
        modalId: id
      });
    };
  }

  setModal = () => {
    this.setState({
      isAddModal: true
    })
  }

  static getStores() {
    return [ShopStore, CurrentStateStore];
  }

  static calculateState() {
    return {
      shopStore: ShopStore.getState(),
      currentStateStore: CurrentStateStore.getState()
    };
  }

  setShopData = () => {
    getShopData().then(shopData => {
      this.setState({
        stores: shopData
      });
    });
  };

  componentDidMount() {
    this.setShopData();
  }

  updateShopDetail = () => {
    const { stores, shopStore } = this.state;
    console.log(shopStore)
    updateShopDetail(stores, shopStore);
    this.setShopData();
  };

  getLocation = (e) => {
    this.setState({
      lat: e.lat,
      lng: e.lng,
    })
  }

  render() {
    const { stores, currentStateStore, lat, lng } = this.state;
    return (
      <>
        <div>
          <ModalWrap>
            <SideBar />
          </ModalWrap>
          <div style={{ height: "100vh", width: "100%", position: "relative" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyBaBZTLNvI_6C3eDd5d-XRKoX-LedbUnFU"
              }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              onClick={(e) => this.getLocation(e)}
            >
              {stores
                .filter(store => {
                  if (currentStateStore.currentCategory === "all") {
                    return store.category !== currentStateStore.currentCategory
                  }
                  return store.category === currentStateStore.currentCategory
                })
                .map((store, index) => {
                  return (
                    <Tooltip
                      lat={store.lat}
                      lng={store.lng}
                      store={store}
                      key={index}
                      setModalId={this.setModalId}
                      update={this.update}
                    />
                  );
                })}
              <Marker lat={lat} lng={lng} disable={!currentStateStore.canRegisterState} style={{ fontSize: 20 }}>
                <Pin src={PinImg} alt='marker' onClick={this.setModal} />
              </Marker>
              <AddShopModal setShopData={this.setShopData} lat={lat} lng={lng} />
            </GoogleMapReact>
          </div>
        </div>
      </>
    );
  }
}

export default Container.create(Map);
