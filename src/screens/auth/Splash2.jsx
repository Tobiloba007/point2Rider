import { StatusBar, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import PagerView from 'react-native-pager-view';
import { useNavigation } from '@react-navigation/native';
import Slide1 from '../../components/splash/Slide1';
import Slide2 from '../../components/splash/Slide2';
import Slide3 from '../../components/splash/Slide3';

export default function Splash2() {
    const [page, setPage] = useState(0)

    const onPageSelected = (e) => {
        setPage(e.nativeEvent.position)
        // console.log(page);
      };

      const navigation = useNavigation();

  return (
    <View className="flex-1 items-center justify-end bg-white px-5 pb-10">
        <StatusBar backgroundColor="#EBF8FF" barStyle="dark-content" />

        <PagerView className="flex-1 items-center justify-center w-full" initialPage={page} onPageSelected={onPageSelected}>
             <View className="flex-1 items-center justify-center" key="1">
                <Slide1 />
             </View>
             <View className="flex-1 items-center justify-center" key="2">
                <Slide2 />
             </View>
             <View className="flex-1 items-center justify-center" key="3">
                <Slide3 />
             </View>
        </PagerView>


        <View className="flex flex-row items-center justify-center mt-5">
                 <View className={`w-2 h-2 rounded-full bg-[${page === 0 ? '#0077B6' : '#EBF8FF'}]`}></View>
                 <View className={`w-2 h-2 rounded-full bg-[${page === 1 ? '#0077B6' : '#EBF8FF'}] mx-2`}></View>
                 <View className={`w-2 h-2 rounded-full bg-[${page === 2 ? '#0077B6' : '#EBF8FF'}]`}></View>
        </View>

        <View className="items-center justify-start w-full mt-10">
              <TouchableOpacity onPress={()=>navigation.navigate('login')}
              className="flex items-center justify-center h-12 w-full rounded-lg bg-[#0077B6]">
                  <Text className={`text-base font-[bold] text-white`}>Log in</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>navigation.navigate('register')} 
              className="flex items-center justify-center h-12 w-full rounded-lg bg-[#EBF8FF] mt-7">
                  <Text className={`text-base font-[bold] text-[#0077B6]`}>Create an account</Text>
              </TouchableOpacity>
        </View>


        <View className="items-center justify-start w-full mt-9">
              <Text className={`text-xs text-[#98A2B3] font-['medium'] text-center w-[60%]`}>By continuing, you agree to Point2
              <Text className={`text-xs text-[#344054] font-['medium']`}> Terms & Condition</Text>
              <Text className={`text-xs text-[#98A2B3] font-['medium']`}> and</Text>
              <Text className={`text-xs text-[#344054] font-['medium']`}> Privacy Policy</Text>
              </Text>
        </View>


    </View>
  )
}
