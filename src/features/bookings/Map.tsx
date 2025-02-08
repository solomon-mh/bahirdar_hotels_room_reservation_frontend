/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import { toast } from 'react-toastify';

// Fix for default marker icon issue
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const CustomIcon = L.icon({
    iconUrl: '/marker.png',
    iconSize: [10, 10],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});

const center: LatLngExpression = [9.0357, 38.7636];

const markers = [
    {
        id: 1,
        name: 'Aurora General Business PLC',
        location: [9.0357, 8.7636] as [number, number],
    },
    {
        id: 2,
        name: 'Aurora PLC',
        location: [9.0357, 38.7636] as [number, number],
    },
    {
        id: 3,
        name: 'Aurora PLC',
        location: [12.0357, 38.7636] as [number, number],
    },
];

const MapComponent = () => {
    const [clickedPosition, setClickedPosition] = useState<LatLngExpression | null>(null);

    const MapClickHandler = () => {
        useMapEvents({
            click: (e) => {
                const position = [e.latlng.lat, e.latlng.lng] as LatLngExpression;
                setClickedPosition(position);
                navigator.clipboard.writeText(`${e.latlng.lat}, ${e.latlng.lng}`)
                    .then(() => {
                        toast.success(`Coordinates copied to clipboard: ${e.latlng.lat}, ${e.latlng.lng}`);
                    })
                    .catch((_) => {
                        toast.error('Failed to copy coordinates to clipboard');
                    });
            },
        });
        return null;
    };

    useEffect(() => {
        if (clickedPosition)
        {
            toast.success(`Location selected: ${clickedPosition}`);
        }
    }, [clickedPosition]);

    return (
        <div className="h-full flex items-center justify-center w-full">
            <MapContainer className="h-[90vh] w-[90vw]" center={center} zoom={10} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {markers.map((marker) => (
                    <Marker icon={CustomIcon} key={marker.id} position={marker.location}>
                        <Popup>{marker.name}</Popup>
                    </Marker>
                ))}
                {clickedPosition && (
                    <Marker position={clickedPosition}>
                        <Popup>Clicked Position: {clickedPosition.toString()}</Popup>
                    </Marker>
                )}
                <MapClickHandler />

            </MapContainer>
        </div>
    );
};

export default MapComponent;