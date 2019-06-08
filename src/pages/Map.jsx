import React from 'react';
import '../LunchMap.css';
import GoogleMapReact from 'google-map-react';
import ShopStore from '../flux/stores/ShopStore';
import {Container} from 'flux/utils';
import {updateShopData, getShopData, _onClick} from '../shopData';

import Tooltip from '../atoms/Tooltip';

import Fab from '@material-ui/core/Fab';

const OurOffice = ({text}) => <div>{text}</div>;
class Map extends React.Component {
  static defaultProps = {
    center: {
      lat: 33.585284,
      lng: 130.392775,
    },
    zoom: 18,
  };

  constructor(props) {
    super(props);

    this.state = {
      stores: [],
      modalId: '',
    };

    this.setModalId = id => {
      this.setState({
        modalId: id,
      });
    };
  }

  static getStores() {
    return [ShopStore];
  }

  static calculateState() {
    return {
      updateData: ShopStore.getState(),
    };
  }

  setShopData = () => {
    getShopData().then(shopData => {
      this.setState({
        stores: shopData,
      });
    });
  };

  componentDidMount() {
    this.setShopData();
  }

  update = () => {
    const {updateData, stores} = this.state;
    updateShopData(stores, updateData);
    this.setShopData();
  };

  render() {
    const {stores} = this.state;

    return (
      <>
        <div style={{height: '100vh', width: '100%'}}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyBaBZTLNvI_6C3eDd5d-XRKoX-LedbUnFU',
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
            <Fab color="primary" aria-label="Add" style={{zIndex: 99}}>
              <i class="material-icons" style={{fontSize: 30}}>
                add
              </i>
            </Fab>
          </GoogleMapReact>
        </div>
      </>
    );
  }
}

export default Container.create(Map);
