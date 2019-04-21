import React from "react";
import styled from "styled-components";
import "../LunchMap.css";
import GoogleMapReact from "google-map-react";
import ReactTooltip from "react-tooltip";

const OurOffice = ({ text }) => <div>{text}</div>;

const Pointer = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 100%;
  background-color: red;
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
      places: []
    };
  }

  componentDidMount() {
    // fetch("places.json")
    //   .then(response => response.json())
    //   .then(data => this.setState({ places: data.results }));
  }

  render() {
    const { places } = this.state;
    return (
      <>
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyBaBZTLNvI_6C3eDd5d-XRKoX-LedbUnFU"
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <OurOffice lat={33.585284} lng={130.392775} text="●Pear●" />
            {/* {places.map(place => ( */}
            <Pointer
              data-tip
              data-for="store"
              lat="33.584916"
              lng="130.391993"
            />
            <ReactTooltip id="store" type="dark" effect="solid">
              <span>storeName</span>
            </ReactTooltip>
            {/* ))} */}
          </GoogleMapReact>
        </div>
      </>
    );
  }
}

export default Map;
