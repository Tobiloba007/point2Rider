import { Dimensions, Image, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Rider from '../../../assets/images/rider.jpg'
import Verified from '../../../assets/icon/verified.svg'
import Phone from '../../../assets/icon/phone3.svg'
import Speaker from '../../../assets/icon/speaker.svg'
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';



export default function ChatScreen() {
    const [message, setMessage] = useState('')

    handleInputChange = (input) => {
        setMessage(input)
    }

    const navigation = useNavigation();

    const ScreenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView className="flex items-center justify-start w-full h-full bg-white pt-5">
      <StatusBar backgroundColor="#EBF8FF" barStyle="dark-content" />
            {/*BACK BUTTON */}
        <View className='relative flex flex-row items-center justify-center w-full bg-white pb-7 shadow-2xl'>
             <TouchableOpacity onPress={()=>navigation.goBack()}
             className="absolute left-5 flex flex-row items-center justify-start w-full">
                   <Feather name="arrow-left" size={18} color="#344054" />
                   <Text className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}>Back</Text>
             </TouchableOpacity>
        </View>

            {/* HEADER */}
        <View className='flex flex-row items-start justify-between w-full mt-6 px-5 pb-2'>
             <View className='flex flex-row items-center justify-start'>
                 <View className='relative'>
                    <Image className='w-[54px] h-[54px] rounded-full'
                     source={Rider} alt='Rider' />
                 </View>

                 <View className='flex items-start ml-5'>
                       <View className='flex flex-row items-center justify-start'>
                            <Text className={`text-base text-[#344054] font-['bold']`}>Owolabi Idris</Text>
                       </View>
                       <Text className={`text-sm text-[#344054] font-['medium'] mt-1`}>Customer</Text>
                 </View>
             </View>

             <TouchableOpacity className='flex items-center justify-center h-12 w-12 rounded-full bg-[#EBF8FF]'>
                  <Phone />
             </TouchableOpacity>
        </View>


        <ScrollView 
        contentContainerStyle={{width: ScreenWidth, paddingBottom: 110}}
        showsVerticalScrollIndicator={false}
        >
        <View className='flex items-center justify-start w-full mt-6 px-5'>
                 {/* INCOMING */}
              <View className='flex items-start justify-start w-full'>
                   <View className='flex items-end justify-center py-[10px] px-5 bg-[#F2F4F7] rounded-2xl my-1 max-w-[265px]'>
                       <Text className={`text-sm text-[#1D2939] font-['medium'] text-left`}>
                            Hey! How have you been?
                       </Text>
                   </View>
                   <View className='flex items-end justify-center py-[10px] px-5 bg-[#F2F4F7] rounded-2xl my-1 max-w-[265px]'>
                       <Text className={`text-sm text-[#1D2939] font-['medium'] text-left`}>
                            Wanna catch up for a beer?
                       </Text>
                   </View>
                   <Text className={`text-xs text-[#667085] font-['regular'] mt-2`}>12:15 PM</Text>
              </View>

                 {/* SENT */}
              <View className='flex items-end justify-start w-full'>
                   <View className='flex items-end justify-center py-[10px] px-5 bg-[#D9F2FF] rounded-2xl my-1 max-w-[265px]'>
                       <Text className={`text-sm text-[#1D2939] font-['medium'] text-right`}>
                                Awesome! Let's meet up
                       </Text>
                   </View>
                   <View className='flex items-end justify-center py-[10px] px-5 bg-[#D9F2FF] rounded-2xl my-1 max-w-[265px]'>
                       <Text className={`text-sm text-[#1D2939] font-['medium'] text-right`}>
                               Can I also get my cousin along?Will that be okay?
                       </Text>
                   </View>
                   <Text className={`text-xs text-[#667085] font-['regular'] mt-2`}>12:20 PM</Text>
              </View>


              {/* INCOMING */}
              <View className='flex items-start justify-start w-full'>
                   <View className='flex items-end justify-center py-[10px] px-5 bg-[#F2F4F7] rounded-2xl my-1 max-w-[265px]'>
                       <Text className={`text-sm text-[#1D2939] font-['medium'] text-left`}>
                             Yeah sure! get him too.
                       </Text>
                   </View>
                   <Text className={`text-xs text-[#667085] font-['regular'] mt-2`}>12:22 PM</Text>
              </View>


              {/* SENT */}
              <View className='flex items-end justify-start w-full'>
                   <View className='flex items-end justify-center py-[10px] px-5 bg-[#D9F2FF] rounded-2xl my-1 max-w-[265px]'>
                       <Text className={`text-sm text-[#1D2939] font-['medium'] text-right`}>
                            Alright! See you soon!
                       </Text>
                   </View>
                   <Text className={`text-xs text-[#667085] font-['regular'] mt-2`}>12:25 PM</Text>
              </View>


              {/* INCOMING */}
              <View className='flex items-start justify-start w-full'>
                   <View className='flex items-end justify-center py-[10px] px-5 bg-[#F2F4F7] rounded-2xl my-1 max-w-[265px]'>
                       <Text className={`text-sm text-[#1D2939] font-['medium'] text-left`}>
                             Aiit
                       </Text>
                   </View>
                   <Text className={`text-xs text-[#667085] font-['regular'] mt-2`}>12:26 PM</Text>
              </View>


              {/* SENT */}
              <View className='flex items-end justify-start w-full'>
                   <View className='flex items-end justify-center py-[10px] px-5 bg-[#D9F2FF] rounded-2xl my-1 max-w-[265px]'>
                       <Text className={`text-sm text-[#1D2939] font-['medium'] text-right`}>
                            okay sure!
                       </Text>
                   </View>
                   <Text className={`text-xs text-[#667085] font-['regular'] mt-2`}>12:26 PM</Text>
              </View>



              {/* INCOMING */}
              <View className='flex items-start justify-start w-full'>
                   <View className='flex items-end justify-center py-[10px] px-5 bg-[#F2F4F7] rounded-2xl my-1 max-w-[265px]'>
                       <Text className={`text-sm text-[#1D2939] font-['medium'] text-left`}>
                             Aiit
                       </Text>
                   </View>
                   <Text className={`text-xs text-[#667085] font-['regular'] mt-2`}>12:26 PM</Text>
              </View>


              {/* SENT */}
              <View className='flex items-end justify-start w-full'>
                   <View className='flex items-end justify-center py-[10px] px-5 bg-[#D9F2FF] rounded-2xl my-1 max-w-[265px]'>
                       <Text className={`text-sm text-[#1D2939] font-['medium'] text-right`}>
                            okay sure!
                       </Text>
                   </View>
                   <Text className={`text-xs text-[#667085] font-['regular'] mt-2`}>12:26 PM</Text>
              </View>

        </View>
        </ScrollView>



        {/* BOTTOM */}
        <View className='absolute bottom-0 flex items-center pt-3 bg-white shadow-2xl shadow-slate-950 w-full px-5 pb-6'>
            <View className='relative w-full'>
                <TextInput 
                  className={`border-[1px] border-[#D0D5DD] rounded-[164px] h-[64px] w-full text-[#1D2939] text-sm font-['regular'] pl-16`}
                  placeholder='Type Message'
                  placeholderTextColor="#1D2939"
                  onChangeText={handleInputChange}
                  value={message}
                  keyboardType='default'
                />
                <TouchableOpacity className='absolute top-[24%] left-4 flex items-center justify-center bg-[#0077B6] h-[33px] w-[33px] rounded-full'>
                     <FontAwesome6 name="add" size={18} color="#EBF8FF" />
                </TouchableOpacity>
                <View className='absolute top-[24%] right-4 flex flex-row items-center justify-end'>
                     <View className='border-[#D0D5DD] h-[33px] border-[1px]'></View>
                     {message
                     ?<TouchableOpacity className='flex items-center justify-center bg-[#0077B6] h-[33px] w-[33px] rounded-full ml-4'>
                         <FontAwesome name="send" size={15} color="#EBF8FF" />
                     </TouchableOpacity>
                     :<TouchableOpacity className='flex items-center justify-center bg-[#0077B6] h-[33px] w-[33px] rounded-full ml-4'>
                          <Speaker />
                     </TouchableOpacity>
                     }
                </View>
                
            </View>
        </View>

    </SafeAreaView>
  )
}
