import React from 'react'
import { Image, Linking, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import Phone from '../../assets/icon/phone2.svg'
import Chat from '../../assets/icon/chat2.svg'
import { AntDesign } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native'
import Box from '../../assets/icon/box3.svg'




const TrackPackage = () => {

    const handleCallPress = () => {
        const phoneUrl = `tel:${'09023456789'}`;
        Linking.openURL(phoneUrl);
      };
    
      const navigation = useNavigation()

  return (
    <View className="flex items-start justify-start w-full h-full bg-gray-300">
           {/*<MapView
           style={{height: '100%', width: '100%'}}
           >
           </MapView>*/}

             {/* BACK BUTTON */}
         <View className='absolute top-0 flex items-start justify-start h-full w-full px-5 mt-10'>
              <TouchableOpacity onPress={()=>navigation.goBack()}
              className='flex items-center justify-center w-12 h-12 rounded-full bg-[#0077B6]'>
                   <AntDesign name="arrowleft" size={20} color="white" />
              </TouchableOpacity>
         </View>



             {/* BOTTOM DETAILS */}
         <View className='absolute bottom-0 flex items-center justify-start w-full pb-8 rounded-t-3xl border-[#D0D5DD] bg-white shadow-2xl shadow-slate-950'>
                 {/* TOP LINE */}
               <View className='border-[1.5px] w-12 rounded-xl border-[#98A2B3] mt-3'></View>

               {/* PACKAGE DETAILS */}
               <View className="flex flex-row items-start justify-start w-full mt-5 px-5">
                    <View className='flex items-center justify-center w-[42px] h-[42px] rounded-full bg-[#EBF8FF]'>
                         <Box />
                    </View>
                    <View className="flex-1 items-start justify-start ml-5">
                         <Text className={`text-sm text-[#344054] font-['bold']`}>
                              Standing Fan  ( Black )
                         </Text>
                         <View className='flex flex-row items-center justify-start'>
                             <Text className={`text-sm text-[#1D2939] font-['regular'] pt-[6px]`}>
                                  Tracking ID: 5654F4DSA545Q
                             </Text>
                         </View>
                    </View>
               </View>

               {/* LINES */}
               <View className='w-full border-[1px] border-[#E4E7EC] mt-4 opacity-40'></View>

               <View className='flex flex-row items-start justify-start mt-3'>
                   <View className='flex items-start ml-6'>
                       <Text className={`text-xs text-[#475467] font-['medium']`}>Expected Delivery Time</Text>
                       <Text className={`text-sm text-[#344054] font-['bold']`}>1hr 3ms</Text> 
                   </View>
                   <View className='flex items-start ml-6'>
                       <Text className={`text-xs text-[#475467] font-['medium']`}>Amount Paid (N)</Text>
                       <Text className={`text-sm text-[#344054] font-['bold']`}>5,000.00</Text> 
                   </View>
               </View>

                 {/* BUTTONS */}
               <View className='flex flex-row items-center justify-between w-full px-5 mt-8'>
                     <TouchableOpacity onPress={handleCallPress}
                     className='flex flex-row items-center justify-center h-[44px] bg-[#27AE60] rounded-lg w-[47.5%] px-2'>
                         <Phone />
                         <Text className={`text-sm text-[#FFFFFF] font-['bold'] ml-3`}>Call Recipient</Text>
                     </TouchableOpacity>

                     <TouchableOpacity onPress={()=>navigation.navigate('delivered')}
                     className='flex flex-row items-center justify-center h-[44px] bg-[#EBF8FF] rounded-lg w-[47.5%] px-2'>
                         <Text className={`text-sm text-[#0077B6] font-['bold']`}>Arrived</Text>
                     </TouchableOpacity>
               </View>
         </View>
    </View>
  )
}

export default TrackPackage