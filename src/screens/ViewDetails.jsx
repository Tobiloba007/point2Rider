import { ActivityIndicator, Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Box from '../../assets/icon/box3.svg'
import Line from '../../assets/icon/line.svg'
import Copy from '../../assets/icon/copy.svg'
import Navigation from '../../assets/icon/navigation2.svg'
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useDispatch } from 'react-redux';
import { orderDelivered } from '../features/actions/General'



export default function ViewDetails({route}) {
    const { data } = route.params;

    const [copiedText, setCopiedText] = useState(data.tracking_id);

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(data.tracking_id);
      };

    const navigation = useNavigation();

    const dispatch = useDispatch();


    const handleDeliveredOrder = () => {
        const trackingId = {'tracking_id': data.tracking_id}
        navigation.navigate('delivered', { trackingId });
    }

  return (
    <SafeAreaView className="flex items-start justify-start w-full h-full bg-white px-5 pt-8">
            {/*HEADER */}
        <View className='relative flex flex-row items-center justify-center w-full bg-white pb-7 shadow-2xl'>
             <TouchableOpacity onPress={()=>navigation.goBack()}
             className="absolute left-0 flex flex-row items-center justify-start w-full">
                   <Feather name="arrow-left" size={18} color="#344054" />
                   <Text className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}>Back</Text>
             </TouchableOpacity>
             <Text className={`absolute text-lg text-[#101828] font-['bold'] pl-2 pb-[2px]`}>Package Details</Text>
        </View>

        
        <ScrollView 
        contentContainerStyle={{width: '100%', paddingBottom: 70}}
        showsVerticalScrollIndicator={false}
        >
            {/* PRODUCT */}
        <View className="flex flex-row items-start justify-start w-full mt-8">
                    <View className='flex items-center justify-center w-[42px] h-[42px] rounded-full bg-[#EBF8FF]'>
                         <Box />
                    </View>
                    <View className="flex-1 items-start justify-start ml-5">
                         <Text className={`text-sm text-[#344054] font-['bold']`}>
                              {data.package_name}
                         </Text>
                         <View className='flex flex-row items-center justify-start'>
                             <Text className={`text-sm text-[#1D2939] font-['regular'] pt-[6px]`}>
                                  Tracking ID: {copiedText}
                             </Text>
                             <TouchableOpacity onPress={copyToClipboard}
                             className='ml-2'>
                                  <Copy />
                             </TouchableOpacity>
                         </View>
                    </View>
        </View>

              {/* PRODUCT DETAILS */}
        <View className='flex flex-row items-start justify-start w-full mt-8'>
             <View className='flex items-start justify-start'>
                 <Text className={`text-xs text-[#475467] font-['medium']`}>Recipient Name</Text>
                 <Text className={`text-sm text-[#344054] font-['bold'] pt-1`}>{data.recepient_name}</Text>
             </View>

             <View className='flex items-start justify-start ml-12'>
                 <Text className={`text-xs text-[#475467] font-['medium']`}>Package Quantity</Text>
                 <Text className={`text-sm text-[#344054] font-['bold'] pt-1`}>30</Text>
             </View>
        </View>

        <View className='flex flex-row items-start justify-start w-full mt-5'>
             <View className='flex items-start justify-start'>
                 <Text className={`text-xs text-[#475467] font-['medium']`}>Expected Delivery Time</Text>
                 <Text className={`text-sm text-[#344054] font-['bold'] pt-1`}>1hr 3ms</Text>
             </View>

             <View className='flex items-start justify-start ml-12'>
                 <Text className={`text-xs text-[#475467] font-['medium']`}>Amount Paid (N)</Text>
                 <Text className={`text-sm text-[#344054] font-['bold'] pt-1`}>{data.amount}</Text>
             </View>
        </View>


        <View className="flex items-center justify-start rounded-2xl bg-[#F9FAFB] mt-5 p-4">

                <View className="flex flex-row items-start justify-start w-full">
                    <Octicons name="dot-fill" size={20} color="#CCE4F0" />
                    <View className="flex-1 items-start justify-start ml-2 pt-[2px]">
                         <Text className={`text-xs text-[#1D2939] font-['medium']`}>
                             From
                         </Text>
                         <Text className={`text-sm text-[#344054] font-['bold'] pt-[2px]`}>
                               {data.pickup_location}
                         </Text>
                    </View>
                </View>

                <View className="flex flex-row items-start justify-start w-full mt-5">
                    <Octicons name="dot-fill" size={20} color="#32D583" />
                    <View className="flex-1 items-start justify-start ml-2 pt-[2px]">
                         <Text className={`text-xs text-[#1D2939] font-['medium']`}>
                             Shipped to
                         </Text>
                         <Text className={`text-sm text-[#344054] font-['bold'] pt-[2px]`}>
                             {data.delivery_point_location}
                         </Text>
                    </View>
                </View>

                <View className='flex flex-row items-start justify-start w-full mt-8 pb-2 pl-5'>
                    <Text className={`text-sm text-[#344054] font-['bold']`}>
                        Status: {data.status === 'INTRANSIT' ? 'In-transit' : data.status === 'DELIVERED' && 'Delivered'}
                    </Text>
                    <View className="ml-1">
                       <Ionicons name="checkmark-circle-outline" size={20} color="#27AE60" />
                    </View>
                </View>

           </View>

           {/* PRODUCT STATUSES */}
           {data.status === 'INTRANSIT' &&
           <View className='flex items-start justify-start w-full mt-6'>
                  {/* PICKED UP */}
                 <View className='flex flex-row items-start justify-start w-full'>
                    <View className='flex items-center justify-start'>
                          <Octicons name="dot-fill" size={18} color="#0077B6" />
                          <View className='-mt-[6px]'>
                              <Line />
                          </View>
                    </View>

                    <View className='flex items-start ml-4'>
                         <Text className={`text-base text-[#344054] font-['bold']`}>
                             Package picked up by you
                         </Text>
                         <Text className={`text-sm text-[#475467] font-['regular']`}>
                             February 2, 2024. 10:00am
                         </Text>
                    </View>
                 </View>

                  {/* IN TRANSIT */}
                  {data.status === 'INTRANSIT' &&
                 <View className='flex flex-row items-start justify-start w-full -mt-3'>
                    <View className='flex items-center justify-start'>
                          <Octicons name="dot-fill" size={18} color="#0077B6" />
                          <View className='-mt-[6px]'>
                              <Line />
                          </View>
                    </View>

                    <View className='flex items-start ml-4'>
                         <Text className={`text-base text-[#344054] font-['bold']`}>
                             In Transit 
                         </Text>
                         <Text className={`text-sm text-[#475467] font-['regular']`}>
                             Package picked up by rider
                             <Text className={`font-['medium']`}> (KJA-884-RM)</Text>
                         </Text>
                    </View>
                 </View>
                  }


                  {/* DELIVERED */}
                 <View className='flex flex-row items-start justify-start w-full -mt-3'>
                    <View className='flex items-center justify-start'>
                         <Navigation />
                    </View>

                    <View className='flex items-start ml-4 -mt-1'>
                         <Text className={`text-base text-[#344054] font-['bold']`}>
                             {data.status === 'INTRANSIT' ? 'Delivering to' : data.status === 'COMPLETED' && 'Delivered to' }
                         </Text>
                         <Text className={`text-sm text-[#475467] font-['regular']`}>
                                {data.delivery_point_location}
                         </Text>
                    </View>
                 </View>

           </View>
           }


           {/* BUTTON */}
           {data.status === 'INTRANSIT' &&
           <View className="flex flex-row items-center justify-between w-full mt-12">
                <TouchableOpacity onPress={handleDeliveredOrder}
                className="flex items-center justify-center h-11 w-[48.5%] rounded-lg bg-[#0077B6]">
                     <Text className={`text-base font-[bold] text-white`}>Arrived</Text>
                </TouchableOpacity>

               <TouchableOpacity onPress={()=>navigation.navigate('trackPackage')}
               className="flex items-center justify-center h-11 w-[48.5%] rounded-lg bg-[#D9F2FF]">
                   <Text className={`text-base font-[bold] text-[#0077B6]`}>View Map</Text>
                </TouchableOpacity>  
           </View>
           }

           {data.status === 'COMPLETED' &&
           <View className="flex flex-row items-center justify-between w-full mt-12">
               <TouchableOpacity className="flex items-center justify-center h-11 w-full rounded-lg bg-green-600">
                    <Text className={`text-base font-[bold] text-white`}>Order Completed</Text>
               </TouchableOpacity>
           </View>
            }

           </ScrollView>

        
    </SafeAreaView>
  )
}
