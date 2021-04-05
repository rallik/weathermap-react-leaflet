import React, {useState} from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Display = () => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const layer = 'clouds_new';
    const owm_url = `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${API_KEY}`
    const [state, setState] = useState({
        lat: 42.3601,
        long: -71.0589,
        zoom: 15,
        scrollZoom: false
    });

        
    const { zoom, lat, long, scrollZoom } = state;
    const position = [lat, long];
    
    const DisplayMap = () => {
        const map = useMap();
        console.log('map', map.getCenter())
        return null;
    }
    
    // console.log(<TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />);
    
    return (

        <MapContainer className='map' center={position} zoom={zoom} scrollWheelZoom={scrollZoom}>
            <LayersControl position='topright'>
                <LayersControl.BaseLayer
                    checked
                    name="OpenStreetMap"
                >
                    <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                </LayersControl.BaseLayer> 
                <LayersControl.Overlay
                    name=""
                >
                <TileLayer
                    attribution='Data from <a href="https://openweathermap.org/">OpenWeather</a>'
                    url={owm_url}
                />
                </LayersControl.Overlay>
                
                {/* <Marker position={position}>
                    <Popup>
                    Popup
                    </Popup>
                </Marker> */}
                <DisplayMap/>
            </LayersControl>
        </MapContainer>
    );
}

export default Display
