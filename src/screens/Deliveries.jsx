import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Bag from '../../assets/icon/bag.svg'
import { DeliveriesHistory } from '../components/deliveries/DeliveriesHistory'
import { getAllOrders } from '../features/actions/General'
import { useDispatch } from 'react-redux'



export default function Deliveries() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [orders, setOrders] = useState([]) 
    const [empty, setEmpty] = useState(false);

    const [totalOrders, setTotalOrders] = useState(null)



     const dispatch = useDispatch();


     useEffect(() => {
          dispatch(getAllOrders(setOrders, setLoading, setError, setEmpty))
          setTotalOrders(orders.length + 1)
     }, [dispatch])

  return (
    <View className='flex flex-1 items-start justify-start pt-8'>
        <Text className={`text-[#1D2939] text-2xl font-['medium'] w-full text-start px-5`}>Deliveries</Text>

        <View className='flex items-center justify-start w-full px-5'>
             <View className='flex items-start justify-center w-full h-24 rounded-xl mt-6 bg-[#F2F4F7] px-4'>
                  <View className='flex flex-row items-center justify-start'>
                       <Bag />
                       <Text className={`text-[#667085] text-xs font-['medium'] ml-2`}>TOTAL ORDER RECIEVED</Text>
                  </View>
                  <Text className={`text-[#1D2939] text-[36px] font-['bold']`}>{totalOrders}</Text>
             </View>

             <View className='flex flex-row items-center justify-between w-full mt-3'>
                  <View className='flex items-start justify-center w-[48.5%] h-24 rounded-xl bg-[#EBF8FF] px-4'>
                      <View className='flex flex-row flex-wrap items-center justify-start'>
                           <Bag />
                           <Text className={`text-[#667085] text-[11px] font-['medium'] ml-2`}>ORDERS DELIVERED</Text>
                      </View>
                      <Text className={`text-[#1D2939] text-[36px] font-['bold']`}>25</Text>
                  </View>

                  <View className='flex items-start justify-center w-[48.5%] h-24 rounded-xl bg-[#EBF8FF] px-4'>
                      <View className='flex flex-row flex-wrap items-center justify-start'>
                           <Bag />
                           <Text className={`text-[#667085] text-[11px] font-['medium'] ml-2`}>ORDERS DECLINED</Text>
                      </View>
                      <Text className={`text-[#1D2939] text-[36px] font-['bold']`}>5</Text>
                  </View>
             </View>
        </View>

        <View className='w-full border-[0.5px] border-black opacity-10 mt-6 mb-2'></View>

        <DeliveriesHistory />

    </View>
  )
}
