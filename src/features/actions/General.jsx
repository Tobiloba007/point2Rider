import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from '../AuthSlice';



const BASE_URL = 'https://api.test-point2api.online/api'




// GET ALL ORDERS
export const getAllOrders = (setOrders, setLoading, setError, setEmpty) => async () => {
    setLoading(true)
    const loginToken = await AsyncStorage.getItem('loginToken');
    const headers = {
      'Authorization': `Bearer ${loginToken}`,
    };
    try{
      const response = await axios.get(`${BASE_URL}/rider/getorders`, { headers });
      if (response.status === 200) {
        setOrders(response.data.data.data)
        // console.log(response.data.data.data)
        // if(response.data.data.orders.data.length === 0){
        //   setEmpty(true)
        // }
      } else if (response.status !== 200) {
        console.log('request failed status code:', response.status);
      } 
    } catch(error) {
        if (error.response) {
            console.log(error.response)
            console.error('API Error:',error.response.status);
        } else if (error.request) {
        //   console.log(error.response.);
          setError('Please check your internet connection...')
        } 
      };
    
      setLoading(false)
  };


// GET SINGLE ORDER DETAILS
export const getSingleOrder = (setLoadDetails, navigation, item) => async () => {
    setLoadDetails(true)
    const loginToken = await AsyncStorage.getItem('loginToken');
    const headers = {
      'Authorization': `Bearer ${loginToken}`,
    };
    try{
      const response = await axios.get(`${BASE_URL}/rider/getorders?id=${item}`, { headers });
      if (response.status === 200) {
        // console.log(response.data.data, 'datas')
        const data = response.data.data
        navigation.navigate('viewDetails', { data })
      } else if (response.status !== 200) {
        console.log('request failed status code:', response.status);
      } 
    } catch(error) {
        if (error.response) {
            console.log(error.response)
            console.error('API Error:',error.response.status);
        } else if (error.request) {
        //   console.log(error.response.);
        //   setError('Please check your internet connection...')
        } 
      };
    
      setLoadDetails(false)
  };



  // MARK ORDER AS DELIVERED
export const orderDelivered = (values, setLoading, setError, setSubmitted) => async () => {
       const loginToken = await AsyncStorage.getItem('loginToken');
       const headers = {
         'Authorization': `Bearer ${loginToken}`,
       };
       setLoading(true)
        try{
          const response = await axios.post(`${BASE_URL}/rider/orders/mark-as-delivered`, values, { headers });
          if (response.status === 200) {
            console.log('Order delivered successfully');
            // console.log(response.data)
            setSubmitted(true)
          } else if (response.status !== 200) {
            console.log('Registration failed with status code:', response.status);
          } 
        } catch(error) {
            if (error.response) {
              // The server responded with an error (e.g., HTTP status code 4xx or 5xx)
              setError(error.response.data.message)
              // console.log(error.response.data.message)
              console.error('API Error:', error.response.data.status);
            } else if (error.request) {
              // The request was made but no response was received (e.g., network issue)
              setError('Please check your internet connection...')
              console.error('Network Error:', error.request);
            } 
          };
        
          setLoading(false)
}


  // MARK ORDER AS PICKED
export const pickedOrder = (values, setLoadPickUp, setPick) => async () => {
       const loginToken = await AsyncStorage.getItem('loginToken');
       const headers = {
         'Authorization': `Bearer ${loginToken}`,
       };
       setLoadPickUp(true)
        try{
          const response = await axios.post(`${BASE_URL}/rider/orders/pick-up`, values, { headers });
          if (response.status === 200) {
            console.log('Order picked successfully');
            console.log(response.data)
            setPick(true)
          } else if (response.status !== 200) {
            console.log('Registration failed with status code:', response.status);
          } 
        } catch(error) {
            if (error.response) {
              // The server responded with an error (e.g., HTTP status code 4xx or 5xx)
              setError(error.response.data.message)
              console.log(error.response.data.message)
              console.error('API Error:', error.response.data.status);
            } else if (error.request) {
              // The request was made but no response was received (e.g., network issue)
              setError('Please check your internet connection...')
              console.error('Network Error:', error.request);
            } 
          };
        
          setLoadPickUp(false)
}


  // UPLOAD PICTURE
  export const UploadPicture = (formData, setError, setLoading) => async (dispatch) => {
    const loginToken = await AsyncStorage.getItem('loginToken');
    const headers = {
      'Authorization': `Bearer ${loginToken}`,
      'Content-Type': 'multipart/form-data',
    };
    setLoading(true)
     try{
       const response = await axios.post(`${BASE_URL}/profile/upload-photo`, formData, { headers });
       if (response.status === 200) {
         console.log(response.data.message)
       } else if (response.status !== 200) {
         console.log('picture upload failed with status code:', response.status);
       } 
     } catch(error) {
         if (error.response) {
           // The server responded with an error (e.g., HTTP status code 4xx or 5xx)
           setError(error.response, 'ERROR')
           // console.log(error.response.data.message)
           console.error('API Error:', error.response.data.status);
         } else if (error.request) {
           // The request was made but no response was received (e.g., network issue)
           setError('Please check your internet connection...')
           console.error('Network Error:', error.request);
         } 
       };
     
       setLoading(false)
}


// EDIT DETAILS
export const editDetails = (values, setError, setSuccess, setLoading) => async () => {
  const loginToken = await AsyncStorage.getItem("loginToken");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${loginToken}`,
  };
  setLoading(true);
  setError('')
  setSuccess('')
  try {
    const response = await axios.post(`${BASE_URL}/profile/edit-details`, values, { headers }
    );
    if (response.status === 200) {
      setSuccess(response.data.message)
      // console.log(response.data.message);
    } else if (response.status !== 200) {
      console.log("Registration failed with status code:", response.status);
    }
  } catch (error) {
    if (error.response) {
      // The server responded with an error (e.g., HTTP status code 4xx or 5xx)
      setError(error.response.message);
      console.log(error.response);
      console.error("API Error:", error.response.status);
    } else if (error.request) {
      // The request was made but no response was received (e.g., network issue)
      setError("Please check your internet connection...");
      console.error("Network Error:", error.request);
    }
  }

  setLoading(false);
};
