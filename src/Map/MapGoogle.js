import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import 'antd/dist/antd.css';

const mapStyles = {
    width: '60%',
    height: '80%',
};

class MapContainer extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <Map
                        google={this.props.google}
                        zoom={15}
                        style={mapStyles}
                        initialCenter={{ lat: 12.979318, lng: 101.173554 }} >
                        <Marker position={{ lat: 12.979318, lng: 101.173554 }} />
                    </Map>
                </div>

            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCzDWmoOPRh2sP3_FVoXmxztIo70Kk8NeA'
})(MapContainer);