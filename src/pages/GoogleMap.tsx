import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapComponent = () => {
    const center = { lng: 37.339266083968795, lat: 11.56650613942859 };

    return (
        <LoadScript googleMapsApiKey="AlzaSy9-FsVYGPgjNlW96zVB8fJ46CvTQGF6WWO">
            <GoogleMap mapContainerStyle={{ width: "100%", height: "400px" }} center={center} zoom={12}>
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
