import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import rider from '../../assets/images/rider.jpg'
import Message from '../../assets/icon/message.svg'
import { Octicons } from '@expo/vector-icons';
import Empty from '../components/homePage/Empty';
import Bag from '../../assets/icon/bag.svg'
import Line from '../../assets/icon/line.svg'
import Location from '../../assets/icon/location.svg'
import { useNavigation } from '@react-navigation/native';




export default function HomePage({setDeleteCard, deleted}) {
   const orders = [
      {
         id: 1,
         package: '#5654F4DSA545Q',
         pickUp: '26, Bamgbose street, lagos island',
         name: 'Jemilat',
         address: '100, ikosi street, Ebute meta',
         phone: '09081688842',
         time: '12:07pm',
      },
      {
         id: 2,
         package: '#8891SAGD712',
         pickUp: '11, Aronja avenue, ketu',
         name: 'Lagbaja',
         address: 'Block 2, flat 7, Beach house estate, Ajah',
         phone: '08145679752',
         time: '8:00am',
      },
      {
         id: 3,
         package: '#5654F4DSA545Q',
         pickUp: 'pickup address goes here',
         name: 'Victoria',
         address: 'delivery address goes here',
         phone: '08090908788',
         time: '12:07pm',
      },
   ]

   const [acceptOrder, setAcceptOrder] = useState(null)

   const handleAccept = (item) => {
      setAcceptOrder(item)
   }

   const handleDecline = (item) => {
      setDeleteCard(item)
   }

   const navigation = useNavigation();

  return (
    <ScrollView 
    contentContainerStyle={{display: 'flex-1', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 20, paddingBottom: 40}}
    showsVerticalScrollIndicator={false}
    >    
           {/* HEADER */}
       <View className='flex flex-row items-center justify-between w-full pt-8'>
           <View className='flex flex-row items-center justify-start'>
                <Image className='h-[60px] w-[60px] rounded-full'
                source={rider} alt='rider image' />
                <View className='flex items-start ml-4'>
                   <Text className={`text-[#475467] text-sm font-['medium']`}>Hello,</Text>
                   <Text className={`text-[#101828] text-base font-['bold']`}>Samuel</Text>
                </View>
           </View>

           <View className='flex flex-row items-center justify-end'>
              <TouchableOpacity onPress={()=>navigation.navigate('chatScreen')}
              className='relative flex items-center justify-center w-12 h-12 rounded-full bg-[#EBF8FF]'>
                   <Message />
                   <View className='absolute top-0 right-0 flex items-center justify-center bg-[#EB5757] h-4 w-4 rounded-full'>
                       <Text className={`text-[#FFFFFF] text-[11px] font-['bold']`}>2</Text>
                   </View>
              </TouchableOpacity>

              <TouchableOpacity className='flex flex-row items-center justify-center w-[94px] h-[36px] rounded-3xl bg-[#F3FFF8] 
                                           border-[1.2px] border-[#475467] ml-3'>
                    <Octicons name="dot-fill" size={20} color="#27AE60" />
                    <Text className={`text-[#475467] text-sm font-['medium'] ml-2`}>Online</Text>
              </TouchableOpacity>
           </View>
       </View>

       {/*<Empty />*/}

       <View className='flex items-center justify-start w-full mt-7'>
           {orders.map((item) => {
            return(
           <View key={item.id} 
           className='flex items-start justify-start w-full rounded-xl py-4 px-4 bg-[#FCFCFD] border-[1px] border-[#DDDDDD] mb-5'>
                {/* PACKAGE */}
               <View className='flex flex-row items-center justify-start w-full'>
                   <Bag />
                   <Text className={`text-[#667085] text-xs font-['medium'] ml-3`}>PACKAGE {item.package}</Text>
               </View>

                 {/* PICK ADDRESS */}
               <View className='flex flex-row items-start justify-start mt-5'>
                   <View className='flex items-center justify-start'>
                      <Octicons name="dot-fill" size={18} color="#0077B6" />
                      <View className='-mt-[6px]'>
                          <Line />
                      </View>
                   </View>

                   <View className='ml-4'>
                      <Text className={`text-[#344054] text-base font-['bold']`}>Pick Up</Text>
                      <Text className={`text-[#475467] text-sm font-['medium']`}>{item.pickUp}</Text>
                   </View>
               </View>

                 {/* DELIVERY LOCATION */}
               <View className='flex flex-row items-start justify-start -mt-1 -ml-[3px]'>
                   <View className='flex items-center justify-start'>
                       <Location />
                   </View>

                   <View className='ml-4 -mt-1'>
                      <Text className={`text-[#344054] text-base font-['bold']`}>To {item.name}</Text>
                      <Text className={`text-[#475467] text-sm font-['medium']`}>{item.address}</Text>
                   </View>
               </View>

                 {/* DURATION */}
               <View className='flex flex-row items-center justify-start mt-6'>
                   <View className='flex items-start'>
                       <Text className={`text-[#344054] text-sm font-['medium']`}>Phone number</Text>
                       <Text className={`text-[#1D2939] text-xl font-['bold'] mt-1`}>{item.phone}</Text>
                   </View>

                   <View className='flex items-start ml-12'>
                       <Text className={`text-[#344054] text-sm font-['medium']`}>Delivery time</Text>
                       <Text className={`text-[#1D2939] text-xl font-['bold'] mt-1`}>{item.time}</Text>
                   </View>
               </View>

                 {/* BUTTONS */}
               {deleted
                ?<View className='flex flex-row items-center justify-between w-full mt-8'>
                    <TouchableOpacity className='flex items-center justify-center w-full h-11 bg-[#F2F4F7] rounded-lg border-[1px] border-[#D0D5DD]'>
                        <Text className={`text-[#667085] text-base font-['bold']`}>Order Declined</Text>
                    </TouchableOpacity>
                </View>

               :<View className='w-full'>
               {acceptOrder === item.id
               ?<View className='flex flex-row items-center justify-between w-full mt-8'>
                   <TouchableOpacity className='flex items-center justify-center w-[48%] h-11 bg-[#0077B6] rounded-lg'>
                       <Text className={`text-white text-base font-['bold']`}>Picked Up</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>navigation.navigate('viewDetails')}
                   className='flex items-center justify-center w-[48%] h-11 bg-[#D9F2FF] rounded-lg'>
                       <Text className={`text-[#0077B6] text-base font-['bold']`}>View Details</Text>
                   </TouchableOpacity>

               </View>

               :<View className='flex flex-row items-center justify-between w-full mt-8'>
                   <TouchableOpacity onPress={()=>handleAccept(item.id)}
                   className='flex items-center justify-center w-[48%] h-11 bg-[#0077B6] rounded-lg'>
                       <Text className={`text-white text-base font-['bold']`}>Accept Order</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>handleDecline(item.id)}
                   className='flex items-center justify-center w-[48%] h-11 bg-[#F2F4F7] rounded-lg'>
                       <Text className={`text-[#0077B6] text-base font-['bold']`}>Decline</Text>
                   </TouchableOpacity>

               </View>
               }
               </View>
              }

           </View>
           )
           })}

       </View>

    </ScrollView>
  )
}