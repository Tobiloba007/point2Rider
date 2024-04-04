import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Salary from '../../../assets/icon/salary.svg'
import Commission from '../../../assets/icon/commission.svg'
import Bonus from '../../../assets/icon/bonus.svg'
import { useNavigation } from '@react-navigation/native'



export default function SalaryHistory() {
    const history = [
        {
            id: 1,
            icon: <Commission />,
            title: 'Commission',
            desc: 'October Salary',
            amount: 'N7,000',
            status: 'Pending',
        },
        {
            id: 2,
            icon: <Commission />,
            title: 'Commission',
            desc: 'August Salary',
            amount: 'N7,000',
            status: 'Paid',
        },
        {
            id: 3,
            icon: <Commission />,
            title: 'Commission',
            desc: 'July Salary',
            amount: 'N7,000',
            status: 'Paid',
        },
    ]

    const navigation = useNavigation();


  return (
    <View className='flex items-center justify-start w-full'>
          <View className='flex items-center justify-start w-full'>
              {history.map((item) => {
                return(
               <View key={item.id} className='flex items-center w-full mt-7'>
                  <View className='flex flex-row items-center justify-between w-full'>
                      <View className='flex flex-row items-start justify-start'>
                          <View className={`flex items-center justify-center h-[52px] w-[52px] rounded-full bg-[#ddf0e4]`}>
                              {item.icon}
                          </View>
                          <View className='flex items-start ml-3'>
                              <Text className={`text-[#1D2939] text-sm font-['medium'] text-start`}>{item.title}</Text>
                              <Text className={`text-[#667085] text-sm font-['medium'] text-start mt-1 w-[200px]`}>{item.desc}</Text>
                          </View>
                      </View>

                      <View className='flex items-end'>
                           <Text className={`text-sm font-['bold'] text-start`}>{item.amount}</Text>
                           <Text className={`text-sm font-['medium'] text-start mt-1 ${item.status === 'Paid' ? 'text-[#27AE60]' 
                                             : item.status === 'Pending' && 'text-[#F2994A]'}`}>{item.status}</Text>
                      </View>
                  </View>

                </View>
                )
               })}
              </View>

    </View>
  )
}