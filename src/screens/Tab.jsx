import { View, Text, StatusBar, TouchableOpacity, ScrollView, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import HomeIcon from '../../assets/icon/home.svg'
import HomeIcon2 from '../../assets/icon/home2.svg'
import DeliveriesIcon from '../../assets/icon/delivery.svg'
import DeliveriesIcon2 from '../../assets/icon/delivery2.svg'
import EarningsIcon from '../../assets/icon/earning.svg'
import EarningsIcon2 from '../../assets/icon/earning2.svg'
import NotificationIcon from '../../assets/icon/notification.svg'
import NotificationIcon2 from '../../assets/icon/notification2.svg'
import ProfileIcon from '../../assets/icon/profile.svg'
import ProfileIcon2 from '../../assets/icon/profile2.svg'
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import HomePage from './HomePage'
import DeleteOrder from '../components/homePage/DeleteOrder'
import ReasonModal from '../components/homePage/ReasonModal'
import Deliveries from './Deliveries'
import Notifications from './Notifications'


export default function Tab() {
  const [tab, setTab] = useState('Home')
  const [inputModal, setInputModal] = useState(false)
  const [deleteCard, setDeleteCard] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [reason, setReason] = useState(false)
  const [location, setLocation] = useState('')


  const handleTab = (active) => {
    setTab(active)
    console.log(tab);
  }

  return (
    <View className="flex-1 justify-end w-full bg-white">
       <StatusBar backgroundColor="#F9FAFB" barStyle="dark-content" />

        <View className='flex-1'>
           {
               tab === 'Home' ? <HomePage setDeleteCard={setDeleteCard} deleted={deleted} />
              : tab === 'Deliveries' ? <Deliveries/>
              : tab === 'Notification' && <Notifications/>
           }
        </View>


        <View className="flex flex-row items-center justify-between w-full h-[75px] pb-4 bg-[#F9FAFB] pt-2 shadow-2xl">
            <TouchableOpacity onPress={()=>handleTab('Home')} 
            className="flex items-center justify-center w-[20%]">
               {
                tab === 'Home' ? <HomeIcon height={24} width={24} /> : <HomeIcon2 height={24} width={24} />
               }
               <Text className={`text-xs text-[#475467] font-['regular'] mt-2 ${tab === 'Home' && `text-[#003B5B] font-['bold']`}`}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>handleTab('Deliveries')} 
            className="flex items-center justify-center w-[20%]">
               {
                tab === 'Deliveries' ? <DeliveriesIcon height={24} width={24} /> : <DeliveriesIcon2 height={24} width={24} />
               }
               <Text className={`text-xs text-[#475467] font-['regular'] mt-2 ${tab === 'Deliveries' && `text-[#003B5B] font-['bold']`}`}>Deliveries</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>handleTab('Earnings')} 
            className="flex items-center justify-center w-[20%]">
               {
                tab === 'Earnings' ? <EarningsIcon height={24} width={24} /> : <EarningsIcon2 height={24} width={24} />
               }
               <Text className={`text-xs text-[#475467] font-['regular'] mt-2 ${tab === 'Earnings' && `text-[#003B5B] font-['bold']`}`}>Earnings</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>handleTab('Notification')} 
            className="flex items-center justify-center w-[20%]">
             {
              tab === 'Notification' ? <NotificationIcon2 height={24} width={24} /> : <NotificationIcon height={24} width={24} />
             }
               <Text className={`text-xs text-[#475467] font-['regular'] mt-2 ${tab === 'Notification' && `text-[#003B5B] font-['bold']`}`}>Notification</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>handleTab('Profile')} 
            className="flex items-center justify-center w-[20%]">
               {
                 tab === 'Profile' ? <ProfileIcon2 height={24} width={24} /> : <ProfileIcon height={24} width={24} />
               }
               <Text className={`text-xs text-[#475467] font-['regular'] mt-2 ${tab === 'Profile' && `text-[#003B5B] font-['medium']`}`}>Profile</Text>
            </TouchableOpacity>

            
        </View>

        {inputModal &&
        <Pressable onPress={()=>setInputModal(false)}
        className='absolute w-full h-full bg-[#A4A4A4] opacity-60'></Pressable>
        }

        {inputModal && 
          <View className='absolute flex items-center justify-start w-full h-[85%] bg-white z-50 rounded-t-2xl shadow-2xl pt-6 px-5'>
              <View className='flex flex-row items-center justify-between w-full'>
                  <Text className={`text-base text-[#1D2939] font-['medium']`}>Input your address below</Text>
                  <AntDesign onPress={()=>setInputModal(false)}
                  name="closecircleo" size={24} color="#475467" />
              </View>

              <View className="relative items-start justify-start w-full mt-5">
                  <TextInput className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-sm font-['regular'] 
                                       text-[#1D2939] pl-14 ${location && 'border-[#0077B6]'}`}
                  placeholder='street no, b/stop'
                  placeholderTextColor={'#667085'}
                  value={location}
                  onChangeText={(text)=>setLocation(text)}
                  />
                  <View className="absolute bottom-[13px] left-5 flex flex-row items-center justify-start">
                       <Fontisto name="search" size={22} color={location ? '#0077B6' : '#98A2B3'} />
                  </View>
              </View>

              <Text className={`text-sm text-left w-full mt-3 text-[#475467] font-['regular']`}>
                 Kindly enter the most accurate address to find you
              </Text>

          </View>
        }

        {deleteCard &&
         <Pressable onPress={()=>setDeleteCard(false)}
         className='absolute w-full h-full bg-[#A4A4A4] opacity-60'></Pressable>
         }
 
         {deleteCard && 
            <DeleteOrder 
            setDeleteCard={setDeleteCard}
            setDeleted={setDeleted} 
            setReason={setReason}
            />
         }

        {reason &&
         <Pressable onPress={()=>setReason(false)}
         className='absolute w-full h-full bg-[#A4A4A4] opacity-60'></Pressable>
         }
 
         {reason && 
            <ReasonModal 
            setDeleted={setDeleted}
            setReason={setReason}
             />}
        
    </View>
  )
}