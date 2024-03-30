import { View, Text, SafeAreaView, StatusBar, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Formik } from "formik";
import * as Yup from "yup";



const phoneSchema = Yup.object().shape({
  phone_number: Yup.string().required().matches(/^(80|81|90|70|91)\d{8}$/),
});

export default function ForgotPassword() {
    const [eye, setEye] = useState(false)

    const navigation = useNavigation();

    const handleSubmit = async (values) => {
      console.log(values)
      navigation.navigate('verifyOtp')
    }

  return (
    <SafeAreaView className="flex-1 items-center justify-start px-5"
    style={{paddingTop: StatusBar.currentHeight}}>

    <TouchableOpacity onPress={()=>navigation.goBack()}
    className="flex flex-row items-center justify-start w-full">
          <Feather name="arrow-left" size={18} color="#344054" />
          <Text className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}>Back</Text>
    </TouchableOpacity>
    
    <View className="items-start w-full mt-8">
         <Text className={`text-2xl text-[#101828] font-['bold']`}>Forgot Password</Text>
         <View className="flex flex-row items-center justify-start w-full">
             <Text className={`text-sm text-[#475467] font-['medium'] mt-3`}>
                  Please enter the phone number you registered and we'll send a SMS to with code to reset your password
             </Text>
         </View>
    </View>


    <Formik
          initialValues={{
            phone_number: "",
          }}
          validationSchema={phoneSchema}
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
    <KeyboardAvoidingView className="flex items-center justify-start w-full">

    <View className="relative items-start justify-start w-full mt-6">
          <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>Phone number</Text>
          <TextInput className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] 
          text-[#344054] pl-[87px] ${touched.phone_number && errors.phone_number && 'border-red-500'} ${touched.phone_number && !errors.phone_number && 'border-[#0077B6]'}`}
          placeholder='90722245789'
          placeholderTextColor={'#667085'}
          values={values.phone_number}
          onChangeText={handleChange("phone_number")}
          onBlur={() => setFieldTouched("phone_number")}
          keyboardType='number-pad'
          />
          {touched.phone_number && errors.phone_number && <Text className='text-red-500 text-[10px] pt-1'>invalid phone number format</Text>}
          <View className="absolute top-14 left-4 flex flex-row items-center justify-start">
              <Text className={`text-base text-[#101828] font-['regular'] mr-1`}>+234</Text>
              <SimpleLineIcons name="arrow-down" size={12} color="#667085" />
          </View>
    </View>

    <View className="flex items-center justify-center w-full mt-12">
          <TouchableOpacity onPress={handleSubmit} 
          disabled={!isValid}
          className={`flex items-center justify-center h-12 w-full rounded-lg bg-[#0077B6] ${!isValid && 'opacity-30'}`}>
              <Text className={`text-base font-[bold] text-white`}>Send Code</Text>
          </TouchableOpacity>
    </View>

    </KeyboardAvoidingView>
    )}
    </Formik>

    </SafeAreaView>
  )
}