import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';


export default function ReportIssue() {
    const [select, setSelect] = useState('')
    const [complaintBox, setComplaintBox] = useState(false)
    const [complain, setComplain] = useState('')

    const reasons = [
        {
            id: 1,
            title: "I haven't gotten my salary"
        },
        {
            id: 2,
            title: 'Successful but not reflected'
        },
        {
            id: 3,
            title: 'Long time pending'
        },
        {
            id: 4,
            title: 'Failed and has not been resent'
        },
        {
            id: 5,
            title: 'Other Reasons'
        },
    ]

    const navigation = useNavigation();

    const handleSelect = (item) => {
        setSelect(item)
        {
         item === 5 ? setComplaintBox(true) 
         : item !== 5 && setComplaintBox(false)
        }
    }

    const handleSubmit = () => {
        const values = {'options': select, 'comment': complain}
        console.log(values)
    }

  return (
    <View className='flex-1 items-start justify-start pt-8 px-5 bg-white'>
         <StatusBar backgroundColor="#F9FAFB" barStyle="dark-content" />
         <View className='relative flex flex-row items-center justify-center w-full mb-4'>
             <TouchableOpacity onPress={()=>navigation.goBack()}
             className="absolute left-0 flex flex-row items-center justify-start w-full">
                   <Feather name="arrow-left" size={18} color="#344054" />
                   <Text className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}>Back</Text>
             </TouchableOpacity>
             <Text className={`absolute text-lg text-[#101828] font-['bold'] pl-2 pb-[2px]`}>Report an Issue</Text>
         </View>

         <ScrollView contentContainerStyle={{paddingBottom: 50}}
         showsVerticalScrollIndicator={false}>
         <View className='flex items-center justify-start w-full mt-16'>
             {reasons.map((item) => {
                return (
             <TouchableOpacity key={item.id} onPress={()=>handleSelect(item.id)}
                className='flex items-center justify-start w-full mb-5'>
                 <View className='flex flex-row items-center justify-between w-full'>
                     <Text className={`text-base text-[#475467] font-['medium']`}>{item.title}</Text>
                     <View className={`flex items-center justify-center w-6 h-6 border-[2px] border-[#98A2B3] rounded-full ${select === item.id && 'bg-[#0077B6] border-[0px]'}`}>
                          <AntDesign name="check" size={15} color="white" />
                     </View>
                 </View>
                 <View className={`border-[0.5px] border-[#98A2B3] w-full mt-2 opacity-40 ${item.id === 5 && 'hidden'}`}></View>
             </TouchableOpacity>
             )
             })}
         </View>

         {complaintBox &&
         <View className='flex items-center justify-start w-full mt-9'>
             <Text className={`text-base text-[#475467] font-['regular'] w-full text-start`}>Other complaint? Type your complain here</Text>
             <TextInput className={`w-full h-40 border-[1px] border-[#D0D5DD] rounded-2xl bg-[#F9FAFB] mt-4 px-4 py-2 text-sm font-['regular']`}
                multiline={true}
                textAlignVertical="top"
                placeholder="Enter your reasons here..."
                value={complain}
                onChangeText={(text)=>setComplain(text)}
                />
         </View>}

        <TouchableOpacity onPress={handleSubmit}
        disabled={!select}
        className={`flex items-center justify-center h-12 w-full mt-9 rounded-lg bg-[#0077B6] ${!complaintBox && 'mt-36'} ${!select && 'opacity-30'}`}>
                <Text className={`text-base font-[bold] text-white`}>Send Report</Text>
        </TouchableOpacity>
        
        </ScrollView>

    </View>
  )
}