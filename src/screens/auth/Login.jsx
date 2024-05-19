import { View, Text, SafeAreaView, StatusBar, TextInput, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Eye from '../../../assets/icon/eye.svg'
import EyeSlash from '../../../assets/icon/eye-slash.svg'
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from 'react-redux'
import { loginAction } from '../../features/actions/Authentication';




const LoginSchema = Yup.object().shape({
  phone: Yup.string().required().matches(/^(080|081|090|070|091)\d{8}$/),
  password: Yup.string()
    .min(8)
    .required()
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
});

export default function Login() {
    const [eye, setEye] = useState(false)
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const dispatch = useDispatch()

    const handleSubmit = async (values) => {
      dispatch(loginAction(values, setLoading, setError, navigation))
      // navigation.navigate('tab')
      // console.log(values)
    }

  return (
    <SafeAreaView className="flex-1 items-center justify-start px-5 pt-8">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="flex flex-row items-center justify-start w-full"
      >
        <Feather name="arrow-left" size={18} color="#344054" />
        <Text
          className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}
        >
          Back
        </Text>
      </TouchableOpacity>

      <View className="items-start w-full mt-8">
        <Text className={`text-2xl text-[#101828] font-['bold']`}>Login</Text>
        <View className="flex flex-row items-center justify-start w-full">
          <Text className={`text-sm text-[#475467] font-['medium'] mt-3`}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("register")}>
            <Text className={`text-sm text-[#0077B6] font-['bold'] mt-3`}>
              {" "}
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>


    <Formik
          initialValues={{
            phone: "",
            password: "",
          }}
          validationSchema={LoginSchema}
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

    <View className="relative items-start justify-start w-full mt-10">
          <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>Phone number</Text>
          <TextInput className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] text-[#344054] 
          pl-[87px] ${touched.phone && errors.phone && 'border-red-500'} ${touched.phone && !errors.phone && 'border-[#0077B6]'}`}
          placeholder='90 0000 0000'
          placeholderTextColor={'#667085'}
          values={values.phone}
          onChangeText={handleChange("phone")}
          onBlur={() => setFieldTouched("phone")}
          keyboardType='number-pad'
          />
          {touched.phone && errors.phone && <Text className='text-red-500 text-[10px] pt-1'>invalid phone number format</Text>}
          <View className="absolute top-14 left-4 flex flex-row items-center justify-start">
              <Text className={`text-base text-[#101828] font-['regular'] mr-1`}>+234</Text>
              <SimpleLineIcons name="arrow-down" size={12} color="#667085" />
          </View>
    </View>

            {/* PASSWORD */}
            <View className="relative items-start justify-start w-full mt-3">
              <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>
                Password
              </Text>
              <TextInput
                className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] text-[#344054] 
          pl-5 ${touched.password && errors.password && "border-red-500"} ${
                  touched.password && !errors.password && "border-[#0077B6]"
                }`}
                placeholder="********"
                placeholderTextColor={"#667085"}
                values={values.full_name}
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
                keyboardType="default"
                secureTextEntry={eye ? false : true}
              />
              <View className="absolute bottom-[13px] right-4 flex flex-row items-center justify-start">
                {eye ? (
                  <EyeSlash onPress={() => setEye(!eye)} />
                ) : (
                  <Eye onPress={() => setEye(!eye)} />
                )}
              </View>
            </View>

    <View className="flex items-center justify-center w-full mt-12">
          <Text className={`text-sm text-red-500 font-['medium'] mb-4 w-full text-start`}>{error}</Text>
          <TouchableOpacity onPress={handleSubmit} 
          disabled={!isValid}
          className={`flex items-center justify-center h-12 w-full rounded-lg bg-[#0077B6] ${!isValid && 'opacity-30'}`}>
              {loading
              ?<ActivityIndicator size="large" color="#ffffff" />
              :<Text className={`text-base font-[bold] text-white`}>Log in</Text>
              }
          </TouchableOpacity>
    </View>

            <Text
              onPress={() => navigation.navigate("forgotPassword")}
              className={`text-sm text-[#475467] font-['medium'] mt-7 underline`}
            >
              Forgot Password?
            </Text>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </SafeAreaView>
  );
}
