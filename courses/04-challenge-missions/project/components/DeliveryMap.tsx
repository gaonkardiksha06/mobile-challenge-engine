import MapView, { Marker, type MapViewProps } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

type DeliveryMapProps = Partial<MapViewProps>;

export default function DeliveryMap({
  testID,
  ...mapProps
}: DeliveryMapProps) {
  return (
    <View style={styles.container} testID={testID ?? 'delivery-map'}>
      <MapView
        {...mapProps}
        style={styles.map}
        initialRegion={{
          latitude: 15.2993,
          longitude: 74.124,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
      >
        <Marker
          coordinate={{
            latitude: 15.2993,
            longitude: 74.124,
          }}
          title="Delivery Location"
          description="Your food delivery location"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  map: {
    flex: 1,
  },
});