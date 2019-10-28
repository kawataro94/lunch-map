import React from "react";
import "../LunchMap.css";
import GoogleMapReact from "google-map-react";
import { Container } from "flux/utils";
import { updateShopData, getShopData, addShopData } from "../shopData";

import ShopStore from "../flux/stores/ShopStore";
import CurrentStateStore from "../flux/stores/CurrentStateStore";
import Tooltip from "../atoms/Tooltip";
import AddShopModal from "../atoms/AddShopModal";
import SideBar from "../components/SideBar";



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

  update = () => {
    const { shopStore, stores } = this.state;
    updateShopData(stores, shopStore);
    this.setShopData();
  };

  addShop = () => {
    this.modalToggle();
    const { lat, lng, shopStore } = this.state;
    addShopData(
      lat,
      lng,
      shopStore.newShopName,
      shopStore.newShopDetail,
      shopStore.newShopCategory,
      shopStore.newShopLink
    )
    this.setShopData();
  };

  modalToggle = () => {
    const { isAddModal } = this.state;
    this.setState({ isAddModal: !isAddModal });
  };

  getLocation = (e) => {

    this.setState({
      lat: e.lat,
      lng: e.lng,
    })
  }

  setModal = () => {
    this.setState({
      isAddModal: true
    })
    console.log('yes')
  }

  render() {
    const { stores, currentStateStore, lat, lng } = this.state;
    const { isAddModal } = this.state;
    return (
      <>
        <div>
          <div style={{ width: 300, position: "absolute", zIndex: 1000, backgroundColor: 'white' }}>
            <SideBar />
          </div>
          <div style={{ height: "100vh", width: "100%", position: "relative" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyBaBZTLNvI_6C3eDd5d-XRKoX-LedbUnFU"
              }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              onClick={(e) => this.getLocation(e)}
            // onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps)}
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
              {currentStateStore.canRegisterState && <div onClick={this.setModal} lat={lat} lng={lng} style={{ fontSize: 50 }}>●</div>}
              <AddShopModal isModal={isAddModal} modalToggle={this.modalToggle} addShop={this.addShop} />
            </GoogleMapReact>
          </div>
        </div>
      </>
    );
  }
}

export default Container.create(Map);
