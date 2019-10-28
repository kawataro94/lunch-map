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


import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


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
              selectedPoint: true,
              // isAddModal: true
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
      // selectedPoint: false,
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
    const { stores, categoryStore, selectedPoint, lat, lng } = this.state;
    const { isAddModal } = this.state;
    return (
      <>
        <div style={{ display: 'flex' }}>
          <div style={{ width: 300 }}>
            <List component="nav" aria-label="main mailbox folders" style={{ color: 'gray' }}>
              <ListItem button>
                <ListItemText primary="Lunch-map" />
              </ListItem>
            </List>
            <Divider />
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button>
                <ListItemText primary="ストアを登録する" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="カテゴリを増やす" />
              </ListItem>
            </List>
          </div>
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
              {selectedPoint && <div onClick={this.setModal} lat={lat} lng={lng} style={{ fontSize: 50 }}>●</div>}
              <AddShopModal isModal={isAddModal} modalToggle={this.modalToggle} addShop={this.addShop} />
            </GoogleMapReact>
          </div>
        </div>
      </>
    );
  }
}

export default Container.create(Map);
