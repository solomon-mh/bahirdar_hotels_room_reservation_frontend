import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import { toast } from 'react-hot-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const CustomIcon = L.icon({
    iconUrl: '/marker.png',
    iconSize: [20, 20],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});

interface Props {
    setSelectedPosition: (position: LatLngExpression | null) => void;
    selectedPosition: LatLngExpression | null;
}

export default function AddLocation({ setSelectedPosition, selectedPosition }: Props) {

    const [isOpen, setIsOpen] = useState(false);


    function MapClickHandler() {
        useMapEvents({
            click: (e) => {
                const position: LatLngExpression = [e.latlng.lat, e.latlng.lng];
                setSelectedPosition(position);

                navigator.clipboard.writeText(`${e.latlng.lat}, ${e.latlng.lng}`)
                    .then(() => toast.success(`Coordinates copied to clipboard: ${e.latlng.lat}, ${e.latlng.lng}`))
                    .catch(() => toast.error('Failed to copy coordinates to clipboard'));
            },
        });

        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button className="px-4 py-1 border bg-[#34343400] border-accent-500 text-accent-500 hover:bg-accent-500 rounded-md hover:text-slate-100">
                    {selectedPosition ? "Edit" : "Add"} Location
                </button>
            </DialogTrigger>
            <DialogContent className="min-w-[80vw] min-h-[80vh] bg-slate-200">
                <DialogHeader>
                    <DialogTitle>Confirm Location</DialogTitle>
                </DialogHeader>
                <MapContainer className="flex-1 min-h-[70vh] w-full" center={[11.59244238014163, 37.423214410732655]} zoom={10} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                    />

                    <Marker icon={CustomIcon} position={selectedPosition || [11.59244238014163, 37.423214410732655]}>
                        <Popup>{selectedPosition ? `Clicked Position: ${selectedPosition.toString()}` : "Bahir Dar"}</Popup>
                    </Marker>

                    <MapClickHandler />
                </MapContainer>

                <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 disabled:cursor-not-allowed bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                    Close
                </button>
            </DialogContent>
        </Dialog>
    );
}
