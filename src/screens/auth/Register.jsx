import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Pressable,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Eye from "../../../assets/icon/eye.svg";
import Calendar from "../../../assets/icon/calendar.svg";
import EyeSlash from "../../../assets/icon/eye-slash.svg";
import { Formik } from "formik";
import * as Yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import Layout from "../../../layouts/layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CountryPicker } from "react-native-country-codes-picker";
import ModalComp from "../../components/Modal/ModalComp";

const SignupSchema = Yup.object().shape({
  first_name: Yup.string().min(2).max(50).required(),
  last_name: Yup.string().min(2).max(50).required(),
  phone: Yup.string()
    .required()
    .matches(/^(080|081|090|070|091)\d{8}$/),
  email: Yup.string().email("Invalid email").required(),
  address: Yup.string().min(3).max(50).required(),
  next_of_kin_full_name: Yup.string().min(3).max(50).required(),
  next_of_kin_phone_no: Yup.string()
    .required()
    .matches(/^(080|081|090|070|091)\d{8}$/),
  password: Yup.string()
    .min(8)
    .required()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
  password_confirmation: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default function Register() {
  const [eye, setEye] = useState(false);
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const insets = useSafeAreaInsets();
  const [phoneCountryCode, setPhoneCountryCode] = useState("" || "+234"); // for phone number
  const [show, setShow] = useState(false); // for phone code
  const [nextOfKinCountryCode, setNextOfKinCountryCode] = useState(
    "" || "+234"
  ); // for next of kin phone number
  const [countryCodeType, setCountryCodeType] = useState("");

  const isIos = Platform.OS === "ios";

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const navigation = useNavigation();

  const screenWidth = Dimensions.get("window").width;

  const dob = { dob: date === null ? "" : date.toLocaleDateString() };

  const handleSubmit = async (values) => {
    navigation.navigate("register2", { values });
    const combinedData = { ...values, ...dob };
    console.log("hello", combinedData);
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
      <Layout>
        <Layout.ScrollView>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="flex flex-row items-center justify-start w-full pb-3"
          >
            <Feather name="arrow-left" size={18} color="#344054" />
            <Text
              className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}
            >
              Back
            </Text>
          </TouchableOpacity>

          <View className="items-start w-full mt-5">
            <Text className={`text-2xl text-[#101828] font-['bold']`}>
              Create your account
            </Text>
            <View className="flex flex-row items-center justify-start w-full">
              <Text className={`text-sm text-[#475467] font-['medium'] mt-3`}>
                Have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("login")}>
                <Text className={`text-sm text-[#0077B6] font-['bold'] mt-3`}>
                  {" "}
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex flex-row items-center justify-start w-full mt-7">
            <View className="rounded-full border-l-[2px] border-[#0077B6]">
              <View className="flex items-center justify-center border-[0.4px] rounded-full border-[#0077B6] h-14 w-14 bg-[#EBF8FF]">
                <Text className={`text-base text-[#1D2939] font-['medium']`}>
                  1/2
                </Text>
              </View>
            </View>

            <View className="items-start ml-5">
              <Text className={`text-base text-[#1D2939] font-['bold']`}>
                Personal Details
              </Text>
              <Text className={`text-sm text-[#344054] font-['regular']`}>
                Please enter the correct information
              </Text>
            </View>
          </View>

          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              phone: "",
              email: "",
              address: "",
              next_of_kin_full_name: "",
              next_of_kin_phone_no: "",
              password: "",
              password_confirmation: "",
            }}
            validationSchema={SignupSchema}
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
              <KeyboardAvoidingView className="flex items-center justify-start w-full mt4">
                {/* FIRST NAME */}
                <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>
                    First Name
                  </Text>
                  <TextInput
                    className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] 
                  text-[#344054] pl-5 ${
                    touched.first_name && errors.first_name && "border-red-500"
                  } 
                  ${
                    touched.first_name &&
                    !errors.first_name &&
                    "border-[#0077B6]"
                  }`}
                    placeholder="First Name"
                    placeholderTextColor={"#667085"}
                    values={values.first_name}
                    onChangeText={handleChange("first_name")}
                    onBlur={() => setFieldTouched("first_name")}
                    keyboardType="default"
                  />
                  {touched.first_name && errors.first_name && (
                    <Text className="text-red-500 text-[10px] pt-1">
                      minimum of 2 letters
                    </Text>
                  )}
                </View>

                {/* LAST NAME */}
                <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>
                    Last Name
                  </Text>
                  <TextInput
                    className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] 
                  text-[#344054] pl-5 ${
                    touched.last_name && errors.last_name && "border-red-500"
                  } 
                  ${
                    touched.last_name && !errors.last_name && "border-[#0077B6]"
                  }`}
                    placeholder="Last Name"
                    placeholderTextColor={"#667085"}
                    values={values.last_name}
                    onChangeText={handleChange("last_name")}
                    onBlur={() => setFieldTouched("last_name")}
                    keyboardType="default"
                  />
                  {touched.last_name && errors.last_name && (
                    <Text className="text-red-500 text-[10px] pt-1">
                      minimum of 2 letters
                    </Text>
                  )}
                </View>

                {/* EMAIL */}
                <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>
                    Email Address
                  </Text>
                  <TextInput
                    className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] 
                  text-[#344054] pl-14 ${
                    touched.email && errors.email && "border-red-500"
                  } 
                  ${touched.email && !errors.email && "border-[#0077B6]"}`}
                    placeholder="example@mail.com"
                    placeholderTextColor={"#667085"}
                    values={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={() => setFieldTouched("email")}
                    keyboardType="email-address"
                  />
                  {touched.email && errors.email && (
                    <Text className="text-red-500 text-[10px] pt-1">
                      invalid email format
                    </Text>
                  )}
                  <View className="absolute top-[58px] left-4 flex flex-row items-center justify-start">
                    <Feather name="mail" size={22} color="#667085" />
                  </View>
                </View>

                {/* PHONE */}
                <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>
                    Phone number
                  </Text>
                  <TextInput
                    className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular']
                   text-[#344054] pl-[87px] ${
                     touched.phone && errors.phone && "border-red-500"
                   } 
                   ${touched.phone && !errors.phone && "border-[#0077B6]"}`}
                    placeholder="90 0000 0000"
                    placeholderTextColor={"#667085"}
                    values={values.phone}
                    onChangeText={handleChange("phone")}
                    onBlur={() => setFieldTouched("phone")}
                    keyboardType="number-pad"
                  />
                  {touched.phone && errors.phone && (
                    <Text className="text-red-500 text-[10px] pt-1">
                      invalid phone number format
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      setCountryCodeType("regular");
                      setShow(true);
                    }}
                    className="absolute top-[57px] left-4 flex flex-row items-center justify-start"
                  >
                    <Text
                      // style={{
                      //   color: "white",
                      //   fontSize: 20,
                      // }}
                      className={`text-base text-[#101828] font-['regular'] mr-1`}
                    >
                      {phoneCountryCode}
                    </Text>
                    <SimpleLineIcons
                      name="arrow-down"
                      size={12}
                      color="#667085"
                    />
                  </TouchableOpacity>
                </View>

                {/* HOUSE ADDRESS */}
                <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>
                    House Address
                  </Text>
                  <TextInput
                    className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] 
                  text-[#344054] pl-5 ${
                    touched.address && errors.address && "border-red-500"
                  } 
                  ${touched.address && !errors.address && "border-[#0077B6]"}`}
                    placeholder="House Address"
                    placeholderTextColor={"#667085"}
                    values={values.address}
                    onChangeText={handleChange("address")}
                    onBlur={() => setFieldTouched("address")}
                    keyboardType="default"
                  />
                  {touched.address && errors.address && (
                    <Text className="text-red-500 text-[10px] pt-1">
                      minimum of 2 letters
                    </Text>
                  )}
                </View>

                {/* DATE OF BIRTH */}
                <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>
                    Date of Birth *
                  </Text>
                  <Pressable
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={showDatepicker}
                    className={`mt-3 border-[1px] rounded-lg h-12 w-full text-base font-['regular'] 
                 pl-5 ${
                   date === null ? "border-[#D0D5DD]" : "border-[#0077B6]"
                 }`}
                  >
                    <Text
                      style={{ color: date ? "#344054" : "#667085", flex: 1 }}
                    >
                      {date
                        ? date.toLocaleDateString()
                        : "Select date of birth"}
                    </Text>
                    <View className="mr-4">
                      <Calendar />
                    </View>
                  </Pressable>
                  {touched.last_name && errors.last_name && (
                    <Text className="text-red-500 text-[10px] pt-1">
                      minimum of 2 letters
                    </Text>
                  )}
                </View>

                {/* PASSWORD */}
                <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>
                    Password
                  </Text>
                  <TextInput
                    className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular']
                   text-[#344054] pl-5 ${
                     touched.password && errors.password && "border-red-500"
                   } 
                   ${
                     touched.password && !errors.password && "border-[#0077B6]"
                   }`}
                    placeholder="********"
                    placeholderTextColor={"#667085"}
                    values={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={() => setFieldTouched("password")}
                    keyboardType="default"
                    secureTextEntry={eye ? false : true}
                  />
                  {touched.password && errors.password && (
                    <Text className="text-red-500 text-[10px] pt-1">
                      password must contain one of (A-Z), (a-z) and (0-9) with
                      minimum characters of 8
                    </Text>
                  )}

                  <View className="absolute top-14 right-4 flex flex-row items-center justify-start">
                    {eye ? (
                      <EyeSlash onPress={() => setEye(!eye)} />
                    ) : (
                      <Eye onPress={() => setEye(!eye)} />
                    )}
                  </View>
                </View>

                {/* CONFIRM PASSWORD */}
                <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>
                    Confirm Password
                  </Text>
                  <TextInput
                    className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] 
                  text-[#344054] pl-5 ${
                    touched.password_confirmation &&
                    errors.password_confirmation &&
                    "border-red-500"
                  } 
                  ${
                    touched.password_confirmation &&
                    !errors.password_confirmation &&
                    "border-[#0077B6]"
                  }`}
                    placeholder="********"
                    placeholderTextColor={"#667085"}
                    values={values.password_confirmation}
                    onChangeText={handleChange("password_confirmation")}
                    onBlur={() => setFieldTouched("password_confirmation")}
                    keyboardType="default"
                    secureTextEntry={eye ? false : true}
                  />
                  {touched.password_confirmation &&
                    errors.password_confirmation && (
                      <Text className="text-red-500 text-[10px] pt-1">
                        passwords do not match
                      </Text>
                    )}

                  <View className="absolute top-14 right-4 flex flex-row items-center justify-start">
                    {eye ? (
                      <EyeSlash onPress={() => setEye(!eye)} />
                    ) : (
                      <Eye onPress={() => setEye(!eye)} />
                    )}
                  </View>
                </View>

                {/* NEXT OF KIN */}
                <Text
                  className={`w-full text-xs text-[#667085] font-['medium'] mt-10`}
                >
                  NEXT OF KIN
                </Text>

                {/* NEXT OF KIN FULL NAME */}
                <View className="relative items-start justify-start w-full mt-2">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>
                    Full Name
                  </Text>
                  <TextInput
                    className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] 
                  text-[#344054] pl-5 ${
                    touched.next_of_kin_full_name &&
                    errors.next_of_kin_full_name &&
                    "border-red-500"
                  } 
                  ${
                    touched.next_of_kin_full_name &&
                    !errors.next_of_kin_full_name &&
                    "border-[#0077B6]"
                  }`}
                    placeholder="Full Name"
                    placeholderTextColor={"#667085"}
                    values={values.next_of_kin_full_name}
                    onChangeText={handleChange("next_of_kin_full_name")}
                    onBlur={() => setFieldTouched("next_of_kin_full_name")}
                    keyboardType="default"
                  />
                  {touched.next_of_kin_full_name &&
                    errors.next_of_kin_full_name && (
                      <Text className="text-red-500 text-[10px] pt-1">
                        minimum of 2 letters
                      </Text>
                    )}
                </View>

                {/* NEXT OF KIN PHONE NUMBER */}
                <View className="relative items-start justify-start w-full mt-3">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>
                    Phone number
                  </Text>
                  <TextInput
                    className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular']
                   text-[#344054] pl-[87px] ${
                     touched.next_of_kin_phone_no &&
                     errors.next_of_kin_phone_no &&
                     "border-red-500"
                   } 
                   ${
                     touched.next_of_kin_phone_no &&
                     !errors.next_of_kin_phone_no &&
                     "border-[#0077B6]"
                   }`}
                    placeholder="90 0000 0000"
                    placeholderTextColor={"#667085"}
                    values={values.next_of_kin_phone_no}
                    onChangeText={handleChange("next_of_kin_phone_no")}
                    onBlur={() => setFieldTouched("next_of_kin_phone_no")}
                    keyboardType="number-pad"
                  />
                  {touched.next_of_kin_phone_no &&
                    errors.next_of_kin_phone_no && (
                      <Text className="text-red-500 text-[10px] pt-1">
                        invalid phone number format
                      </Text>
                    )}
                  <TouchableOpacity
                    onPress={() => {
                      setCountryCodeType("next-of-kin");
                      setShow(true);
                    }}
                    className="absolute top-[57px] left-4 flex flex-row items-center justify-start"
                  >
                    <Text
                      // style={{
                      //   color: "white",
                      //   fontSize: 20,
                      // }}
                      className={`text-base text-[#101828] font-['regular'] mr-1`}
                    >
                      {nextOfKinCountryCode}
                    </Text>
                    <SimpleLineIcons
                      name="arrow-down"
                      size={12}
                      color="#667085"
                    />
                  </TouchableOpacity>
                </View>

                {/* BUTTON */}
                <View className="flex items-center justify-center w-full mt-16">
                  <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={!isValid || date === null}
                    className={`flex items-center justify-center h-12 w-full rounded-lg bg-[#0077B6] ${
                      !isValid && "opacity-30"
                    } ${date === null && "opacity-30"}`}
                  >
                    <Text className={`text-base font-[bold] text-white`}>
                      Create your account
                    </Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            )}
          </Formik>
        </Layout.ScrollView>
      </Layout>
      {/* conuntry code */}
      <CountryPicker
        onBackdropPress={() => setShow(false)}
        style={{
          modal: {
            height: 500,
          },
        }}
        show={show}
        pickerButtonOnPress={(item) => {
          countryCodeType === "regular"
            ? setPhoneCountryCode(item.dial_code)
            : setNextOfKinCountryCode(item.dial_code);
          setShow(false);
        }}
      />

      {/* date picker */}
      {showDatePicker && (
        <>
          {isIos ? (
            <ModalComp
              visible={showDatePicker}
              onClose={() => setShowDatePicker(!showDatePicker)}
            >
              <View style={{ marginTop: 25 }}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date || new Date()}
                  mode="date"
                  display="inline"
                  // is24Hour={true}
                  onChange={handleDateChange}
                />
              </View>
            </ModalComp>
          ) : (
            <DateTimePicker
              testID="dateTimePicker"
              value={date || new Date()}
              mode="date"
              is24Hour={true}
              onChange={handleDateChange}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}
