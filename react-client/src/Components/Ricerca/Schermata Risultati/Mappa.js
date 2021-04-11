import React, {useEffect, useState} from "react";
import 'leaflet/dist/leaflet.css';
import {Map, TileLayer} from "react-leaflet";
import {OpenStreetMapProvider} from "leaflet-geosearch"

const provider = new OpenStreetMapProvider();

function Mappa(props) {

    // Aggiorna la posizione della mappa in base alla destinazione selezionata
    useEffect(() => {
        if (props.destinazione) {
            provider.search({ query: props.destinazione })
                .then(res => {
                    return res[0]
                })
                .then(res => {
                    setPosizione([res.y, res.x])
                })
                .catch(err => err);
        }
    }, [props.destinazione]);

    const [posizione, setPosizione] = useState([37.9995003, 13.6293525]);

    return (
        <Map center={posizione} zoom={9} className="h-100">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
        </Map>
    );
}

export default Mappa;