import { View, Text, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';
import Bank from '../../../assets/icon/bank.svg'
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Formik } from "formik";
import * as Yup from "yup";
import { value } from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';
import { useNavigation } from '@react-navigation/native';



const addBankShema = Yup.object().shape({
  number: Yup.string().required().matches(/^\d{10}$/),
  acct_name:Yup.string().min(2).max(50).required(),


});


export default function ManageBankAccount({setPages, setDeleteBank}) {
  const [dropdown, setDropdown] = useState(false);
  const [openBank, setOpenBank] = useState(false);
  const [selectedBank, setSelelctedBank] = useState('Select bank');

  const banks = ['First Bank of Nigeria', 'United Bank for Africa (UBA)', 'Access Bank', 'Guaranty Trust Bank', 'Sterling Bank', 'Eco Bank', 'Union Bank']

  const navigation = useNavigation();

  const handleSelect = (item) => {
    setSelelctedBank(item)
    setOpenBank(false)
  }

  const handleSubmit = async (values) => {
      const combinedData = {...values, bank_name: selectedBank}
      console.log(combinedData)
      navigation.navigate('bankAccountSuccess')

  }
  return (
    <View className='flex-1 items-center justify-start w-full px-5'>
         <View className='relative flex flex-row items-center justify-center w-full mt-3 mb-4'>
              <TouchableOpacity onPress={()=>setPages(0)}
              className="absolute left-0 flex flex-row items-center justify-start w-full">
                    <Feather name="arrow-left" size={18} color="#344054" />
                    <Text className={`text-xs text-[#344054] font-['medium'] pl-2 pb-[2px]`}>Back</Text>
              </TouchableOpacity>
              <Text className={`absolute text-lg text-[#101828] font-['bold'] pl-2 pb-[2px]`}>Bank Account</Text>
         </View>


         <ScrollView showsVerticalScrollIndicator={false}>
            <View className='flex items-center justify-start w-full mt-12 mb-8'>
                  {/* SAVED BANK ACCOUNT*/}
                <View className='flex flex-row items-center justify-between w-full'>
                   <View className='flex flex-row items-center justify-start'>
                        <View className='flex items-center justify-center h-[52px] w-[52px] rounded-full bg-[#EBF8FF]'>
                            <Bank />
                        </View>
                        <View className='flex items-start ml-3'>
                            <Text className={`text-sm text-[#1D2939] font-['medium'] w-44`}>Samuel Ajayi</Text>
                            <Text className={`text-xs text-[#667085] font-['medium'] mt-1 w-44`}>Firstbank of Nigeria (7160)</Text>
                        </View>
                   </View>
                   <TouchableOpacity onPress={()=>setDeleteBank(true)}
                   className='flex items-center justify-center h-9 rounded-[23px] border-[1px] border-[#EB5757] px-4'>
                         <Text className={`text-sm text-[#EB5757] font-['medium']`}>Delete</Text>
                   </TouchableOpacity>
                </View>

                  {/* ADD BANK ACCOUNT*/}
                <TouchableOpacity onPress={()=>setDropdown(!dropdown)}
                className='flex flex-row items-center justify-between w-full mt-6'>
                   <View className='flex flex-row items-center justify-start'>
                        <View className='flex items-center justify-center h-[52px] w-[52px] rounded-full bg-[#EBF8FF]'>
                              <Feather name="plus" size={20} color="#0077B6" />
                              
                        </View>
                        <View className='flex items-start ml-3'>
                            <Text className={`text-sm text-[#1D2939] font-['medium']`}>New Account</Text>
                        </View>
                   </View>
                   <View className='flex items-center justify-center'>
                         {dropdown
                         ?<MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                         :<MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                         }
                   </View>
                </TouchableOpacity>



                   {/* ADD BANK FORM*/}
                   {dropdown &&
                   <Formik
                   initialValues={{
                    number: '',
                    acct_name: '',
                   }}
                   validationSchema={addBankShema}
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
               <View className='flex flex-col items-center justify-start w-full mt-8'>
                 <View className='flex flex-col items-center justify-start w-full rounded-lg bg-[#F9FAFB] py-6 px-3'>
                    <View className='flex items-start w-full'>
                        <Text className={`text-sm text-[#101828] font-['bold']`}>Bank Account Number</Text>
                        <TextInput className={`mt-3 border-[1px] bg-white border-[#D0D5DD] rounded-lg h-11 w-full text-sm font-['regular'] 
                                             text-[#344054] pl-5 ${touched.number && errors.number && 'border-red-500'} 
                                             ${touched.number && !errors.number && 'border-[#0077B6]'}`}
                        placeholder='0432918673'
                        placeholderTextColor={'#667085'}
                        values={values.number}
                        onChangeText={handleChange("number")}
                        onBlur={() => setFieldTouched("number")}
                        keyboardType='number-pad'
                        />
                    </View>

                    <TouchableOpacity onPress={()=>setOpenBank(!openBank)}
                    className='items-start w-full mt-6'>
                        <Text className={`text-sm text-[#101828] font-['bold']`}>Bank Name</Text>
                        <TextInput className={`relative w-full bg-white border-[1px] border-[#D0D5DD] rounded-lg h-11 mt-2 pl-4 text-[#101828] text-sm
                                              ${selectedBank !== 'Select bank' && 'border-[#0077B6]'}`}
                        placeholder='Select bank'
                        value={selectedBank}
                        keyboardType='number-pad'
                        editable={false}
                        />
                        <View className='absolute top-[42px] right-4 flex justify-end'>
                             {openBank
                             ?<SimpleLineIcons name="arrow-up" size={12} color="black" />
                             :<SimpleLineIcons name="arrow-down" size={12} color="black" />
                             }
                        </View>
                        {openBank &&
                        <View className='flex items-start justify-center w-full mt-1 py-4 px-4 bg-white border-[1px] border-[#eeeeee] rounded-lg'>
                            {banks.map((item) => {
                              return(
                            <TouchableOpacity key={item} onPress={()=>handleSelect(item)}
                            className='w-full py-2'>
                                 <Text className={`text-sm text-[#000000] font-['regular']`}>{item}</Text>
                            </TouchableOpacity>
                            )
                            })}
                        </View>}
                    </TouchableOpacity>

                    <View className='flex items-start w-full mt-6'>
                        <Text className={`text-sm text-[#101828] font-['bold']`}>Bank Account Name</Text>
                        <TextInput className={`mt-3 border-[1px] bg-white border-[#D0D5DD] rounded-lg h-11 w-full text-sm font-['regular'] 
                                             text-[#344054] pl-5 ${touched.acct_name && errors.acct_name && 'border-red-500'} 
                                             ${touched.acct_name && !errors.acct_name && 'border-[#0077B6]'}`}
                        placeholder='Account Name'
                        placeholderTextColor={'#667085'}
                        values={values.acct_name}
                        onChangeText={handleChange("acct_name")}
                        onBlur={() => setFieldTouched("acct_name")}
                        keyboardType='default'
                        />
                    </View>

                  </View>

                     {/* BUTTON */}
                 <View className="flex items-center justify-center w-full mt-8">
                    <TouchableOpacity onPress={handleSubmit}
                    disabled={!isValid || selectedBank === 'Select bank'}
                    className={`flex items-center justify-center h-12 w-full rounded-lg bg-[#0077B6] ${!isValid  && 'opacity-30'} ${selectedBank === 'Select bank' && 'opacity-30'}`}>
                        <Text className={`text-base font-[bold] text-white`}>Continue</Text>
                    </TouchableOpacity>
                 </View> 
               </View>

               </KeyboardAvoidingView>
        )}
        </Formik>
        }


            </View>

            </ScrollView>
    </View>
  )
}