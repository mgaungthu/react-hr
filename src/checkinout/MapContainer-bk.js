import React, { Component } from "react";
import { Map, InfoWindow, Marker, Circle, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) => {
    // console.log(marker);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onMapClicked = (props) => {
    // alert(this.state.showingInfoWindow);
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {

    const style = {
      width: '100%',
      height: '300px',
      background: "#ccc"
    }

    const containerStyle = {
      position: 'relative',
      width: '100%',
      height: '300px'
    }


    const coords = { lat: 16.8160371, lng: 96.1292259 };

    return (
      <Map containerStyle={containerStyle}
        initialCenter={{
          lat: 16.8160371,
          lng: 96.1292259
        }}
        style={style}
        google={this.props.google}
        onClick={this.onMapClicked}
        zoom={17}
        onDragend={false}
        
        >

        <Marker
          name={'Current location'}
          // position={{ lat: 16.8160371, lng: 96.1292259 }}
          onClick={this.onMarkerClick}
        />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>

            <div>
              <p>{this.state.selectedPlace.name}</p>
            </div>
          </InfoWindow>

        
        <Circle
          radius={100}
          center={coords}
          // onMouseover={() => console.log('mouseover')}
          // onClick={() => console.log('click')}
          // onMouseout={() => console.log('mouseout')}
          strokeColor='transparent'
          strokeOpacity={0}
          strokeWeight={5}
          fillColor='#FF0000'
          fillOpacity={0.2}
        />

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyAuHrmGf12qmQuByAxEXCHtG1HBdPEHtag")
})(MapContainer)