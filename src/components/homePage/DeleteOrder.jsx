import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Box from '../../../assets/icon/box4.svg'


export default function DeleteOrder({setDeleteCard, setReason, setDeleted}) {

    const handleDelete = () => {
        setReason(true)
        setDeleteCard(false)
     //    setDeleted(true)
       }

  return (
    <View className='absolute bottom-0 flex items-center justify-start w-full pt-6 px-5 bg-white rounded-t-2xl pb-8'>
             <View className='flex items-center justify-center w-[67px] h-[67px] rounded-full bg-[#F2F4F7]'>
                  <Box />
             </View>

             <Text className={`text-xl text-[#1D2939] font-['bold'] pt-3`}>Are you sure?</Text>
             <Text className={`text-sm text-center text-[#1D2939] font-['regular'] pt-3`}>
                   Do you want to decline the pickup, once you {'\n'} decline it will be assigned to another rider
             </Text>

             <View className='flex flex-row items-center justify-between w-full mt-8'>
                  <TouchableOpacity onPress={handleDelete}
                  className='flex items-center justify-center w-[48%] h-11 rounded-lg bg-[#EB5757]'>
                       <Text className={`text-lg text-white font-['bold']`}>Yes, Decline</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>setDeleteCard(false)}
                  className='flex items-center justify-center w-[48%] h-11 rounded-lg bg-[#E4E7EC]'>
                       <Text className={`text-base text-[#475467] font-['bold']`}>Go back</Text>
                  </TouchableOpacity>
             </View>

    </View>
  )
}