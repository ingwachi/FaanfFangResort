// import React from 'react';
// import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
// import 'antd/dist/antd.css';

// const mapStyles = {
//     width: '60%',
//     height: '80%',
// };

// class MapGoogle extends React.Component {
//     render() {
//         return (
//             <div>
//                     <Map
//                         google={this.props.google}
//                         zoom={15}
//                         style={mapStyles}
//                         initialCenter={{ lat: 12.979318, lng: 101.173554 }} >
//                         <Marker position={{ lat: 12.979318, lng: 101.173554 }} />
//                     </Map>
//             </div>
//         );
//     }
// }

// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyCzDWmoOPRh2sP3_FVoXmxztIo70Kk8NeA'
// })(MapGoogle);
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class MapGoogle extends Component {
  static defaultProps = {
    center: {
      lat: 12.979318,
      lng: 101.173554
    },
    zoom: 18
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '90%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCzDWmoOPRh2sP3_FVoXmxztIo70Kk8NeA'/* YOUR KEY HERE */ }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={12.979318}
            lng={101.173554}
            text=""
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default MapGoogle;