import { View, Text, ScrollView, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import Box from '../../../assets/icon/box.svg'
import { getAllOrders } from '../../features/actions/General';
import Empty from '../homePage/Empty';
import { useDispatch } from 'react-redux';



export const DeliveriesHistory = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [orders, setOrders] = useState([]) 
    const [empty, setEmpty] = useState(false);
    const [dropdown, setDropdown] = useState(false)
    const [select, setSelect] = useState('This month')

    const [totalOrders, setTotalOrders] = useState(0)

    const items = ['This Month', 'Last 3  Month', 'This Year', 'Last Year']

    const handleSelect = (item) => {
        setSelect(item)
        setDropdown(false)
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrders(setOrders, setLoading, setError, setEmpty))
        setTotalOrders(orders.length + 0)
   }, [dispatch])


  return (
    <ScrollView 
    contentContainerStyle={{display: 'flex-1', alignItems: 'center', justifyContent: 'flex-start', marginTop: 20 , paddingBottom: 40}}
    >
          <View className='relative flex items-start w-full px-5'>
             <Pressable onPress={()=>setDropdown(!dropdown)} 
             className='flex flex-row items-center justify-center w-[107px] h-[42px] border-[1px] border-[#0077B6] rounded-md'>
                  <Text className={`text-[#1D2939] text-xs font-['medium'] mr-1`}>{select}</Text>
                  {
                    dropdown
                    ?<MaterialIcons name="keyboard-arrow-up" size={20} color="#1D2939" />
                    :<MaterialIcons name="keyboard-arrow-down" size={20} color="#1D2939" />
                  }
             </Pressable>
             {dropdown &&
             <View className='absolute left-5 top-11 z-50 flex items-start justify-center w-[107px] rounded-md mt-1 py-1 px-3 bg-white shadow-slate-800 border-[1px] border-[#dddddd]'>
                   {items.map((item) => {
                    return(
                   <TouchableOpacity key={item} onPress={()=>handleSelect(item)}
                   className='w-full hover:bg-[#F2F4F7] my-2'>
                       <Text className={`text-[#1D2939] text-xs font-['medium'] text-start`}>{item}</Text>
                   </TouchableOpacity>
                   )
                   })}
             </View>
             }
          </View>


          {loading &&
            <View className='flex h-full w-screen items-center justify-center'>
                  <ActivityIndicator size="large" color="#0077B6" />
            </View>
           }
    
              {/* EMPTY ORDERS */}
              {empty &&
               <View className="flex items-center justify-center w-full">
                      <Empty />
               </View>
               }

          <View className='flex items-center justify-start w-full px-5 pt-8'>
               {orders.map((item) => {
                return(
               <View key={item.id} className='flex items-center w-full mt-3'>
                  <View className='flex flex-row items-center justify-between w-full'>
                      <View className='flex flex-row items-start justify-start'>
                          <View className='flex items-center justify-center h-[42px] w-[42px] rounded-full bg-[#EBF8FF]'>
                              <Box width={19.2} />
                          </View>
                          <View className='flex items-start ml-3'>
                              <Text className={`text-[#344054] text-sm font-['bold'] text-start`}>{item.package_name}</Text>
                              <Text className={`text-[#1D2939] text-sm font-['regular'] text-start mt-2 w-[200px]`}>Tracking ID: {item.tracking_id}</Text>
                          </View>
                      </View>

                      <View className='flex'>
                           <Text className={`text-sm font-['bold'] text-start ${item.status === 'DELIVERED' ? 'text-[#27AE60]' : item.status === 'INTRANSIT' ? 'text-[#F2C94C]' : item.status === 'CANCELLED' && 'text-[#f2654c]'}`}>
                                              {item.status === 'INTRANSIT' ? 'In-transit' 
                                              : item.status === 'DELIVERED' ? 'Completed' 
                                              : item.status === 'CANCELLED' && 'Cancelled'}
                                             </Text>
                      </View>
                  </View>

                  <View className='w-full border-[0.5px] border-black opacity-5 mt-4'></View>

                </View>
                )
               })}
          </View>

    </ScrollView>
  )
}
