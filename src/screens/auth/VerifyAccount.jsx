import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { verifyAccount } from "../../features/actions/Authentication";
import { useDispatch } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Layout from "../../../layouts/layout";

export default function VerifyAccount({ route }) {
  const emailAndPhone = route.params;
  const insets = useSafeAreaInsets();
  console.log("here", route);
  const navigation = useNavigation();
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Move focus to the next box if the current one has a value
    if (value && index < newOtp.length - 1) {
      inputs[index + 1].focus();
    }
  };
  const inputs = [];

  const initialCount = 30;
  const [count, setCount] = useState(initialCount);
  const [startCountdown, setStartCountdown] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResend = () => {
    setStartCountdown(true);
  };

  useEffect(() => {
    let interval;

    if (startCountdown && count > 0) {
      interval = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      // Cleanup the interval when count reaches 0
      return () => clearInterval(interval);
    }

    // Reset the count to 30 when startCountdown is set to false
    if (!startCountdown) {
      setCount(initialCount);
    }

    if (count === 0) {
      setStartCountdown(false);
    }
  }, [startCountdown, count]);

  const joinOtp = otp.join("");
  const values = { verification_token: parseInt(joinOtp) };

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(verifyAccount(values, setLoading, setError, navigation));
    console.log(values, "PIN");
  };

  return (
    // <SafeAreaView className="flex-1 items-center justify-start px-5 bg-white pt-8">
    <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
      <Layout>
        <Layout.Body>
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
            <Text className={`text-2xl text-[#475467] font-['bold']`}>
              Verify your account
            </Text>

            <View className="relative flex flex-row items-center justify-starrt w-full">
              <Text className={`text-sm text-[#475467] font-['medium'] mt-3`}>
                Enter the 4-digit code we sent to {emailAndPhone?.email} and '{" "}
                <Text className={`text-sm text-[#475467] font-['bold']`}>
                  {" "}
                  {emailAndPhone?.phone}
                </Text>
                '{" "}
                <Text
                  onPress={() => navigation.navigate("")}
                  className={`text-sm text-[#0077B6] font-['bold']`}
                >
                  {" "}
                  Change Phone number
                </Text>
              </Text>
            </View>
          </View>

          <KeyboardAvoidingView className="flex items-center justify-start w-full">
            <View className="items-center justify-start w-full mt-10">
              <View className="flex-row items-center justify-between w-[80%]">
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    className={`text-center rounded-[6px] border-[1px] h-[48px] w-[48px] border-[#C5C4C4]`}
                    maxLength={1}
                    keyboardType="numeric"
                    placeholder="-"
                    onChangeText={(value) => handleOtpChange(value, index)}
                    value={digit}
                    ref={(input) => {
                      inputs[index] = input;
                    }}
                  />
                ))}
              </View>
            </View>

            <View className="flex items-center justify-center w-full mt-12">
              <Text
                className={`text-sm text-red-500 font-['medium'] mb-4 w-full text-start`}
              >
                {error}
              </Text>
              <TouchableOpacity
                onPress={handleSubmit}
                className="flex items-center justify-center h-12 w-full rounded-lg bg-[#0077B6]"
              >
                {loading ? (
                  <ActivityIndicator size="large" color="#ffffff" />
                ) : (
                  <Text className={`text-base font-[bold] text-white`}>
                    Verify my account
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            <View className="flex items-center justify-start w-full mt-6">
              <Text className={`text-sm font-[medium] text-[#344054]`}>
                Haven't received the code yet?
              </Text>
              {count !== 30 ? (
                <TouchableOpacity>
                  <Text className={`text-sm font-[medium] text-[#0077B6]`}>
                    Resend code in 0:{count}
                  </Text>
                </TouchableOpacity>
              ) : (
                count === 30 && (
                  <TouchableOpacity onPress={handleResend}>
                    <Text className={`text-sm font-[medium] text-[#0077B6]`}>
                      Tap to resend OTP
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </KeyboardAvoidingView>
        </Layout.Body>
      </Layout>
    </SafeAreaView>
  );
}
