import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Delivered from '../../assets/icon/delivered.svg'
import Picked from '../../assets/icon/picked.svg'
import Completed from '../../assets/icon/complete.svg'
import Box from '../../assets/icon/box.svg'
import { useNavigation } from '@react-navigation/native'

export default function Notifications() {
  const navigation = useNavigation();
  

  const notifications = [
    {
      id: 1,
      status_id: 'accepted',
      icons: <Delivered />,
      title: 'Package (#563235SA5D) accepted',
      content: 'You have accepted to deliver package to the assigned address',
      estimated_time: 'Expected delivery time: 1hr 54m',
    },
    {
      id: 2,
      status_id: 'declined',
      icons: <Picked />,
      title: 'Package  (#563235SA5D) declined',
      content: 'You have successfully  declined the order',
    },
    {
      id: 3,
      status_id: 'pending',
      icons: <Completed />,
      title: 'Add Bank Account Details',
      content: 'Complete your profile details by adding your desired bank account'
    },
  
  ]


  const yesterday = [
    {
      id: 1,
      status_id: 'withdrawal',
      icons: <Box width={19} />,
      title: 'Withdraw Successful',
      content: 'You have successfully withdrawn N5,000 to  your account ending in 7160',
    },
    {
      id: 2,
      status_id: 'bonus',
      icons: <Delivered />,
      title: 'Hurray! Bonus Recieved',
      content: 'You have received a bonus of N2,000 to your wallet',
    },
  
  ]

  const handlePress = () => {
    navigation.navigate('viewDetailsPage')
  }

  return (
    <View className="flex-1 items-center justify-start w-full bg-white px-5 pt-8">
         <Text className={`text-2xl text-[#1D2939] font-['medium'] w-full text-start`}>Notifications</Text>


         <ScrollView contentContainerStyle={{width: '100%'}}
          showsVerticalScrollIndicator={false}
         >

         <View className='flex flex-col items-start justify-start w-full mt-7'>
              <Text className={`text-xs text-[#667085] font-['medium'] mb-5`}>Today</Text>

              <View className='flex flex-col items-start justify-start w-full'>
                  {notifications.map((item) => {
                    return(
                  <TouchableOpacity key={item.id} onPress={handlePress} 
                  className='flex flex-row items-start justify-start w-full mb-6'>
                              {/* ICON */}
                       <View className={`flex items-center justify-center h-[42px] w-[42px] rounded-full 
                       bg-[${item.status_id === 'delivered' ? '#DBF3E5' : item.status_id === 'declined' ? '#EBF8FF' : item.status_id === 'pending' && '#FBF1D2'}]`}
                       >
                            {item.icons}
                       </View>
                       <View className='flex flex-col items-start justify-start flex-1 ml-4'>
                            <Text className={`text-sm text-[#1D2939] font-['bold']`}>
                                {item.title} <Text className={`font-['medium']`}>{item.status}</Text>
                            </Text>
                            <Text className={`text-sm text-[#667085] font-['regular'] mt-2`}>
                                 {item.content} <Text className={`text-sm text-[#0077B6] font-['bold'] mt-2`}>
                                      {item.estimated_time}
                                 </Text>
                            </Text>
                       </View>
                  </TouchableOpacity>
                  )
                  })}
              </View>
         </View>

         <View className='flex flex-col items-start justify-start w-full mt-4'>
              <Text className={`text-xs text-[#667085] font-['medium'] mb-5`}>Yesterday</Text>

              <View className='flex flex-col items-start justify-start w-full'>
                  {yesterday.map((item) => {
                    return(
                  <TouchableOpacity key={item.id} onPress={handlePress}
                  className='flex flex-row items-start justify-start w-full mb-7'>
                              {/* ICON */}
                       <View className={`flex items-center justify-center h-[42px] w-[42px] rounded-full 
                       bg-[${item.status_id === 'bonus' ? '#DBF3E5' : item.status_id === 'withdrawal' && '#EBF8FF'}]`}>
                            {item.icons}
                       </View>
                       <View className='flex flex-col items-start justify-start flex-1 ml-4'>
                            <Text className={`text-sm text-[#1D2939] font-['bold']`}>
                                {item.title} <Text className={`font-['medium']`}>{item.status}</Text>
                            </Text>
                            <Text className={`text-sm text-[#667085] font-['regular'] mt-2`}>
                                 {item.content} <Text className={`text-sm text-[#0077B6] font-['medium'] mt-2`}>
                                      {item.estimated_time}
                                 </Text>
                            </Text>
                       </View>
                  </TouchableOpacity>
                  )
                  })}
              </View>
         </View>

         </ScrollView>

    </View>
  )
}