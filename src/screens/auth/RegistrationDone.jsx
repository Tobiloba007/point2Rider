import { View, Text, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function RegistrationDone() {
    const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 items-center justify-end bg-white pb-24 px-5">
         <View className="flex items-center justify-center h-[183px] w-[183px] rounded-full bg-[#DFF3E8]">
               <View className="flex items-center justify-center h-[70.5px] w-[70.5px] rounded-full bg-[#27AE60]">
                    <FontAwesome6 name="check" size={35} color="white" />
               </View>
         </View>

         <View className="flex items-center justify-center w-full mt-[50%]">
             <Text className={`text-3xl text-[#1D2939] font-['bold'] pl-2 pb-[2px]`}>Welcome, Samuel</Text>
             <Text className={`text-sm text-center text-[#1D2939] font-['regular'] pl-2 pb-[2px] mt-1`}>
                   Proceed to your account dashboard to {'\n'} start picking up orders
             </Text>
         </View>

         <View className="flex items-center justify-center w-full mt-14">
              <TouchableOpacity onPress={()=>navigation.navigate('login')}
              className="flex items-center justify-center h-12 w-full rounded-lg bg-[#0077B6]">
                  <Text className={`text-base font-[bold] text-[#FFFFFF]`}>Continue</Text>
              </TouchableOpacity>
         </View>

    </SafeAreaView>
  )
}