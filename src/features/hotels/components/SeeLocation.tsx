/* eslint-disable @typescript-eslint/no-unused-vars */

import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";

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

interface Props {
    markers: {
        id: number;
        name: string;
        location: [number, number];
    }[],
    center?: [number, number];
    zoom?: number;

}


const SeeLocation = ({ markers, zoom = 11, center = [11.56650613942859, 37.339266083968795] }: Props) => {

    return (
        <Dialog >
            <DialogTrigger asChild>
                <button className="px-4 py-1  border bg-[#34343400] border-accent-500 text-accent-500 hover:bg-accent-500 rounded-md hover:text-slate-100">
                    =View Location
                </button>
            </DialogTrigger>
            <DialogContent className=" min-w-[80vw] min-h-[80vh] bg-slate-200">
                <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                </DialogHeader>
                <MapContainer className="flex-1 min-h-[70vh]  w-full" center={center} zoom={zoom} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                    />

                    {markers.map(marker => (
                        <Marker icon={CustomIcon} position={marker.location} key={marker.id}>
                            <Popup>{marker.name}</Popup>
                        </Marker>)
                    )}
                </MapContainer>
                <button
                    className="px-4 py-2 border border-accent-500  disabled:cursor-not-allowed bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                    Close
                </button>
            </DialogContent>
        </Dialog>
    )
}

export default SeeLocation
