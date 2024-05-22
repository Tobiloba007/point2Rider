import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Pressable,
  Platform,
  Image,
  ActivityIndicator,
  TouchableHighlight,
  FlatList,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import {
  getBanks,
  registerAccount,
} from "../../features/actions/Authentication";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Layout from "../../../layouts/layout";
import CustomRadioButton from "../../components/RadioButton/RadioButton";
import BottomSheet from "../../components/Bottomsheet/Bottomsheet";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

export default function Register2({ route }) {
  // const { values } = route.params;
  const values = { email: "example@gmail.com" };
  const insets = useSafeAreaInsets();

  const [idPhoto, setIdPhoto] = useState(null);
  const [passport, setPassport] = useState(null);
  const [bikePhoto, setBikePhoto] = useState(null);
  const [bikeLicense, setBikeLicense] = useState(null);
  const [roadPapers, setRoadPapers] = useState(null);
  const [ridersCard, setRidersCard] = useState(null);
  const [account, setAccount] = useState("");
  const [accountError, setAccountError] = useState("");
  const [bvn, setBvn] = useState("");
  const [bvnError, setBvnError] = useState("");
  const [nin, setNin] = useState("");
  const [ninError, setNinError] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedBank, setSelectedBank] = useState("Select Bank");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [bank, setBanks] = useState([]);
  const [loadBank, setLoadBanks] = useState(false);
  const [bikeNumber, setBikeNumber] = useState("");
  const [bikeNumError, setBikeNumError] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const [radioBtnChecked, setRadioBtnChecked] = useState(null);

  const closeBottomSheet = () => {
    setOpenBottomSheet(false);
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };

  const banks = [
    {
      key: "Access Bank",
      value: "Access Bank",
    },
    {
      key: "Fidelity Bank",
      value: "Fidelity Bank",
    },
    {
      key: "United Bank For Africa",
      value: "United Bank For Africa",
    },
    {
      key: "Guaranty Trust Bank",
      value: "Guaranty Trust Bank",
    },
    {
      key: "Eco Bank",
      value: "Eco Bank",
    },
    {
      key: "Diamond Bank",
      value: "Diamond Bank",
    },
    {
      key: "Sterling Bank",
      value: "Sterling Bank",
    },
    {
      key: "Union Bank",
      value: "Union Bank",
    },
    {
      key: "Union Bank",
      value: "Union Bank",
    },
    {
      key: "Wema Bank",
      value: "Wema Bank",
    },
    {
      key: "Zenith Bank",
      value: "Zenith Bank",
    },
  ];

  const setBottomSheetFn = (item, index) => {
    if (radioBtnChecked !== index) {
      setRadioBtnChecked(index);
      setSelectedBank(item);
    } else {
      setRadioBtnChecked(null);
      setSelectedBank(item);
    }
  };

  const dispatch = useDispatch();

  //     useEffect(()=>{
  //       dispatch(getBanks(setBanks, setLoadBanks, setMessage))
  //     },[dispatch])

  //    PICK PHOTO ID
  const pickPhotoId = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setIdPhoto(result.assets[0].uri);
    }
  };

  //    PASSPORT PHOTOGRAPGH
  const pickPassportId = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setPassport(result.assets[0].uri);
    }
  };

  //    PICK BIKE PHOTO
  const pickBikePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setBikePhoto(result.assets[0].uri);
    }
  };

  //    PICK BIKE LICENSE
  const pickBikeLicense = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setBikeLicense(result.assets[0].uri);
    }
  };

  //    PICK BIKE LICENSE
  const pickRoadPapers = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setRoadPapers(result.assets[0].uri);
    }
  };

  //    RIDERS CARD
  const pickRidersCard = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setRidersCard(result.assets[0].uri);
    }
  };

  const navigation = useNavigation();

  const screenWidth = Dimensions.get("window").width;

  const valid =
    idPhoto === null ||
    passport === null ||
    bikePhoto === null ||
    bikeLicense === null ||
    roadPapers === null ||
    bikeNumber === "" ||
    ridersCard === null ||
    account === "" ||
    selectedBank === "Select Bank" ||
    name === "" ||
    bvn === "" ||
    nin === "";

  const values2 = {
    id_card: idPhoto,
    passport: passport,
    bike_photo: bikePhoto,
    bike_license: bikeLicense,
    road_worthiness: roadPapers,
    riders_card: ridersCard,
    account_no: account,
    bank: selectedBank,
    bank_code: "044",
    bvn: bvn,
    nin: nin,
    bike_number: bikeNumber,
  };

  const combinedValues = { ...values, ...values2 };

  const handleSubmit = () => {
    navigation.navigate("verifyAccount");
    const formData = new FormData();
    Object.keys(combinedValues).forEach((key) => {
      formData.append(key, combinedValues[key]);
    });
    dispatch(registerAccount(formData, setError, setLoading, navigation));
    // console.log(combinedValues, 'two')
    // console.log(values2)
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
            <View className="rounded-full border-[2px] border-[#0077B6]">
              <View className="flex items-center justify-center border-[0.4px] rounded-full border-[#0077B6] h-14 w-14 bg-[#EBF8FF]">
                <Text className={`text-base text-[#1D2939] font-['medium']`}>
                  1/2
                </Text>
              </View>
            </View>

            <View className="items-start ml-5">
              <Text className={`text-base text-[#1D2939] font-['bold']`}>
                Additional Details
              </Text>
              <Text className={`text-sm text-[#344054] font-['regular']`}>
                Please enter the correct information
              </Text>
            </View>
          </View>

          <KeyboardAvoidingView className="flex items-center justify-start w-full mt-4">
            {/* VALID ID PHOTO */}
            <Text
              className={`w-full text-xs text-[#667085] font-['medium'] mt-5`}
            >
              IDENTIFICATION
            </Text>
            <View className="relative items-start justify-start w-full mt-1">
              <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>
                Valid ID
              </Text>
              <TouchableOpacity
                onPress={pickPhotoId}
                className={`flex items-center justify-center mt-3 px-8 border-[1px]
                         border-[#D0D5DD] rounded-lg h-[154px] w-full text-base font-['regular'] ${
                           idPhoto && "border-[#0077B6]"
                         }`}
              >
                {idPhoto ? (
                  <View className="flex flex-col items-center w-full px-8">
                    <MaterialIcons name="verified" size={32} color="#27AE60" />
                    <Text
                      className={`text-center text-[#667085] text-sm font-['regular'] mt-2`}
                    >
                      ID photo successfully uploaded
                    </Text>
                  </View>
                ) : (
                  <Text
                    className={`text-center text-[#667085] text-sm font-['regular'] pt-1`}
                  >
                    Upload (NIN, Drivers License, Voters Card) (png/jpeg/pdf
                    formats)
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {/* VALID PASSPORT PHOTOGRAPH */}
            <View className="relative items-start justify-start w-full mt-1">
              <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>
                Passport Photograph
              </Text>
              <TouchableOpacity
                onPress={pickPassportId}
                className={`flex items-center justify-center mt-3 px-8 border-[1px]
                         border-[#D0D5DD] rounded-lg h-[154px] w-full text-base font-['regular'] ${
                           passport && "border-[#0077B6]"
                         }`}
              >
                {passport ? (
                  <View className="flex flex-col items-center w-full px-8">
                    <MaterialIcons name="verified" size={32} color="#27AE60" />
                    <Text
                      className={`text-center text-[#667085] text-sm font-['regular'] mt-2`}
                    >
                      passport hotograph successfully uploaded
                    </Text>
                  </View>
                ) : (
                  <Text
                    className={`text-center text-[#667085] text-sm font-['regular'] pt-1`}
                  >
                    Upload your modt recent photograpgh (png/jpeg/jpg formats)
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {/* PAYMENT DETAILS */}
            <Text
              className={`w-full text-xs text-[#667085] font-['medium'] mt-8`}
            >
              PAYMENT DETAILS
            </Text>
            {/* BANK ACCOUNT NUMBER */}
            <View className="relative items-start justify-start w-full mt-1">
              <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>
                Bank Account Number
              </Text>
              <TextInput
                className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] 
                      text-[#344054] pl-5 ${accountError && "border-red-500"}`}
                placeholder="Enter Account Number"
                placeholderTextColor={"#667085"}
                value={account}
                onChangeText={(text) => setAccount(text)}
                onBlur={() => setAccountError(!/^\d{10}$/.test(account))}
                keyboardType="number-pad"
              />
            </View>

            {/* BANK NAME */}
            <View className="relative items-start justify-start w-full mt-1">
              <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>
                Bank Name
              </Text>
              <TouchableOpacity
                onPress={() => setOpenBottomSheet(!openBottomSheet)}
                className={`flex flex-row items-center justify-between w-full mt-3 px-4 border-[1px] border-[#D0D5DD] rounded-lg h-12 
                       ${selectedBank !== "Select Bank" && "border-[#0077B6]"}`}
              >
                <Text className={`text-base text-[#667085] font-['regular']`}>
                  {selectedBank}
                </Text>
                <TouchableOpacity
                  onPress={() => setOpenBottomSheet(!openBottomSheet)}
                >
                  {openDropdown ? (
                    <SimpleLineIcons
                      name="arrow-up"
                      size={18}
                      color="#667085"
                    />
                  ) : (
                    <SimpleLineIcons
                      name="arrow-down"
                      size={18}
                      color="#667085"
                    />
                  )}
                </TouchableOpacity>
              </TouchableOpacity>
              {/* {openDropdown && (
                    <View className="flex flex-col items-start w-full rounded-lg mt-1 border-[1px] border-[#D0D5DD] px-4 py-1">
                      {banks.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => handleDropdown(item)}
                            className="py-[10px] w-full"
                          >
                            <Text
                              className={`text-base font-['regular'] text-[#344054]`}
                            >
                              {item}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )} */}
            </View>

            {/* BANK ACCOUNT NAME */}
            <View className="relative items-start justify-start w-full mt-1">
              <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>
                Bank Account Name
              </Text>
              <TextInput
                className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] 
                      text-[#344054] pl-5 ${nameError && "border-red-500"}`}
                placeholder="Account Name"
                placeholderTextColor={"#667085"}
                value={name}
                onChangeText={(text) => setName(text)}
                onBlur={() => setNameError(name.trim().length <= 1)}
                keyboardType="default"
              />
            </View>

            {/* BANK VERIFICATION NUMBER */}
            <View className="relative items-start justify-start w-full mt-1">
              <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>
                Bank Verification Number (BVN)
              </Text>
              <TextInput
                className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] 
                      text-[#344054] pl-5 ${bvnError && "border-red-500"}`}
                placeholder="Enter BVN"
                placeholderTextColor={"#667085"}
                value={bvn}
                onChangeText={(text) => setBvn(text)}
                onBlur={() => setBvnError(!/^\d{11}$/.test(bvn))}
                keyboardType="number-pad"
              />
            </View>

            {/* NIN */}
            <View className="relative items-start justify-start w-full mt-1">
              <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>
                NIN
              </Text>
              <TextInput
                className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] 
                      text-[#344054] pl-5 ${ninError && "border-red-500"}`}
                placeholder="Enter NIN"
                placeholderTextColor={"#667085"}
                value={nin}
                onChangeText={(text) => setNin(text)}
                onBlur={() => setNinError(!/^\d{11}$/.test(nin))}
                keyboardType="number-pad"
              />
            </View>

            {/* BIKE DETAILS */}
            <Text
              className={`w-full text-xs text-[#667085] font-['medium'] mt-8`}
            >
              BIKE DETAILS
            </Text>
            {/* BIKE NUMBER */}
            <View className="relative items-start justify-start w-full mt-1">
              <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>
                Bike Number
              </Text>
              <TextInput
                className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] 
                      text-[#344054] pl-5 ${bikeNumError && "border-red-500"}`}
                placeholder="Bike Number"
                placeholderTextColor={"#667085"}
                value={bikeNumber}
                onChangeText={(text) => setBikeNumber(text)}
                onBlur={() => setBikeNumError(bikeNumber.trim().length <= 5)}
                keyboardType="default"
              />
            </View>

            <View className="relative items-start justify-start w-full mt-1">
              <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>
                Bike Photo
              </Text>
              <TouchableOpacity
                onPress={pickBikePhoto}
                className={`flex items-center justify-center mt-3 px-8 border-[1px]
                         border-[#D0D5DD] rounded-lg h-[154px] w-full text-base font-['regular'] ${
                           bikePhoto && "border-[#0077B6]"
                         }`}
              >
                {bikePhoto ? (
                  <View className="flex flex-col items-center w-full px-8">
                    <MaterialIcons name="verified" size={32} color="#27AE60" />
                    <Text
                      className={`text-center text-[#667085] text-sm font-['regular'] mt-2`}
                    >
                      Bike Photo successfully uploaded
                    </Text>
                  </View>
                ) : (
                  <Text
                    className={`text-center text-[#667085] text-sm font-['regular'] pt-1`}
                  >
                    Upload (png/jpeg/pdf formats)
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {/* BIKE LICENSE */}
            <View className="relative items-start justify-start w-full mt-7">
              <Text className={`text-sm text-[#101828] font-['bold']`}>
                Bike License
              </Text>
              <TouchableOpacity
                onPress={pickBikeLicense}
                className={`flex items-center justify-center mt-3 px-8 border-[1px]
                         border-[#D0D5DD] rounded-lg h-[154px] w-full text-base font-['regular'] ${
                           bikeLicense && "border-[#0077B6]"
                         }`}
              >
                {bikeLicense ? (
                  <View className="flex flex-col items-center w-full px-8">
                    <MaterialIcons name="verified" size={32} color="#27AE60" />
                    <Text
                      className={`text-center text-[#667085] text-sm font-['regular'] mt-2`}
                    >
                      Bike License successfully uploaded
                    </Text>
                  </View>
                ) : (
                  <Text
                    className={`text-center text-[#667085] text-sm font-['regular'] pt-1`}
                  >
                    Upload (png/jpeg/pdf formats)
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {/* ROAD WORTHY PAPERS */}
            <View className="relative items-start justify-start w-full mt-7">
              <Text className={`text-sm text-[#101828] font-['bold']`}>
                Road Worthy Papers
              </Text>
              <TouchableOpacity
                onPress={pickRoadPapers}
                className={`flex items-center justify-center mt-3 px-8 border-[1px]
                         border-[#D0D5DD] rounded-lg h-[154px] w-full text-base font-['regular'] ${
                           roadPapers && "border-[#0077B6]"
                         }`}
              >
                {roadPapers ? (
                  <View className="flex flex-col items-center w-full px-8">
                    <MaterialIcons name="verified" size={32} color="#27AE60" />
                    <Text
                      className={`text-center text-[#667085] text-sm font-['regular'] mt-2`}
                    >
                      Road Worthy Papers successfully uploaded
                    </Text>
                  </View>
                ) : (
                  <Text
                    className={`text-center text-[#667085] text-sm font-['regular'] pt-1`}
                  >
                    Upload (png/jpeg/pdf formats)
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {/* RIDERS CARD */}
            <View className="relative items-start justify-start w-full mt-7">
              <Text className={`text-sm text-[#101828] font-['bold']`}>
                Riders Card
              </Text>
              <TouchableOpacity
                onPress={pickRidersCard}
                className={`flex items-center justify-center mt-3 px-8 border-[1px]
                         border-[#D0D5DD] rounded-lg h-[154px] w-full text-base font-['regular'] ${
                           ridersCard && "border-[#0077B6]"
                         }`}
              >
                {ridersCard ? (
                  <View className="flex flex-col items-center w-full px-8">
                    <MaterialIcons name="verified" size={32} color="#27AE60" />
                    <Text
                      className={`text-center text-[#667085] text-sm font-['regular'] mt-2`}
                    >
                      Riders Card successfully uploaded
                    </Text>
                  </View>
                ) : (
                  <Text
                    className={`text-center text-[#667085] text-sm font-['regular'] pt-1`}
                  >
                    Upload (png/jpeg/pdf formats)
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {/* BUTTON */}
            <View className="flex items-center justify-center w-full mt-16">
              <Text
                className={`text-sm text-red-500 font-['medium'] mb-4 w-full text-start`}
              >
                {error}
              </Text>
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={valid}
                className={`flex items-center justify-center h-12 w-full rounded-lg bg-[#0077B6] ${
                  valid && "opacity-30"
                }`}
              >
                {loading ? (
                  <ActivityIndicator size="large" color="#ffffff" />
                ) : (
                  <Text className={`text-base font-[bold] text-white`}>
                    Create your account
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className={`flex items-center justify-center h-12 mt-6 w-full rounded-lg bg-[#EBF8FF]`}
              >
                <Text className={`text-base font-[bold] text-[#0077B6]`}>
                  Go Back
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Layout.ScrollView>
      </Layout>

      {/* bottom sheet */}
      {openBottomSheet && (
          <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            style={{ padding: 0 }}
            onChange={(index) => {
              if (index === -1 || index === 0) {
                closeBottomSheet();
              }
            }}
          >
            <BottomSheetFlatList
              style={{ marginHorizontal: 10 }}
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
              data={banks}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setBottomSheetFn(item?.key, index);
                      setOpenBottomSheet(false);
                    }}
                    style={{
                      marginBottom: 5,
                      paddingVertical: 25,
                      paddingHorizontal: 15,
                      backgroundColor: "#f6f6f6",
                      borderWidth: 1,
                      borderColor: "#ededed",
                      borderRadius: 8,
                    }}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        flexDirection: "row",
                        gap: 20,
                      }}
                    >
                      <Text style={{ fontWeight: "400", fontSize: 13, flex: 1 }}>
                        {item.value}
                      </Text>
                      <CustomRadioButton
                        value={index}
                        selected={radioBtnChecked === index}
                        onSelect={() => {
                          setBottomSheetFn(item?.key, index);
                          setOpenBottomSheet(false);
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
              alwaysBounceVertical={false}
            />
          </BottomSheet>
      )}
    </SafeAreaView>
  );
}
