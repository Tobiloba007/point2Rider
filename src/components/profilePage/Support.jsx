import { SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import Phone from '../../../assets/icon/phone.svg'
import Chat from '../../../assets/icon/chat.svg'


export default function Support({setPages}) {
  return (
    <View className={`flex-1 items-start justify-start w-full bg-white px-5`}>

        <View className='relative flex flex-row items-center justify-center w-full mt-3'>
             <TouchableOpacity onPress={()=>setPages(0)}
             className="absolute flex flex-row items-center justify-start w-full">
                   <Feather name="arrow-left" size={18} color="#344054" />
                   <Text className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}>Back</Text>
             </TouchableOpacity>
             <Text className={`absolute text-lg text-[#101828] font-['bold'] pl-2 pb-[2px]`}>Help & Support</Text>
        </View>
 

        <View className='flex flex-row items-center justify-start w-full mt-12'>
             <View className='flex items-center justify-center h-12 w-12 bg-[#EBF8FF] rounded-full'>
                  <Phone />
             </View>
             <Text className={`text-base text-[#667085] font-['medium'] ml-5`}>Contact Us</Text>
        </View>


        <View className='flex flex-row items-center justify-start w-full mt-8'>
             <View className='flex items-center justify-center h-12 w-12 bg-[#EBF8FF] rounded-full'>
                 <Chat />
             </View>
             <Text className={`text-base text-[#667085] font-['medium'] ml-5`}>FAQs</Text>
        </View>

        <View className='flex items-center justify-start w-full mt-36'>
             <Text className={`text-base text-[#667085] font-['medium']`}>Point2 Delivery</Text>
             <Text className={`text-xs text-[#667085] font-['regular']`}>Version 1.0.0</Text>
        </View>


    </View>
  )
}