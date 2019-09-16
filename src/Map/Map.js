import React from 'react';
import MapGoogle from './MapGoogle';
import MapImg from '../img/resort/map.jpg';
import '../css/map.css';

class MapResort extends React.Component {
    render(){
        return(
            <div>
                <h1><b id="roomTLB">แผนที่และการเดินทาง</b></h1>
                <hr class="w3-round"></hr>
                <img src={MapImg} class="setImgMap"/>
                <h2 style={{textAlign:"center"}}>Google Map </h2>
                <div id="setMapGoogle">
                    <MapGoogle/>
                </div>
            </div>
        );
    }
}

export default MapResort;