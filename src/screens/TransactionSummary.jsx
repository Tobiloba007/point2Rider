import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import Icon from '../../assets/icon/summary.svg'
import { useNavigation } from '@react-navigation/native';


export default function TransactionSummary() {
    const navigation = useNavigation();

  return (
    <View className='flex-1 items-start justify-start pt-8 px-5 bg-white'>
         <StatusBar backgroundColor="#F9FAFB" barStyle="dark-content" />
         <View className='relative flex flex-row items-center justify-center w-full mb-4'>
             <TouchableOpacity onPress={()=>navigation.goBack()}
             className="absolute left-0 flex flex-row items-center justify-start w-full">
                   <Feather name="arrow-left" size={18} color="#344054" />
                   <Text className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}>Back</Text>
             </TouchableOpacity>
             <Text className={`absolute text-lg text-[#101828] font-['bold'] pl-2 pb-[2px]`}>Transaction Summary</Text>
         </View>

         <ScrollView contentContainerStyle={{paddingBottom: 50}}
         showsVerticalScrollIndicator={false}>
         <View className='flex items-center justify-start w-full mt-20'>
              <View className='flex items-center justify-center h-[100px] w-[100px] rounded-full bg-[#EBF8FF]'>
                  <Icon />
              </View>
              <Text className={`text-xl text-[#1D2939] font-['bold'] mt-7`}>Salary (December)</Text>
              <Text className={`text-xs text-[#667085] font-['medium'] mt-3`}>Feb 2, 2024
              <Text className={`text-sm text-[#F2994A] font-['medium'] mt-3`}>   Pending</Text>
              </Text>
         </View>

         <View className='flex items-center w-full mt-16'>
              <View className='flex flex-row items-center justify-between w-full mb-2'>
                    <Text className={`text-xl text-[#1D2939] font-['regular'] mt-3`}>Basic Salary</Text>
                    <Text className={`text-xl text-[#1D2939] font-['bold'] mt-3`}>N1000.00</Text>
              </View>

              <View className='flex flex-row items-center justify-between w-full mb-2'>
                    <Text className={`text-lg text-[#1D2939] font-['regular'] mt-3`}>Commissions</Text>
                    <Text className={`text-lg text-[#1D2939] font-['bold'] mt-3`}>N100.00</Text>
              </View>

              <View className='flex flex-row items-center justify-between w-full mb-2'>
                    <Text className={`text-lg text-[#1D2939] font-['regular'] mt-3`}>Total</Text>
                    <Text className={`text-lg text-[#1D2939] font-['bold'] mt-3`}>N1,100.00</Text>
              </View>
         </View>

         <View className='flex items-center justify-start w-full mt-20'>
             <TouchableOpacity onPress={()=>navigation.navigate('tab')}
             className={`flex items-center justify-center h-12 w-full rounded-lg bg-[#0077B6]`}>
                     <Text className={`text-base font-[bold] text-white`}>Go Home</Text>
             </TouchableOpacity>
             <TouchableOpacity  onPress={()=>navigation.navigate('reportIssue')}
             className={`flex items-center justify-center mt-7 h-12 w-full rounded-lg bg-[#D9F2FF]`}>
                     <Text className={`text-base font-[bold] text-[#0077B6]`}>Report an Issue</Text>
             </TouchableOpacity>
         </View>

         </ScrollView>

    </View>
  )
}