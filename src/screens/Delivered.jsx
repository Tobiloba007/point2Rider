import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Success from '../../assets/icon/success.svg'



const Delivered = () => {
    const [code, setCode] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const navigation = useNavigation();

    const screenWidth = Dimensions.get('window').width;

    const handleSubmit = () => {
        setSubmitted(true)
    }

  return (
    <SafeAreaView className="flex items-start justify-start w-full h-full bg-white px-5 pt-8">
            {/*HEADER */}
        {
        !submitted &&
        <View className='relative flex flex-row items-center justify-center w-full bg-white pb-7 shadow-2xl'>
             <TouchableOpacity onPress={()=>navigation.goBack()}
             className="absolute left-0 flex flex-row items-center justify-start w-full">
                   <Feather name="arrow-left" size={18} color="#344054" />
                   <Text className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}>Back</Text>
             </TouchableOpacity>
        </View>
        }

        {
        !submitted
        ?<ScrollView contentContainerStyle={{width: '100%', alignItems: 'center', paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
        >
        <View className={`flex flex-col items-center justify-center w-full mt-28`}>
              <Success />
              <Text className={`text-2xl text-[#1D2939] font-['bold'] mt-6`}>Package Delivered</Text>

               <View className='flex flex-col items-center w-full'>
                  <Text className={`text-base text-center text-[#475467] font-['medium'] mt-6`}>
                       Enter the unique 4-digit code from {'\n'} the sender to verify recipient
                  </Text>

                  <View className='flex flex-row items-center justify-between w-full mt-20'>
                        <TextInput className={`flex-1 h-11 border-[1px] border-[#D0D5DD] rounded-lg pl-4 text-[#667085] text-base 
                                          font-['regular'] ${code && 'border-[#003B5B]'}`}
                         placeholder='enter code here'
                         value={code}
                         onChangeText={(text)=>setCode(text)}
                         keyboardType='number-pad'
                        />
                        <TouchableOpacity onPress={handleSubmit}
                         className={`flex flex-row items-center justify-center h-[44px] bg-[#003B5B] rounded-lg w-[100px] ml-2 ${!code && 'bg-[#4c6471] opacity-80'}`}
                         disabled={!code}
                         >
                             <Text className={`text-base text-[#FFFFFF] font-['bold']`}>Verify</Text>
                         </TouchableOpacity>
                  </View>
              </View>

              
        </View>
        </ScrollView>

       :<View className='flex flex-col items-center w-full mt-52'>
            <Success />
            <Text className={`text-2xl text-[#1D2939] font-['bold'] mt-6`}>Package Delivered</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('tab')}
            className='flex items-center justify-center w-full mt-24 rounded-lg h-11 bg-[#D9F2FF]'>
                  <Text className={`text-base text-[#0077B6] font-['bold']`}>Go Home</Text>
            </TouchableOpacity>
        </View>
        }

        
    </SafeAreaView>
  )
}

export default Delivered