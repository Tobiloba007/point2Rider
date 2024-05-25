import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Box from '../../../assets/icon/box4.svg'
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { declineOrder } from '../../features/actions/General';



export default function ReasonModal({setReason, setDeleted, deleteId}) {

    const reasons = [
        {
            id: 1,
            title: 'Long Distance',
        },
        {
            id: 2,
            title: 'Heavy Package',
        },
        {
            id: 3,
            title: 'Unavailable',
        },
        {
            id: 4,
            title: 'Package not at Pickup Point',
        }
    ]

    const [check, setCheck] = useState(null)
    const [otherReasons, setOtherReasons] = useState(null)
    const [comment, setComment] = useState('')
    const [cancellationReason, setCancellationReason] = useState('')
    const [loading, setLoading] = useState(false);


    const handleCheck = (item) => {
        setCheck((prevIndex) => (prevIndex === item.id ? null : item.id))
        console.log(item.title)
        setCancellationReason(item.title)
    }

    const dispatch = useDispatch();

    const values = {'tracking_id': deleteId, 'reason': comment || cancellationReason}

    const handleDelete = () => {
        dispatch(declineOrder(values, setDeleted, setReason, setLoading));
        // setReason(false)
        // console.log(values)
        // setDeleted(true)
    }


  return (
    <View className='absolute bottom-0 flex items-center justify-start w-full pt-6 px-5 bg-white rounded-t-2xl pb-8'>
        <View className='relative flex flex-row items-center justify-center w-full bg-white pb-7 shadow-2xl'>
             <TouchableOpacity onPress={()=>setReason(false)}
             className="absolute left-0 flex flex-row items-center justify-start w-full">
                   <Feather name="arrow-left" size={18} color="#344054" />
                   <Text className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}>Back</Text>
             </TouchableOpacity>
        </View>

        {/* CHECKBOXES */}
        {
        !otherReasons
        ?<View className='w-full'>
        <Text className={`text-xl w-full text-[#1D2939] font-['bold'] pt-5`}>What went wrong?</Text>

        <View className='flex items-center justify-start w-full mt-11'>
           {reasons.map((item) => {
            return(
           <View key={item.id} className='flex items-center justify-start w-full mb-5'>
                <TouchableOpacity onPress={()=>handleCheck(item)}
                className='flex flex-row items-end justify-between w-full mb-2'>
                    <Text className={`text-base text-[#475467] font-['medium']`}>{item.title}</Text>
                    <TouchableOpacity onPress={()=>handleCheck(item)}
                    className={`flex items-center justify-center h-6 w-6 rounded-full border-[1.5px] 
                                                border-[#98A2B3] ${check === item.id && 'bg-[#0077B6] border-[#0077B6]'}`}>

                        {check && <Feather name="check" size={15} color="#ffffff" />}
                    </TouchableOpacity>
                </TouchableOpacity>
                {/* LINE */}
                <View className='border-[0.3px] border-[#98A2B3] w-full opacity-40'></View>
           </View>
           )
           })}

           {!check  &&
           <TouchableOpacity onPress={()=>setOtherReasons(true)}
           className='flex flex-row items-end justify-between w-full mb-2'>
                <Text className={`text-base text-[#475467] font-['medium']`}>Other Reasons</Text>
                <MaterialIcons name="arrow-forward-ios" size={12} color="#667085" />
            </TouchableOpacity>
           }

        </View>
        </View>

        :<View className='w-full'>
              <Text className={`text-xl w-full text-[#1D2939] font-['bold'] pt-5`}>Cancellation Reason</Text>
              <TextInput className={`w-full h-[158px] px-4 py-3 rounded-2xl text-[#667085] text-sm font-['regular'] 
                                     border-[1px] border-[#D0D5DD] mt-5`}
                value={comment}
                onChangeText={(text)=>setComment(text)}
                multiline={true}
                textAlignVertical="top"
                placeholder="Please describe the problem"
              />
        </View>
        }


        <TouchableOpacity onPress={handleDelete}
        className={`flex items-center justify-center w-full mt-32 h-11 rounded-lg bg-[#0077B6] ${check == null && comment === '' && 'opacity-40'} 
                    ${otherReasons && 'mt-24'}`}
        disabled={!check && comment === ''}
        >
         {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : (
            <Text className={`text-base text-[#FFFFFF] font-['bold']`}>Done</Text>
          )}
        </TouchableOpacity>

    </View>
  )
}