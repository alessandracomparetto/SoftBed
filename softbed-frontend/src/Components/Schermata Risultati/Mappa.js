import React, {useState} from "react";
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer} from "react-leaflet";

function Mappa() {

    const [position] = useState([37.9995003, 13.6293525]);

    return (
        <Map center={position} zoom={7} className="h-100">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
        </Map>
    );
}

export default Mappa;