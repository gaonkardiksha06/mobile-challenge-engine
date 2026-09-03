import MapView, { Marker } from 'react-native-maps';

export default function DeliveryMap() {
  return (
    <MapView
      style={{ height: 200, borderRadius: 12, marginBottom: 12 }}
      initialRegion={{
        latitude: 28.6139,
        longitude: 77.209,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }}
      testID="delivery-map"
    >
      <Marker
        coordinate={{
          latitude: 28.6139,
          longitude: 77.209,
        }}
        title="Restaurant"
      />
    </MapView>
  );
}
