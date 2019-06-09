import React from 'react';
import '../LunchMap.css';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import ShopStore from '../flux/stores/ShopStore';
import {Container} from 'flux/utils';
import {updateShopData, getShopData} from '../shopData';

import Button from '@material-ui/core/Button';

import Tooltip from '../atoms/Tooltip';

const OurOffice = ({text}) => <div>{text}</div>;

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
      lng: 130.392775,
    },
    zoom: 18,
  };

  constructor(props) {
    super(props);

    this.state = {
      stores: [],
      category: '',
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

  displayCategory = category => {
    this.setState({
      category: category,
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
    const {stores, category} = this.state;
    console.log(category);

    return (
      <div>
        <div style={{height: '100vh', width: '100%'}}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyBaBZTLNvI_6C3eDd5d-XRKoX-LedbUnFU',
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <OurOffice lat={33.585284} lng={130.392775} text="●Pear●" />
            {stores
              .filter(store => store.category === category)
              .map(store => {
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
            <ButtonUL>
              <div style={{marginRight: '10px'}}>
                <Button
                  variant="contained"
                  onClick={() => this.displayCategory('中華')}
                >
                  中華
                </Button>
              </div>
              <div style={{marginRight: '10px'}}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.displayCategory('和食')}
                >
                  和食
                </Button>
              </div>
              <div style={{marginRight: '10px'}}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => this.displayCategory('フレンチ')}
                >
                  フレンチ
                </Button>
              </div>
            </ButtonUL>
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default Container.create(Map);
