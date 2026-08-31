import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import MapView, { Marker, type Region } from 'react-native-maps';
import * as Location from 'expo-location';
import {
  registerForPushNotifications,
  scheduleLocalNotification,
} from '../lib/notifications';

const DEFAULT_REGION: Region = {
  latitude: 28.6139,
  longitude: 77.209,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function MapScreen() {
  const [region, setRegion] = useState<Region>(DEFAULT_REGION);
  const [userLocation, setUserLocation] =
    useState<Location.LocationObject | null>(null);

  useEffect(() => {
    registerForPushNotifications();

    const loadUserLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);

      setRegion((current) => ({
        ...current,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }));
    };

    loadUserLocation();
  }, []);

  const notifyNearby = () => {
    scheduleLocalNotification(
      'Nearby store',
      'You are close to a pickup point',
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery Map</Text>

      <MapView
        style={styles.map}
        region={region}
        showsUserLocation
        testID="delivery-map"
      >
        <Marker
          coordinate={{
            latitude: DEFAULT_REGION.latitude,
            longitude: DEFAULT_REGION.longitude,
          }}
          title="Pickup"
          testID="pickup-marker"
        />

        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }}
            title="Your location"
            testID="user-location-marker"
          />
        )}
      </MapView>

      <Pressable
        style={styles.button}
        onPress={notifyNearby}
        testID="notify-button"
      >
        <Text style={styles.buttonText}>Send arrival notification</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#38bdf8',
    padding: 16,
    paddingBottom: 8,
  },
  map: {
    flex: 1,
  },
  button: {
    margin: 16,
    backgroundColor: '#38bdf8',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0f172a',
    fontWeight: '600',
  },
});
