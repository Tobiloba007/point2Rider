/** @format */

import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  AnimatedRegion,
  MarkerAnimated,
} from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
const TrackPackage = () => {
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [showDirections, setShowDirections] = useState(true);
  const [pickUpDistance, setPickUpDistance] = useState(0);
  const [pickUpDuration, setPickUpDuration] = useState(0);
  const [destinationDistance, setDestinationDistance] = useState(0);
  const [destinationDuration, setDestinationDuration] = useState(0);
  const mapRef = useRef(null);
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const animatedOrigin = useRef(new AnimatedRegion()).current;

  const [pickupCoordinate, setPickupCoordinate] = useState({
    latitude: 6.5594,
    longitude: 3.3765,
  });
  const [destinationCoordinate, setDestinationCoordinate] = useState({
    latitude: 6.5435,
    longitude: 3.3426,
  });

  const edgePaddingValue = 50;

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  const traceRouteOnReady = (args) => {
    if (args) {
      setPickUpDistance(args.distance);
      setPickUpDuration(args.duration);
    }
  };
  const traceRouteOnReadyDestination = (args) => {
    if (args) {
      setDestinationDistance(args.distance);
      setDestinationDuration(args.duration);
    }
  };

  const traceRoute = () => {
    if (currentLocation && pickupCoordinate) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([currentLocation, pickupCoordinate], {
        edgePadding,
      });
    }
  };
  const traceRouteDestination = () => {
    if (pickupCoordinate && destinationCoordinate) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates(
        [pickupCoordinate, destinationCoordinate],
        {
          edgePadding,
        }
      );
    }
  };

  useEffect(() => {
    const updateCurrentLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Location permission not granted");
          return;
        }
        setLoading(true);
        await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 5000,
            distanceInterval: 10,
          },
          (location) => {
            const { latitude, longitude } = location.coords;
            setCurrentLocation({ latitude, longitude });
            console.log("Current Location:", latitude, longitude);
            animatedOrigin
              .timing({
                latitude,
                longitude,
                duration: 1000,
              })
              .start();
          }
        );
      } catch (error) {
        console.error("Error getting current location:", error);
      } finally {
        setLoading(false);
      }
    };

    updateCurrentLocation();
    return () => {
      Location.stopLocationUpdatesAsync("locationUpdate");
    };
  }, []);

  if (loading)
    return (
      <Text style={{ textAlign: "center", paddingTop: 20 }}>loading...</Text>
    );
  console.log("current::", currentLocation);

  return (
    <View style={styles.container}>
      {currentLocation && (
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={
            Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
          }
          region={{
            latitude:
              (currentLocation.latitude + pickupCoordinate.latitude) / 2,
            longitude:
              (currentLocation.longitude + pickupCoordinate.longitude) / 2,
            latitudeDelta:
              Math.abs(currentLocation.latitude - pickupCoordinate.latitude) *
              2,
            longitudeDelta:
              Math.abs(currentLocation.longitude - pickupCoordinate.longitude) *
              2,
          }}
          scrollEnabled={true}
          rotateEnabled={true}
          showsUserLocation={true}
          followUserLocation={true}
          loadingEnabled={true}
          pitchEnabled={true}
          showsIndoorLevelPicker={true}
        >
          {currentLocation && (
            <MarkerAnimated
              style={{ flexDirection: "column" }}
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              description="Current Location"
            >
              <Text>Current Location</Text>
            </MarkerAnimated>
          )}
          {pickupCoordinate && (
            <MarkerAnimated
              coordinate={{
                latitude: pickupCoordinate.latitude,
                longitude: pickupCoordinate.longitude,
              }}
              description="pick up Location"
            >
              <Image
                source={require("../../assets/images/marker.png")}
                style={{ width: 30, height: 50, margin: "auto" }}
              />
              <Text>pick up Location</Text>
            </MarkerAnimated>
          )}
          {destinationCoordinate && (
            <MarkerAnimated
              coordinate={{
                latitude: destinationCoordinate.latitude,
                longitude: destinationCoordinate.longitude,
              }}
              description="destination Location"
            >
              <Image
                source={require("../../assets/images/marker.png")}
                style={{ width: 30, height: 50, margin: "auto" }}
              />
              <Text>destination Location</Text>
            </MarkerAnimated>
          )}
          {showDirections && currentLocation && pickupCoordinate && (
            <MapViewDirections
              origin={currentLocation}
              destination={pickupCoordinate}
              apikey={apiKey}
              strokeColor="#6644ff"
              strokeWidth={4}
              onReady={traceRouteOnReady}
            />
          )}

          {showDirections && pickupCoordinate && destinationCoordinate && (
            <MapViewDirections
              origin={pickupCoordinate}
              destination={destinationCoordinate}
              apikey={apiKey}
              strokeColor="#6644ff"
              strokeWidth={4}
              onReady={traceRouteOnReadyDestination}
            />
          )}
        </MapView>
      )}
      <View style={{ position: "absolute", top: 10, right: 10 }}>
        {pickUpDistance && pickUpDuration ? (
          <TouchableOpacity style={{ paddingTop: 60 }} onPress={traceRoute}>
            <Text>First pickup </Text>
            <Text>Distance: {pickUpDistance.toFixed(2)}</Text>
            <Text>Duration: {Math.ceil(pickUpDuration)} min</Text>
          </TouchableOpacity>
        ) : null}

        {destinationDistance && destinationDuration ? (
          <TouchableOpacity
            style={{ paddingTop: 100 }}
            onPress={traceRouteDestination}
          >
            <Text>2nd destination address</Text>
            <Text>Distance: {destinationDistance.toFixed(2)}</Text>
            <Text>Duration: {Math.ceil(destinationDuration)} min</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={{ position: "absolute", top: 40, left: 10 }}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text>back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%", position: "relative" },
  map: {
    height: "100%",
    flex: 1,
    width: "100%",
  },
  image: {
    height: 20,
    width: 20,
    paddingBottom: 10,
    margin: 0,
  },
});

export default TrackPackage;
