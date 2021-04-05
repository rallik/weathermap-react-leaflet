import React, {useState} from 'react';
import L, { Layer } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Display = () => {

    //API KEY
    const OWM_KEY = process.env.REACT_APP_OWM_KEY;
    const M_KEY = process.env.REACT_APP_M_KEY;

    //Open Street Maps
    const osm_attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
    const osm_source = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    
    //OpenWeather
    const owm_attribution = '<a href="https://openweathermap.org/">OpenWeatherMap</a>';
    const owm_url = {
        a: 'https://tile.openweathermap.org/map/',
        b:`/{z}/{x}/{y}.png?appid=${OWM_KEY}`
    };
    
    //Maptiler 
    const m_attr = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors &vert; <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>'; 
    const m_url = `https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=${M_KEY}`

    //OWM Layer values
    const layers = {
        clouds: 'clouds_new',
        precip: 'precipitation_new',
        pressure: 'pressure_new',
        wind: 'wind_new',
        temp: 'temp_new'
    };

    //Initial map center
    const [state, setState] = useState({
        lat: 42.3601,
        long: -71.0589,
        zoom: 15,
        scrollZoom: false
    });

    //State destructuring    
    const { zoom, lat, long, scrollZoom } = state;
    
    //Converting lat, long object to array
    const position = [lat, long];
    
    //Testing useMap
    const DisplayMap = () => {
        const map = useMap();
        console.log('map', map.getCenter())
        return null;
    }
    
    return (

        <MapContainer className='map' center={position} zoom={zoom} scrollWheelZoom={scrollZoom}>
            <LayersControl position='topright' onChange={() => setState(...state)}>
                <LayersControl.BaseLayer checked name="Open Street Maps">
                    <TileLayer attribution={osm_attribution} url={osm_source}/>
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Maptiler Satellite">
                    <TileLayer attribution={m_attr} url={m_url}/>
                </LayersControl.BaseLayer>

                <LayersControl.Overlay name='Clouds' >
                    <TileLayer attribution={owm_attribution} url={owm_url.a + layers.clouds + owm_url.b}/>
                </LayersControl.Overlay>
                <LayersControl.Overlay name='Pricipitation'>
                    <TileLayer attribution={owm_attribution} url={owm_url.a + layers.precip + owm_url.b}/>
                </LayersControl.Overlay>
                <LayersControl.Overlay name='Pressure'>
                    <TileLayer attribution={owm_attribution} url={owm_url.a + layers.pressure + owm_url.b}/>
                </LayersControl.Overlay>
                <LayersControl.Overlay name='Wind'>
                    <TileLayer attribution={owm_attribution} url={owm_url.a + layers.wind + owm_url.b}/>
                </LayersControl.Overlay>
                <LayersControl.Overlay name='Temp'>
                    <TileLayer attribution={owm_attribution} url={owm_url.a + layers.temp + owm_url.b}/>
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
