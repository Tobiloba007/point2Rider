import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Delete from '../../../assets/icon/delete.svg'


export default function DeleteModal({setDeleteBank}) {
  return (
    <View className='absolute bottom-0 flex items-center justify-start w-full pt-6 px-5 bg-white rounded-t-2xl pb-16'>
             <View className='flex items-center justify-center w-14 h-14 rounded-full bg-[#FCE6E6]'>
                  <Delete width={21.33} height={24} />
             </View>

             <Text className={`text-xl text-[#1D2939] font-['bold'] pt-3`}>Confirm Delete</Text>

             <View className='flex flex-row items-center justify-between w-full mt-10'>
                  <TouchableOpacity onPress={()=>setDeleteBank(false)}
                  className='flex items-center justify-center w-[48%] h-11 rounded-lg bg-[#EB5757]'>
                       <Text className={`text-base text-white font-['bold']`}>Yes, delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>setDeleteBank(false)}
                  className='flex items-center justify-center w-[48%] h-11 rounded-lg bg-[#F9FAFB] border-[1px] border-[#D0D5DD]'>
                       <Text className={`text-base text-[#1D2939] font-['bold']`}>Go back</Text>
                  </TouchableOpacity>
             </View>

    </View>
  )
}