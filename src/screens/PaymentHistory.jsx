import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SalaryHistory from '../components/earnings/SalaryHistory';
import BonusHistory from '../components/earnings/BonusHistory';
import TipsHistory from '../components/earnings/TipsHistory';



export default function PaymentHistory() {
    const [select, setSelect] = useState('Salary')

    const tabs = ['Salary', 'Bonus', 'Tips']

    const navigation = useNavigation();

    const handleSelect = (item) => {
        setSelect(item)
    }

  return (
    <View className='flex items-start justify-start pt-8 px-5'>
         <View className='relative flex flex-row items-center justify-center w-full mt-3'>
             <TouchableOpacity onPress={()=>navigation.goBack()}
             className="absolute left-0 flex flex-row items-center justify-start w-full">
                   <Feather name="arrow-left" size={18} color="#344054" />
                   <Text className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}>Back</Text>
             </TouchableOpacity>
             <Text className={`absolute text-lg text-[#101828] font-['bold'] pl-2 pb-[2px]`}>Payment History</Text>
         </View>

         <View className='flex flex-row items-center justify-start w-full mt-12 mb-2'>
               {tabs.map((item) => {
                return(
               <TouchableOpacity key={item} onPress={()=>handleSelect(item)}
                 className={`flex items-center justify-center h-9 px-4 mr-6 border-[1px] border-[#0077B6] bg-[#EBF8FF] rounded-3xl
                            ${select !== item && 'opacity-40'}`}>
                    <Text className={`text-sm text-[#1D2939] font-['medium']`}>{item}</Text>
               </TouchableOpacity>
               )
               })}
         </View>

         <ScrollView showsVerticalScrollIndicator={false}
           contentContainerStyle={{paddingBottom: 160}}
         >
            {
                select === 'Salary' ? <SalaryHistory />
                :select === 'Bonus' ? <BonusHistory />
                :select === 'Tips' && <TipsHistory />
            }
        </ScrollView>

    </View>
  )
}