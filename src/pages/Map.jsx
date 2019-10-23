import React from "react";
import "../LunchMap.css";
import GoogleMapReact from "google-map-react";
import { Container } from "flux/utils";
import { updateShopData, getShopData, addShopData } from "../shopData";

import ShopStore from "../flux/stores/ShopStore";
import CategoryStore from "../flux/stores/CategoryStore";
import Tooltip from "../atoms/Tooltip";
import AddShopModal from "../atoms/AddShopModal";
import CategoryButton from "../atoms/CategoryButton";

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
    return [ShopStore, CategoryStore];
  }

  static calculateState() {
    return {
      shopStore: ShopStore.getState(),
      categoryStore: CategoryStore.getState()
    };
  }

  apiIsLoaded = (map, maps) => {
    if (maps) {
      maps.event.addDomListener(window, 'mousedown', () => {
        this.setState({
          start: new Date().getTime()
        });
      });

      maps.event.addDomListener(window, 'mouseup', () => {
        if (this.state.start) {
          this.setState({
            end: new Date().getTime()
          })
          const longpress = (this.state.end - this.state.start < 500) ? false : true;

          if (longpress) {
            this.setState({
              isAddModal: true
            })

          }
        }
      });
    }
  };

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

  render() {
    const { stores, categoryStore } = this.state;
    const { isAddModal } = this.state;
    return (
      <>
        <div style={{ height: "100vh", width: "100%", position: "relative" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyBaBZTLNvI_6C3eDd5d-XRKoX-LedbUnFU"
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            onClick={(e) => this.getLocation(e)}
            onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps)}
          >
            {stores
              .filter(store => {
                if (categoryStore.currentCategory === "all") {
                  return store.category !== categoryStore.currentCategory
                }
                return store.category === categoryStore.currentCategory
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
            <CategoryButton />
            {/* <ButtonUL>
              <div style={{ marginRight: "10px" }}>
                <Button
                  variant="contained"
                  onClick={() => this.displayCategory("中華")}
                >
                  中華
                </Button>
              </div>
              <div style={{ marginRight: "10px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.displayCategory("和食")}
                >
                  和食
                </Button>
              </div>
              <div style={{ marginRight: "10px" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => this.displayCategory("フレンチ")}
                >
                  フレンチ
                </Button>
              </div>
            </ButtonUL> */}
            <AddShopModal isModal={isAddModal} modalToggle={this.modalToggle} addShop={this.addShop} />
          </GoogleMapReact>
        </div>
      </>
    );
  }
}

export default Container.create(Map);
