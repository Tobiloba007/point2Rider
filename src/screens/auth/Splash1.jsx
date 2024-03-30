import { Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { colors } from '../../colors'
import { useNavigation } from '@react-navigation/native'
import { Animated, StyleSheet } from 'react-native';

export default function Splash1() {
    const navigation = useNavigation();

      // Create an animated value
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Define the animation sequence
    Animated.loop(
      Animated.sequence([
        // Reset to initial value if needed
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        // Animate to final values
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000, // Duration of the animation
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: -1, // Loop indefinitely
      }
    ).start();
  }, [animatedValue]);

  // Interpolate values for scaling and opacity
  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5], // Scale up from original size to double
  });
  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.5, 0], // Fade out animation

  });

  // navigate to second screen after 2 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.navigate('splash2');
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [navigation]);

  return (
    <View className="flex-1 items-center justify-center w-full bg-white">
    {/*<View className="flex-1 items-center justify-center w-full bg-white">
              <View className={`animate-ping items-center justify-center bg-[#D9EBf4] h-[130px] w-[130px] rounded-full p-10`}>
                  <View className={`h-full w-full rounded-full bg-[#0077B6] flex-row items-center justify-center`}>
                     <Text className={`text-white text-2xl mb-3`}>.</Text>
                     <Text className={`text-white text-2xl font-['bold']`}>2</Text>
                  </View>
              </View>
       
  </View>*/}
      <Animated.View
        style={[
          styles.ping,
          {
            transform: [{ scale: scale }],
            opacity: opacity,
          },
        ]}
       />
      <View className={`absolute h-[50px] w-[50px] rounded-full bg-[#0077B6] flex-row items-center justify-center`}>
          <Text className={`text-white text-2xl mb-3`}>.</Text>
          <Text className={`text-white text-2xl font-['bold']`}>2</Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  ping: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    height: 130,
    borderRadius: 9999,
    backgroundColor: '#D9EBf4',
    padding: 10,
  },
});
