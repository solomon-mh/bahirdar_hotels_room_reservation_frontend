/* eslint-disable @typescript-eslint/no-unused-vars */
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export interface LocationProps {
    id: number;
    name: string;
    location: [number, number];
}

const CustomIcon = L.icon({
    iconUrl: '/marker.png',
    iconSize: [38, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});


interface Props {
    markers: LocationProps[],
    center?: [number, number];
    zoom?: number;

}


const MapComponent = ({ markers, zoom = 11, center = [11.56650613942859, 37.339266083968795] }: Props) => {


    return (
        <div className="h-full flex items-center justify-center w-full">

            <MapContainer className="h-[90vh] w-[90vw]" center={center} zoom={zoom} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {markers.map((marker) => (
                    <Marker icon={CustomIcon} key={marker.id} position={marker.location}>
                        <Popup>{marker.name}</Popup>
                    </Marker>
                ))}

            </MapContainer>
        </div>
    );
};

export default MapComponent;