import { Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import AppStack from './src/AppStack';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'black': require('./fonts/Satoshi-Black.otf'),
    'bold': require('./fonts/Satoshi-Bold.otf'),
    'medium': require('./fonts/Satoshi-Medium.otf'),
    'regular': require('./fonts/Satoshi-Regular.otf'),
    'light': require('./fonts/Satoshi-Light.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer>
        <View className="flex-1" onLayout={onLayoutRootView}>
           <AppStack />
        </View>
    </NavigationContainer>
  );
}

