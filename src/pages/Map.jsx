import React from "react";
import "../LunchMap.css";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";

import { Container } from "flux/utils";
import { getShopData } from "../shopData";
import { getCategoryData } from "../categoryData";
import ShopStore from "../flux/stores/ShopStore";
import CurrentStateStore from "../flux/stores/CurrentStateStore";

import Tooltip from "../atoms/Tooltip";
import AddCategoryModal from "../atoms/AddCategoryModal";
import AddShopModal from "../atoms/AddShopModal";
import SideBar from "../components/SideBar";

import PinImg from '../images/marker.png';


const ModalWrap = styled.div`
  display: ${props => props.disable ? 'none' : 'block'};
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
  display: ${props => props.disable ? 'none' : 'block'};
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

const Main = styled.div`
  position: relative;
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
      categories: [],
      modalId: "",
      isAddModal: false,
      selectedPoint: true,
      lat: 33.585284,
      lng: 130.392775,
      user: false
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

  setCategoriesData = () => {
    const categoryList = []
    getCategoryData().then(categories => {
      categories.map(category => categoryList.push(category.name));
      this.setState({
        categories: categoryList
      });
    })
  }

  componentDidMount() {
    this.setShopData();
    this.setCategoriesData();
  }

  getLocation = (e) => {
    this.setState({
      lat: e.lat,
      lng: e.lng,
    })
  }

  render() {
    const { stores, currentStateStore, lat, lng, categories } = this.state;

    return (
      <>
        <Main>
          <ModalWrap disable={currentStateStore.loginState}>
            <SideBar categories={categories} />
          </ModalWrap>
          <div style={{ height: "calc(100vh - 64px)", width: "100%", position: "relative" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyBaBZTLNvI_6C3eDd5d-XRKoX-LedbUnFU"
              }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              onClick={(e) => this.getLocation(e)}
            >
              {!currentStateStore.canRegisterState && stores
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
                      setShopData={this.setShopData}
                    />
                  );
                })}
              <Marker lat={lat} lng={lng} disable={!currentStateStore.canRegisterState} style={{ fontSize: 20 }}>
                <Pin src={PinImg} alt='marker' onClick={this.setModal} />
              </Marker>
              <AddCategoryModal setCategoriesData={this.setCategoriesData} />
              <AddShopModal setShopData={this.setShopData} categories={categories} lat={lat} lng={lng} />
            </GoogleMapReact>
          </div>
        </Main>
      </>
    );
  }
}

export default Container.create(Map);
