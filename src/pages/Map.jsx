import React from "react";
import styled from "styled-components";
import "../LunchMap.css";
import GoogleMapReact from "google-map-react";
import { Container } from "flux/utils";
import { updateShopData, getShopData, _onClick } from "../shopData";

import ShopStore from "../flux/stores/ShopStore";

import Button from "@material-ui/core/Button";
import Tooltip from "../atoms/Tooltip";
import Fab from "@material-ui/core/Fab";
import AddShopModal from "../atoms/AddShopModal";

const OurOffice = styled.div`
  width: 50px;
`

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
      draggable: true,
      lat: 33.585284,
      lng: 130.392775
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

  // AddModal
  modalToggle = () => {
    const { isAddModal } = this.state;
    this.setState({ isAddModal: !isAddModal });
  };

  shopModal = () => {
    this.modalToggle();
  };

  onCircleInteraction = (childKey, childProps, mouse) => {
    // function is just a stub to test callbacks
    this.setState({
      draggable: false,
      lat: mouse.lat,
      lng: mouse.lng
    });

    console.log('onCircleInteraction called with', childKey, childProps, mouse);
  }

  onCircleInteraction3 = (childKey, childProps, mouse) => {
    this.setState({ draggable: true });
    // function is just a stub to test callbacks  
    console.log('onCircleInteraction called with', childKey, childProps, mouse);

  }

  render() {
    const { stores, category } = this.state;
    const { isAddModal } = this.state;

    return (
      <>
        <div style={{ height: "100vh", width: "100%", position: "relative" }}>
          <div style={{ position: "absolute", bottom: "50px", right: "90px" }}>
            <Fab
              color="primary"
              aria-label="Add"
              style={{ zIndex: 99 }}
              onClick={() => this.shopModal()}
            >
              <i className="material-icons" style={{ fontSize: 30 }}>
                add
              </i>
            </Fab>
          </div>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyBaBZTLNvI_6C3eDd5d-XRKoX-LedbUnFU"
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            // onClick={_onClick}
            draggable={this.state.draggable}
            onChildMouseDown={this.onCircleInteraction}
            onChildMouseUp={this.onCircleInteraction3}
            onChildMouseMove={this.onCircleInteraction}
            onChildClick={() => console.log('child click')}
            onClick={() => console.log('mapClick')}
          >
            <OurOffice lat={this.state.lat} lng={this.state.lng}>
              ●Pear●
            </OurOffice>
            {stores
              .filter(store => store.category === category)
              .map(store => {
                return (
                  <Tooltip
                    lat={store.lat}
                    lng={store.lng}
                    store={store}
                    key={store.id}
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
            <AddShopModal isModal={isAddModal} modalToggle={this.modalToggle} />
          </GoogleMapReact>
        </div>
      </>
    );
  }
}

export default Container.create(Map);
