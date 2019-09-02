import React from "react";
import styled from "styled-components";
import "../LunchMap.css";
import GoogleMapReact from "google-map-react";
import { Container } from "flux/utils";
import { updateShopData, getShopData, addShopData } from "../shopData";

import ShopStore from "../flux/stores/ShopStore";

import Button from "@material-ui/core/Button";
import Tooltip from "../atoms/Tooltip";
import AddShopModal from "../atoms/AddShopModal";

const ButtonUL = styled.ul`
  display: flex;
  position: absolute;
  top: 300px;
  bottom: 0;
  right: 0;
  left: -180px;
`;

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
      category: "",
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
    return [ShopStore];
  }

  static calculateState() {
    return {
      updateData: ShopStore.getState()
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

  displayCategory = category => {
    this.setState({
      category: category
    });
  };

  componentDidMount() {
    this.setShopData();
  }

  update = () => {
    const { updateData, stores } = this.state;
    updateShopData(stores, updateData);
    this.setShopData();
  };

  addShop = () => {
    this.modalToggle()
    const { lat, lng, updateData } = this.state;
    addShopData(lat, lng, updateData.newShopName, updateData.newShopDetail)
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
    const { stores, category } = this.state;
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
              .filter(store => store.category === category)
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
            <ButtonUL>
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
            </ButtonUL>
            <AddShopModal isModal={isAddModal} modalToggle={this.modalToggle} addShop={this.addShop} />
          </GoogleMapReact>
        </div>
      </>
    );
  }
}

export default Container.create(Map);
