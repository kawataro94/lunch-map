import React from "react";
import "../LunchMap.css";
import GoogleMapReact from "google-map-react";
import { updateShopData, getShopData, _onClick } from "../shopData";

import Tooltip from "../atoms/Tooltip";

import Fab from "@material-ui/core/Fab";
import AddShopModal from "../atoms/AddShopModal";

const OurOffice = ({ text }) => <div>{text}</div>;
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
      isAddModal: false
    };

    this.setModalId = id => {
      this.setState({
        modalId: id
      });
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
    const { updateData, stores } = this.state;
    updateShopData(stores, updateData);
    this.setShopData();
  };

  // AddModal
  modalToggle = () => {
    const { isAddModal } = this.state;
    this.setState({ isAddModal: !isAddModal });
    if (this.state.isAddModal) {
      // ActionCreator.resetShopId();
    }
  };

  shopModal = () => {
    this.modalToggle();
    // setModalId(id);
  };

  render() {
    const { stores, isAddModal } = this.state;
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
            onClick={_onClick}
          >
            <OurOffice lat={33.585284} lng={130.392775} text="●Pear●" />
            {stores.map(store => {
              return (
                <Tooltip
                  lat={store.lat}
                  lng={store.lng}
                  store={store}
                  key={store.id}
                  onChange={this.handleChange}
                  setModalId={this.setModalId}
                  update={this.update}
                />
              );
            })}
            <AddShopModal isModal={isAddModal} modalToggle={this.modalToggle} />
          </GoogleMapReact>
        </div>
      </>
    );
  }
}

export default Map;
