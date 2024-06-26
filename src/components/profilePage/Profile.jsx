import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Camera from '../../../assets/icon/camera.svg'
import Gift from '../../../assets/icon/giftPackage.svg'
import User from '../../../assets/icon/user.svg'
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { UploadPicture } from '../../features/actions/General'
// import AsyncStorage from "@react-native-async-storage/async-storage";




export default function Profile({buttons, setPages}) {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // const [storedValue, setStoredValue] = useState(null);


  const navigation = useNavigation();

  const dispatch = useDispatch()


  const user = useSelector((state) => state.auth.user)


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });


    if (!result.canceled) {
      setImage(result.assets[0].uri);

    const formData = new FormData();
    formData.append('profile_picture', {
      uri: image,
      name: 'profile.jpg',
      type: 'image/jpeg',
    });
    dispatch(UploadPicture(formData, setError, setLoading))
    }

  };


  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const jsonValue = await AsyncStorage.getItem('loginDetails');
  //       if (jsonValue != null) {
  //         setStoredValue(JSON.parse(jsonValue));
  //       } else {
  //         setStoredValue('No value found');
  //       }
  //     } catch (e) {
  //       console.error('Failed to fetch the data from storage', e);
  //     }
  //   };

  //   getData();
  // }, []);

  // useEffect(()=>{
  //   console.log(storedValue);
  // },[])



  return (
    <View className="flex-1 items-start justify-start w-full bg-white px-5">
     <Text className={`text-2xl text-[#1D2939] font-['medium'] w-full text-start`}>Profile</Text>
    
    <ScrollView>
         <View className='flex flex-row items-center justify-start w-full mt-7'>
              <View className='relative'>
                 {image && user.profile_picture === null && 
                    <View className='flex items-center justify-center h-16 w-16 rounded-full bg-[#F9FAFB]'>
                        <User className='w-20 h-20' />
                    </View>
                  }
                  {user.profile_picture  !== null  && image === null &&
                    <Image className='w-16 h-16 rounded-full'  source={{ uri: user.profile_picture  }} />
                  }
                  {image  !== null  && 
                    <Image className='w-16 h-16 rounded-full'  source={{ uri: image  }} />
                  }
                  <TouchableOpacity onPress={pickImage}
                  className='absolute bottom-0 -right-1 flex items-center justify-center h-6 w-6 rounded-full bg-[#0077B6]'>
                      <Camera />
                  </TouchableOpacity>
              </View>

              <View className='flex items-start justify-start ml-5'>
                  <Text className={`text-lg text-[#1D2939] font-['bold']`}>{user.first_name} {user.last_name}</Text>
                  <Text className={`text-sm text-[#475467] font-['medium'] pt-1`}>{user.email}</Text>
              </View>
         </View>


        <View className='flex items-center justify-start w-full mt-11'>
            {buttons.map((item) => {
              return(
            <TouchableOpacity key={item.id} onPress={()=>setPages(item.id)}
            className='flex flex-row items-center justify-between w-full h-[45px] bg-[#F9FAFB] px-4 rounded-lg mb-5'>
                <View className='flex flex-row items-center justify-start'>
                     {item.icon}
                     <Text className={`text-base text-[#1D2939] font-['medium'] ml-3`}>{item.name}</Text>
                </View>
                <MaterialIcons name="arrow-forward-ios" size={15} color="#667085" />
            </TouchableOpacity>
            )
            })}
        </View>


        <TouchableOpacity onPress={()=>navigation.navigate('login')}
        className='flex flex-row items-center justify-center w-full h-[45px] bg-[#F2DCDD] px-4 rounded-lg mt-8'>
             <Text className={`text-lg text-[#EB5757] font-['bold'] mr-3`}>Log out</Text>
             <Ionicons name="log-out-outline" size={24} color="#EB5757" />
        </TouchableOpacity>



        </ScrollView>
    </View>
  )
}