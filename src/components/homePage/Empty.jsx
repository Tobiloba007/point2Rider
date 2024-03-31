import { Text, TouchableOpacity, View } from 'react-native';
import Bike from '../../../assets/images/Character.svg'
import Base from '../../../assets/images/base.svg'
import { Feather } from '@expo/vector-icons';


export default function Empty() {
    return (
        <View className='flex items-center justify-start w-full mt-40'>
              <View className='flex justify-end'>
                   <Bike />
                   <Base />
              </View>
              <Text className={`text-[#344054] text-center text-base font-['medium'] mt-5`}>
                   No orders available for {'\n'} you at the moment
              </Text>     
              <TouchableOpacity className='flex flex-row items-center justify-center h-11 rounded-lg bg-[#F2F4F7] px-20 mt-9'>
                    <Feather name="refresh-ccw" size={18} color="#344054" />
                    <Text className={`text-[#344054] text-center text-base font-['bold'] ml-3`}>
                          Refresh
                    </Text>  
              </TouchableOpacity>         
       </View>
    )
}