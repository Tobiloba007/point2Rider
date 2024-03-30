import { View, Text, SafeAreaView, StatusBar, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Eye from '../../../assets/icon/eye.svg'
import EyeSlash from '../../../assets/icon/eye-slash.svg'
import { FontAwesome6 } from '@expo/vector-icons';
import { Formik } from "formik";
import * as Yup from "yup";


const newPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8)
    .required()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
    password_confirmation: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export default function CreateNewPassword() {
  const [eye, setEye] = useState(false)
    const navigation = useNavigation();

    const screenWidth = Dimensions.get('window').width;

    const handleSubmit = async (values) => {
      navigation.navigate('resetSuccess')
      // console.log(values)
    }

  return (
    <SafeAreaView className="flex-1 items-center justify-start bg-white"
    style={{paddingTop: StatusBar.currentHeight}}>

        <TouchableOpacity onPress={()=>navigation.goBack()}
        className="flex flex-row items-center justify-start w-full px-5 pb-3">
              <Feather name="arrow-left" size={18} color="#344054" />
              <Text className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}>Back</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={{width: screenWidth, alignItems: 'center', paddingHorizontal: 20, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
        >
        <View className="items-start w-full mt-5">
             <Text className={`text-2xl text-[#101828] font-['bold']`}>Create New Password</Text>
             <Text className={`text-sm text-[#475467] font-['medium'] mt-3`}>Please enter new password to continue</Text>
        </View>


        <Formik
          initialValues={{
            password: "",
            password_confirmation: "",
          }}
          validationSchema={newPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            setFieldTouched,
            isValid,
            handleSubmit,
          }) => (
        <KeyboardAvoidingView className="flex items-center justify-start w-full mt-4">

              {/* PASSWORD */}
            <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>New Password</Text>
                  <TextInput className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular']
                   text-[#344054] pl-5 ${touched.password && errors.password && 'border-red-500'} 
                   ${touched.password && !errors.password && 'border-[#0077B6]'}`}
                  placeholder='********'
                  placeholderTextColor={'#667085'}
                  values={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={() => setFieldTouched("password")}
                  keyboardType='default'
                  secureTextEntry={eye ? false : true}
                  />
                  <View  className="absolute bottom-[13px] right-4 flex flex-row items-center justify-start">
                      {eye ? <EyeSlash onPress={()=>setEye(!eye)} /> : <Eye onPress={()=>setEye(!eye)} />}
                  </View>
            </View>

              {/* CONFIRM PASSWORD */}
            <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>Confirm Password</Text>
                  <TextInput className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular']
                   text-[#344054] pl-5 ${touched.password_confirmation && errors.password_confirmation && 'border-red-500'} 
                   ${touched.password_confirmation && !errors.password_confirmation && 'border-[#0077B6]'}`}
                  placeholder='********'
                  placeholderTextColor={'#667085'}
                  values={values.password_confirmation}
                  onChangeText={handleChange("password_confirmation")}
                  onBlur={() => setFieldTouched("password_confirmation")}
                  keyboardType='default'
                  secureTextEntry={eye ? false : true}
                  />
                  {touched.password_confirmation && errors.password_confirmation && 
                    <Text className='text-red-500 text-[10px] pt-1'>passwords do not match</Text>}
                  <View  className="absolute top-14 right-4 flex flex-row items-center justify-start">
                      {eye ? <EyeSlash onPress={()=>setEye(!eye)} /> : <Eye onPress={()=>setEye(!eye)} />}
                  </View>
            </View>


            <View className='flex flex-col items-start w-full mt-6'>
               <View className='flex flex-row items-center justify-start w-full'>
                  <FontAwesome6 name="check-circle" size={15} color={touched.password && errors.password ? '#FF0000' :  touched.password && !errors.password && '#27AE60'} />
                  <Text className={`text-xs text-[#27AE60] font-['bold'] ml-2 ${touched.password && errors.password && 'text-red-500'} 
                  ${touched.password && !errors.password && 'text-[#27AE60]'}`}>
                      Atleast 8 Characters
                  </Text>
               </View>
               <View className='flex flex-row items-center justify-start w-full mt-3'>
                  <FontAwesome6 name="check-circle" size={15} color={touched.password && errors.password ? '#FF0000' :  touched.password && !errors.password && '#27AE60'} />
                  <Text className={`text-xs text-[#27AE60] font-['bold'] ml-2 ${touched.password && errors.password && 'text-red-500'} 
                  ${touched.password && !errors.password && 'text-[#27AE60]'}`}>
                      Atleast 1 Number
                  </Text>
               </View>
               <View className='flex flex-row items-center justify-start w-full mt-3'>
                  <FontAwesome6 name="check-circle" size={15} color={touched.password && errors.password ? '#FF0000' :  touched.password && !errors.password && '#27AE60'} />
                  <Text className={`text-xs text-[#27AE60] font-['bold'] ml-2 ${touched.password && errors.password && 'text-red-500'} 
                  ${touched.password && !errors.password && 'text-[#27AE60]'}`}>
                      Both Uppercase and Lowercase letter
                  </Text>
               </View>
            </View>

              {/* BUTTON */}
            <View className="flex items-center justify-center w-full mt-20">
                  <TouchableOpacity onPress={handleSubmit}
                  disabled={!isValid} 
                  className={`flex items-center justify-center h-12 w-full rounded-lg bg-[#0077B6] ${!isValid && 'opacity-30'}`}>
                      <Text className={`text-base font-[bold] text-white`}>Reset Password</Text>
                  </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
        )}
        </Formik>

        </ScrollView>


    </SafeAreaView>
  )
}