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
      places: [
        { shopName: "焼き鳥屋", lat: "33.584916", lng: "130.391993", id: 1 },
        { shopName: "もつ鍋屋", lat: "33.58492", lng: "130.393", id: 2 },
        { shopName: "ラーメン屋", lat: "33.5848", lng: "130.39190", id: 3 }
      ]
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

            {/* {places.map((places,id) => {
              return(
                <Pointer
                data-tip
                data-for={places[id].id}
                lat={places[id].lat}
                lng={places[id].lng}
              />
              <ReactTooltip id={places[id].id} type="dark" effect="solid">
                <span>{places[id].shopName}</span>
              </ReactTooltip>
              )
            })} */}

            <Pointer
              data-tip
              data-for="yakitori"
              lat={places[0].lat}
              lng={places[0].lng}
            />
            <ReactTooltip id="yakitori" type="dark" effect="solid">
              <span>{places[0].shopName}</span>
            </ReactTooltip>
            <Pointer
              data-tip
              data-for="motsunabe"
              lat={places[1].lat}
              lng={places[1].lng}
            />
            <ReactTooltip id="motsunabe" type="dark" effect="solid">
              <span>{places[1].shopName}</span>
            </ReactTooltip>

            <Pointer
              data-tip
              data-for="ramen"
              lat={places[2].lat}
              lng={places[2].lng}
            />
            <ReactTooltip id="ramen" type="dark" effect="solid">
              <span>{places[2].shopName}</span>
            </ReactTooltip>
            {/* );
            })} */}
          </GoogleMapReact>
        </div>
      </>
    );
  }
}

export default Map;
