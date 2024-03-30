import { View, Text } from 'react-native'
import React from 'react'
import Logo from '../../../assets/images/logo1.svg'


export default function Slide3() {
  return (
    <View className="flex-1 items-center justify-end w-full">
            <Logo height={255} width={143} />
            <Text className={`text-center text-base font-['medium'] mt-6`}>
                 Real time {"\n"} tracking of package
            </Text>
            
    </View>
  )
}