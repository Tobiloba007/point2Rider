import { View, Text, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Dimensions, Pressable, Platform, Image } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';




export default function Register2() {
    const [idPhoto, setIdPhoto] = useState(null);
    const [bikePhoto, setBikePhoto] = useState(null);
    const [bikeLicense, setBikeLicense] = useState(null);
    const [roadPapers, setRoadPapers] = useState(null);
    const [ridersCard, setRidersCard] = useState(null);
    const [account, setAccount] = useState(''); 
    const [accountError, setAccountError] = useState(''); 
    const [openDropdown, setOpenDropdown] = useState(false); 
    const [selectedBank, setSelectedBank] = useState('Select Bank'); 
    const [name, setName] = useState(''); 
    const [nameError, setNameError] = useState(''); 

    const banks = ['Access Bank', 'Fidelity Bank', 'United Bank For Africa', 'Guaranty Trust Bank', 'Eco Bank', 'Diamond Bank', 'Sterling Bank', 'Union Bank', 'Wema Bank']

    const handleDropdown = (item) => {
        setSelectedBank(item)
        setOpenDropdown(false)
    }


    //    PICK PHOTO ID
    const pickPhotoId = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        });

        console.log(result.uri);
    
        if (!result.canceled) {
            setIdPhoto(result.assets[0].uri);
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

        console.log(result.uri);
    
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

        console.log(result.uri);
    
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

        console.log(result.uri);
    
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

        console.log(result.uri);
    
        if (!result.canceled) {
            setRidersCard(result.assets[0].uri);
        }
      };


    const navigation = useNavigation();

    const screenWidth = Dimensions.get('window').width;

    const valid =  idPhoto === null || bikePhoto === null || bikeLicense === null || roadPapers === null || ridersCard === null || account === '' || selectedBank === 'Select Bank' || name === ''

    const values = {'id_photo': idPhoto, 'bike_photo': bikePhoto, 'bike_license': bikeLicense, 'road_papers': roadPapers, 'riders_card': ridersCard, 'account_number': account, 'bank': selectedBank, 'account_name': name}

    const handleSubmit = () => {
      navigation.navigate('verifyAccount')
      console.log(values)
    }

  return (
    <SafeAreaView className="flex-1 items-center justify-start bg-white pt-8">

        <TouchableOpacity onPress={()=>navigation.goBack()}
        className="flex flex-row items-center justify-start w-full px-5 pb-3">
              <Feather name="arrow-left" size={18} color="#344054" />
              <Text className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}>Back</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={{width: screenWidth, alignItems: 'center', paddingHorizontal: 20, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
        >
        <View className="items-start w-full mt-5">
             <Text className={`text-2xl text-[#101828] font-['bold']`}>Create your account</Text>
             <View className="flex flex-row items-center justify-start w-full">
                 <Text className={`text-sm text-[#475467] font-['medium'] mt-3`}>Have an account?</Text>
                 <TouchableOpacity onPress={()=>navigation.navigate('login')}>
                    <Text className={`text-sm text-[#0077B6] font-['bold'] mt-3`}> Login</Text>
                 </TouchableOpacity>
             </View>
        </View>

        <View className="flex flex-row items-center justify-start w-full mt-7">
             <View className='rounded-full border-[2px] border-[#0077B6]'>
                <View className='flex items-center justify-center border-[0.4px] rounded-full border-[#0077B6] h-14 w-14 bg-[#EBF8FF]'>
                      <Text className={`text-base text-[#1D2939] font-['medium']`}>1/2</Text>
                </View>
             </View>

             <View className='items-start ml-5'>
                  <Text className={`text-base text-[#1D2939] font-['bold']`}>Additional Details</Text>
                  <Text className={`text-sm text-[#344054] font-['regular']`}>Please enter the correct information</Text>
             </View>
        </View>


        <KeyboardAvoidingView className="flex items-center justify-start w-full mt-4">

                          {/* VALID ID PHOTO */}
            <Text className={`w-full text-xs text-[#667085] font-['medium'] mt-5`}>IDENTIFICATION</Text>
            <View className="relative items-start justify-start w-full mt-1">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>Valid ID Photo</Text>
                  <TouchableOpacity onPress={pickPhotoId} className={`flex items-center justify-center mt-3 px-8 border-[1px]
                     border-[#D0D5DD] rounded-lg h-[154px] w-full text-base font-['regular'] ${idPhoto && 'border-[#0077B6]'}`}>
                       {idPhoto
                        ?<View className='flex flex-col items-center w-full px-8'>
                            <MaterialIcons name="verified" size={32} color="#27AE60" />
                            <Text className={`text-center text-[#667085] text-sm font-['regular'] mt-2`}>
                                  ID photo successfully uploaded
                            </Text>
                        </View>
                        :<Text className={`text-center text-[#667085] text-sm font-['regular'] pt-1`}>
                            Upload (NIN, Drivers License, Voters Card)
                            (png/jpeg/pdf formats)
                       </Text>
                       }
                  </TouchableOpacity>
            </View>


                          {/* PAYMENT DETAILS */}
            <Text className={`w-full text-xs text-[#667085] font-['medium'] mt-8`}>PAYMENT DETAILS</Text>
                  {/* BANK ACCOUNT NUMBER */}
            <View className="relative items-start justify-start w-full mt-1">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>Bank Account Number</Text>
                  <TextInput className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] 
                  text-[#344054] pl-5 ${accountError && 'border-red-500'}`}
                  placeholder='Enter Account Number'
                  placeholderTextColor={'#667085'}
                  value={account}
                  onChangeText={(text) => setAccount(text)}
                  onBlur={()=>setAccountError(!/^\d{10}$/.test(account))}
                  keyboardType='number-pad'
                  />
            </View>

                  {/* BANK NAME */}
            <View className="relative items-start justify-start w-full mt-1">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>Bank Name</Text>
                  <TouchableOpacity onPress={()=>setOpenDropdown(!openDropdown)}
                  className={`flex flex-row items-center justify-between w-full mt-3 px-4 border-[1px] border-[#D0D5DD] rounded-lg h-12 
                   ${selectedBank !== 'Select Bank' && 'border-[#0077B6]'}`}>
                    <Text className={`text-base text-[#667085] font-['regular']`}>{selectedBank}</Text>
                    <TouchableOpacity onPress={()=>setOpenDropdown(!openDropdown)}>
                       {
                        openDropdown
                        ?<SimpleLineIcons name="arrow-up" size={18} color="#667085" />
                        :<SimpleLineIcons name="arrow-down" size={18} color="#667085" />
                       }
                    </TouchableOpacity>
                  </TouchableOpacity>
                  {openDropdown &&
                  <View className='flex flex-col items-start w-full rounded-lg mt-1 border-[1px] border-[#D0D5DD] px-4 py-1'>
                       {banks.map((item, index) => {
                        return(
                            <TouchableOpacity key={index} onPress={()=>handleDropdown(item)}
                            className='py-[10px] w-full'>
                                 <Text className={`text-base font-['regular'] text-[#344054]`}>{item}</Text>
                            </TouchableOpacity>
                        )
                       })}
                  </View>
                  }
            </View>

            {/* BANK ACCOUNT NAME */}
            <View className="relative items-start justify-start w-full mt-1">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>Bank Account Name</Text>
                  <TextInput className={`mt-3 border-[1px] border-[#D0D5DD] rounded-lg h-12 w-full text-base font-['regular'] 
                  text-[#344054] pl-5 ${nameError && 'border-red-500'}`}
                  placeholder='Account Name'
                  placeholderTextColor={'#667085'}
                  value={name}
                  onChangeText={(text) => setName(text)}
                  onBlur={()=>setNameError(name.trim().length <= 1)}
                  keyboardType='default'
                  />
            </View>


            {/* BIKE DETAILS */}
            <Text className={`w-full text-xs text-[#667085] font-['medium'] mt-8`}>BIKE DETAILS</Text>
            <View className="relative items-start justify-start w-full mt-1">
                  <Text className={`text-sm text-[#101828] font-['bold'] mt-3`}>Bike Photo</Text>
                  <TouchableOpacity onPress={pickBikePhoto} className={`flex items-center justify-center mt-3 px-8 border-[1px]
                     border-[#D0D5DD] rounded-lg h-[154px] w-full text-base font-['regular'] ${bikePhoto && 'border-[#0077B6]'}`}>
                       {bikePhoto
                        ?<View className='flex flex-col items-center w-full px-8'>
                            <MaterialIcons name="verified" size={32} color="#27AE60" />
                            <Text className={`text-center text-[#667085] text-sm font-['regular'] mt-2`}>
                                  Bike Photo successfully uploaded
                            </Text>
                        </View>
                        :<Text className={`text-center text-[#667085] text-sm font-['regular'] pt-1`}>
                             Upload
                             (png/jpeg/pdf formats)
                       </Text>
                       }
                  </TouchableOpacity>
            </View>


            {/* BIKE LICENSE */}
            <View className="relative items-start justify-start w-full mt-7">
                  <Text className={`text-sm text-[#101828] font-['bold']`}>Bike License</Text>
                  <TouchableOpacity onPress={pickBikeLicense} className={`flex items-center justify-center mt-3 px-8 border-[1px]
                     border-[#D0D5DD] rounded-lg h-[154px] w-full text-base font-['regular'] ${bikeLicense && 'border-[#0077B6]'}`}>
                       {bikeLicense
                        ?<View className='flex flex-col items-center w-full px-8'>
                            <MaterialIcons name="verified" size={32} color="#27AE60" />
                            <Text className={`text-center text-[#667085] text-sm font-['regular'] mt-2`}>
                                  Bike License successfully uploaded
                            </Text>
                        </View>
                        :<Text className={`text-center text-[#667085] text-sm font-['regular'] pt-1`}>
                             Upload
                             (png/jpeg/pdf formats)
                       </Text>
                       }
                  </TouchableOpacity>
            </View>

            {/* ROAD WORTHY PAPERS */}
            <View className="relative items-start justify-start w-full mt-7">
                  <Text className={`text-sm text-[#101828] font-['bold']`}>Road Worthy Papers</Text>
                  <TouchableOpacity onPress={pickRoadPapers} className={`flex items-center justify-center mt-3 px-8 border-[1px]
                     border-[#D0D5DD] rounded-lg h-[154px] w-full text-base font-['regular'] ${roadPapers && 'border-[#0077B6]'}`}>
                       {roadPapers
                        ?<View className='flex flex-col items-center w-full px-8'>
                            <MaterialIcons name="verified" size={32} color="#27AE60" />
                            <Text className={`text-center text-[#667085] text-sm font-['regular'] mt-2`}>
                                  Road Worthy Papers successfully uploaded
                            </Text>
                        </View>
                        :<Text className={`text-center text-[#667085] text-sm font-['regular'] pt-1`}>
                             Upload
                             (png/jpeg/pdf formats)
                       </Text>
                       }
                  </TouchableOpacity>
            </View>

            {/* RIDERS CARD */}
            <View className="relative items-start justify-start w-full mt-7">
                  <Text className={`text-sm text-[#101828] font-['bold']`}>Riders Card</Text>
                  <TouchableOpacity onPress={pickRidersCard} className={`flex items-center justify-center mt-3 px-8 border-[1px]
                     border-[#D0D5DD] rounded-lg h-[154px] w-full text-base font-['regular'] ${ridersCard && 'border-[#0077B6]'}`}>
                       {ridersCard
                        ?<View className='flex flex-col items-center w-full px-8'>
                            <MaterialIcons name="verified" size={32} color="#27AE60" />
                            <Text className={`text-center text-[#667085] text-sm font-['regular'] mt-2`}>
                                  Riders Card successfully uploaded
                            </Text>
                        </View>
                        :<Text className={`text-center text-[#667085] text-sm font-['regular'] pt-1`}>
                             Upload
                             (png/jpeg/pdf formats)
                       </Text>
                       }
                  </TouchableOpacity>
            </View>

            

              {/* BUTTON */}
            <View className="flex items-center justify-center w-full mt-16">
                  <TouchableOpacity onPress={handleSubmit}
                  disabled={valid}
                  className={`flex items-center justify-center h-12 w-full rounded-lg bg-[#0077B6] ${valid && 'opacity-30'}`}>
                      <Text className={`text-base font-[bold] text-white`}>Create your account</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>navigation.goBack()}
                  className={`flex items-center justify-center h-12 mt-6 w-full rounded-lg bg-[#EBF8FF]`}>
                      <Text className={`text-base font-[bold] text-[#0077B6]`}>Go Back</Text>
                  </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>

        </ScrollView>


    </SafeAreaView>
  )
}