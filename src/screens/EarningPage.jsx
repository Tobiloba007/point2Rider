import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Salary from '../../assets/icon/salary.svg'
import Commision from '../../assets/icon/commission.svg'
import Bonus from '../../assets/icon/bonus.svg'
import { useNavigation } from '@react-navigation/native'



export default function EarningPage() {
    const history = [
        {
            id: 1,
            icon: <Salary />,
            title: 'Salary (December)',
            desc: 'Samuel Ajayi, Firstbank',
            amount: 'N100,000',
            status: 'Paid',
            type: 'salary',
        },
        {
            id: 2,
            icon: <Salary />,
            title: 'Salary (December)',
            desc: 'Samuel Ajayi, Firstbank',
            amount: 'N100,000',
            status: 'Paid',
            type: 'salary',
        },
        {
            id: 3,
            icon: <Commision />,
            title: 'Salary (December)',
            desc: 'Samuel Ajayi, Firstbank',
            amount: 'N100,000',
            status: 'Paid',
            type: 'commission',
        },
        {
            id: 4,
            icon: <Commision />,
            title: 'Salary (December)',
            desc: 'Samuel Ajayi, Firstbank',
            amount: 'N100,000',
            status: 'Paid',
            type: 'commission',
        },
        {
            id: 5,
            icon: <Bonus />,
            title: 'Salary (December)',
            desc: 'Samuel Ajayi, Firstbank',
            amount: 'N100,000',
            status: 'Paid',
            type: 'bonus',
        },
        {
            id: 6,
            icon: <Salary />,
            title: 'Salary (December)',
            desc: 'Samuel Ajayi, Firstbank',
            amount: 'N100,000',
            status: 'Paid',
            type: 'salary',
        },
    ]

    const navigation = useNavigation();


  return (
    <View className='flex flex-1 items-start justify-start pt-8 px-5'>
        <Text className={`text-[#1D2939] text-2xl font-['medium'] w-full text-start`}>Earnings</Text>

        <ScrollView contentContainerStyle={{width: '100%'}}
          showsVerticalScrollIndicator={false}
         >
              <TouchableOpacity className='flex flex-row items-center justify-between w-full mt-7 mb-4'>
                   <Text className={`text-[#1D2939] text-sm font-['medium'] text-start`}>Recent Transactions</Text>
                   <Pressable onPress={()=>navigation.navigate('paymentHistory')}>
                       <Text className={`text-[#0077B6] text-sm font-['medium']text-start`}>View all</Text>
                   </Pressable>
              </TouchableOpacity>

              <View className='flex items-center justify-start w-full'>
              {history.map((item) => {
                return(
               <View key={item.id} className='flex items-center w-full mt-3'>
                  <View className='flex flex-row items-center justify-between w-full'>
                      <View className='flex flex-row items-start justify-start'>
                          <View className={`flex items-center justify-center h-[52px] w-[52px] rounded-full
                                           ${item.type === 'salary' ? 'bg-[#EBF8FF]' : item.type === 'commission' ? 'bg-[#ddf0e4]' : item.type === 'bonus' && 'bg-[#EAEAEA]'}`}>
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

                  <View className='w-full border-[0.5px] border-black opacity-5 mt-4'></View>

                </View>
                )
               })}
              </View>

        </ScrollView>



    </View>
  )
}
