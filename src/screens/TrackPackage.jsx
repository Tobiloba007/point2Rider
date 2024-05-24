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
  Linking,
  SafeAreaView
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
import { AntDesign } from '@expo/vector-icons';
import Rider from '../../assets/images/rider.jpg'
import Verified from '../../assets/icon/verified.svg'
import Phone from '../../assets/icon/phone2.svg'
import Box from '../../assets/icon/box3.svg'
import LocationIcon from '../../assets/icon/Location1.svg'
import RiderIcon from '../../assets/icon/riderIcon.svg'




const TrackPackage = ({route}) => {
  const { data } = route.params;

  // const apiKey = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;
  const apiKey = 'AIzaSyCwBek1VbADBzfIdYFW0R6UQmCoogeqyoc';
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


  const handleCallPress = () => {
    const phoneUrl = `tel:${'09023456789'}`;
    Linking.openURL(phoneUrl);
  };


  const handleDeliveredOrder = () => {
    const trackingId = {'tracking_id': data.tracking_id}
    navigation.navigate('delivered', { trackingId });
   }

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

        {/* CURRENT LOCATION */}
          {currentLocation && (
            <MarkerAnimated
              style={{ flexDirection: "column" }}
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              description="Current Location"
            >
            <View className='m-auto mb-1'>
                <RiderIcon width={40} height={40} />
            </View>
              {/*<Text className={`text-[#0077B6] text-sm font-['bold']`}>Current Location</Text>*/}
            </MarkerAnimated>
          )}

               {/* PICK UP LOCATION */}
          {pickupCoordinate && (
            <MarkerAnimated
              coordinate={{
                latitude: pickupCoordinate.latitude,
                longitude: pickupCoordinate.longitude,
              }}
              description="pick up Location"
            >
              <View className='m-auto'>
                  <LocationIcon width={40} height={40} />
              </View>
              <Text className={`text-[#0077B6] text-sm font-['bold']`}>pick up Location</Text>
            </MarkerAnimated>
          )}


              {/* DELIVERY LOCATION */}
          {destinationCoordinate && (
            <MarkerAnimated
              coordinate={{
                latitude: destinationCoordinate.latitude,
                longitude: destinationCoordinate.longitude,
              }}
              description="destination Location"
            >
              <View className='m-auto'>
                 <LocationIcon width={40} height={40} />
              </View>
              <Text className={`text-[#0077B6] text-sm font-['bold']`}>Deivery Location</Text>
            </MarkerAnimated>
          )}

          {showDirections && currentLocation && pickupCoordinate && (
            <MapViewDirections
              origin={currentLocation}
              destination={pickupCoordinate}
              apikey={apiKey}
              strokeColor="#6644ff"
              strokeWidth={5}
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
      <View className='absolute top-0 flex items-start justify-start h-full w-full px-5 mt-10'>
              <TouchableOpacity onPress={()=>navigation.goBack()}
              className='flex items-center justify-center w-12 h-12 rounded-full bg-[#0077B6]'>
                   <AntDesign name="arrowleft" size={20} color="white" />
              </TouchableOpacity>
      </View>




      {/* BOTTOM */}
      <View className='absolute bottom-0 flex items-center justify-start w-full h-72 rounded-t-3xl border-[#D0D5DD] bg-white shadow-2xl shadow-slate-950'>
      {/* TOP LINE */}
    <View className='border-2 w-12 rounded-lg border-[#98A2B3] mt-3'></View>

    {/* RIDER DETAILS */}
    <View className='flex flex-row items-start justify-center w-full mt-8 px-5'>
        <View className='relative'>
           <View className='flex items-center justify-center w-[42px] h-[42px] rounded-full bg-[#EBF8FF]'>
           <Box />
           </View>
        </View>

        <View className='flex flex-1 items-start ml-5'>
              <View className='flex flex-row items-center justify-start'>
                   <Text className={`text-sm text-[#344054] font-['bold']`}>Standing Fan  ( Black )</Text>
              </View>
              <Text className={`text-sm text-[#344054] font-['regular'] mt-1`}>Tracking ID: 5654F4DSA545Q</Text>
        </View>
    </View>

    {/* LINES */}
    <View className='w-full border-[1px] border-[#E4E7EC] mt-4'></View>

    <View className='flex flex-row items-center justify-start w-full px-5 mt-3 mb-2'>
         <View className='flex items-start'>
             <Text className={`text-sm text-[#344054] font-['medium'] mt-1`}>Expected Delivery Time</Text> 
             <Text className={`text-base text-[#344054] font-['bold'] mt-1`}>1hr 3ms</Text> 
         </View>

         <View className='flex items-start ml-7'>
             <Text className={`text-sm text-[#344054] font-['medium'] mt-1`}>Amount Paid (N)</Text> 
             <Text className={`text-base text-[#344054] font-['bold'] mt-1`}>5,000.00</Text> 
         </View>
    </View>

      {/* BUTTONS */}
    <View className='flex flex-row items-center justify-between w-full px-5 mt-5'>
          <TouchableOpacity onPress={handleCallPress}
          className='flex flex-row items-center justify-center h-[44px] bg-[#27AE60] rounded-lg w-[47.5%] px-2'>
              <Phone />
              <Text className={`text-sm text-[#FFFFFF] font-['bold'] ml-3`}>Call Recipient</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDeliveredOrder} 
          className='flex flex-row items-center justify-center h-[44px] bg-[#EBF8FF] rounded-lg w-[47.5%] px-2'>
              <Text className={`text-sm text-[#0077B6] font-['bold'] ml-3`}>Arrived</Text>
          </TouchableOpacity>
    </View>
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
