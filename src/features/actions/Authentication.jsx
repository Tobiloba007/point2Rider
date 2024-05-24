import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../AuthSlice";
import { BASE_URL } from "../../../constants/base_urls";

// REGISTER ACCOUNT
export const registerAccount =
  (formData, setError, setLoading, navigation) => async () => {
    setLoading(true);
    setError("");
    console.log("here", formData);

    const extractEmailAndPhone = (formData) => {
      let email = null;
      let phone = null;

      for (let i = 0; i < formData._parts.length; i++) {
        if (formData._parts[i][0] === "email") {
          email = formData._parts[i][1];
        }
        if (formData._parts[i][0] === "phone") {
          phone = formData._parts[i][1];
        }
      }
      return { email, phone };
    };
    
    const { email, phone } = extractEmailAndPhone(formData);
    console.log("email",email, "phone", phone);

    try {
      const response = await axios.post(
        `${BASE_URL}/auth/rider/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );
      if (response.status === 201) {
        console.log("yes");
        console.log("Registration successfull");
        console.log(response.data.data.access_token);
        const access_token = response.data.data.access_token;
        AsyncStorage.setItem("token", access_token);
        console.log(access_token);
        console.log("a", email, "b", phone);
        navigation.navigate("verifyAccount", { email: email, phone: phone });
      } else if (response.status !== 201) {
        console.log("Registration failed with status code:", response.status);
      }
    } catch (error) {
      if (error.response) {
        console.log("no");
        // The server responded with an error (e.g., HTTP status code 4xx or 5xx)
        if (error.response.data.message.email) {
          setError(error.response.data.message.email[0]);
        } else if (error.response.data.message.phone) {
          setError(error.response.data.message.phone[0]);
        }
        console.log("message", error.response.data.message);
        console.error("API Error:", error.response.data.status);
      } else if (error.request) {
        console.log("and no");
        // The request was made but no response was received (e.g., network issue)
        setError("Please check your internet connection...");
        console.error("Please check your internet connection...");
        console.error("Network Error:", error.request);
      }
    }

    setLoading(false);
  };

// GET BANKS
export const getBanks = (setBanks, setLoadBanks, setMessage) => async () => {
  setLoadBanks(true);
  try {
    const response = await axios.get(`${BASE_URL}/banking/get-banks`);
    if (response.status === 200) {
      setBanks(response.data.data.data);
      console.log(response.data.data.data);
      setMessage("");
    } else if (response.status !== 200) {
      console.log("request failed status code:", response.status);
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      console.error("API Error:", error.response.status);
    } else if (error.request) {
      console.log(error.response);
      setMessage("Please check your internet connection...");
    }
  }
  setLoadBanks(false);
};

// VERIFY ACCOUNT
export const verifyAccount =
  (values, setLoading, setError, navigation) => async () => {
    const loginToken = await AsyncStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginToken}`,
    };
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/verify-token`,
        values,
        { headers }
      );
      if (response.status === 200) {
        console.log("Verification successfull");
        console.log(response.data);
        navigation.navigate("registrationDone");
      } else if (response.status !== 200) {
        console.log("Registration failed with status code:", response.status);
      }
    } catch (error) {
      if (error.response) {
        // The server responded with an error (e.g., HTTP status code 4xx or 5xx)
        setError(error.response.data.message);
        console.log(error.response.data.message);
        console.error("API Error:", error.response.data.status);
      } else if (error.request) {
        // The request was made but no response was received (e.g., network issue)
        setError("Please check your internet connection...");
        console.error("Network Error:", error.request);
      }
    }

    setLoading(false);
  };


// LOGIN
export const loginAction =
  (values, setLoading, setError, navigation) => async (dispatch) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, values);
      if (response.status === 200) {
        // console.log(response.data.data.user_data)
        dispatch(setUser(response.data.data.user_data));
        const access_token = response.data.data.access_token;
        AsyncStorage.setItem("loginToken", access_token);
        // const jsonValue = JSON.stringify(response.data.data.user_data);
        // AsyncStorage.setItem("loginDetails", jsonValue);
        // console.log(access_token)
        {
          response.data.data.user_data.type === "RIDER"
            ? navigation.navigate("tab")
            : setError("User not found");
        }
      } else if (response.status !== 200) {
        console.log("Registration failed with status code:", response.status);
      }
    } catch (error) {
      if (error.response) {
        // The server responded with an error (e.g., HTTP status code 4xx or 5xx)
        setError(error.response.data.message);
        console.log(error.response);
        console.error("API Error:", error.response.data.status);
      } else if (error.request) {
        // The request was made but no response was received (e.g., network issue)
        setError("Please check your internet connection...");
        console.error("Network Error:", error.request.status);
      }
    }

    setLoading(false);
  };


// FORGOT PASSWORD
export const forgotPassword =
  (values, setLoading, setError, navigation) => async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/forget/password`,
        values
      );
      if (response.status === 200) {
        console.log("successfull");
        console.log(values);
        console.log(response.data);
        navigation.navigate("verifyOtp", { email: values.email });
      } else if (response.status !== 200) {
        console.log("Registration failed with status code:", response.status);
      }
    } catch (error) {
      if (error.response) {
        // The server responded with an error (e.g., HTTP status code 4xx or 5xx)
        setError(error.response.data.message.email[0]);
        console.log(error.response.data.message.email[0]);
        console.error("API Error:", error.response.data.status);
      } else if (error.request) {
        // The request was made but no response was received (e.g., network issue)
        setError("Please check your internet connection...");
        console.error("Network Error:", error.request);
      }
    }

    setLoading(false);
  };


// FORGOT PASSWORD TOKEN
export const forgotPasswordToken =
  (values, setLoading, setError, setResendError, navigation, email) =>
  async () => {
    setLoading(true);
    setResendError("");
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/verify/password/token`,
        values
      );
      if (response.status === 200) {
        console.log("successfull");
        console.log(values);
        console.log(response.data);
        navigation.navigate("createNewPassword", { mail: email });
        console.log(email, "EMAIL");
      } else if (response.status !== 200) {
        console.log("Registration failed with status code:", response.status);
      }
    } catch (error) {
      if (error.response) {
        // The server responded with an error (e.g., HTTP status code 4xx or 5xx)
        if (
          error.response.data.message ===
          "Wrong Token, Please check your reset code"
        ) {
          console.log(error.response.data.message);
          setError(error.response.data.message);
          setLoading(false);
        }
        if (error.response.data.message.verification_token[0]) {
          console.log(error.response.data.message.verification_token[0]);
          setError(error.response.data.message.verification_token);
          setLoading(false);
        }
        console.error("API Error:", error.response.data.status);
      } else if (error.request) {
        // The request was made but no response was received (e.g., network issue)
        setError("Please check your internet connection...");
        console.error("Network Error:", error.request);
      }
    }

    setLoading(false);
  };


// RESEND VERIFY TOKEN
export const resendVerifyToken =
  (resend, setLoadResend, setError, setResendError, setStartCountdown) =>
  async () => {
    setError("");
    setLoadResend(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/resend/verify/token`,
        resend
      );
      if (response.status === 200) {
        console.log("successfull");
        console.log(resend);
        console.log(response.data);
        setResendError(response.data.message);
        setStartCountdown(true);
        // navigation.navigate('createNewPassword');
      } else if (response.status !== 200) {
        console.log("Registration failed with status code:", response.status);
      }
    } catch (error) {
      if (error.response) {
        // The server responded with an error (e.g., HTTP status code 4xx or 5xx)
        // setResendError(error.response.data)
        console.log(error.response.data);
        console.error("API Error:", error.response.data.status);
      } else if (error.request) {
        // The request was made but no response was received (e.g., network issue)
        setResendError("Please check your internet connection...");
        console.error("Network Error:", error.request);
      }
    }

    setLoadResend(false);
  };


// CHANGE PASSWORD
export const changePassword =
  (combinedValues, setLoading, setError, navigation) => async () => {
    const loginToken = await AsyncStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginToken}`,
    };
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/forget/password/change`,
        combinedValues,
        { headers }
      );
      if (response.status === 200) {
        console.log("successfull");
        navigation.navigate("resetSuccess");
        console.log(response.data);
        // console.log(values);
      } else if (response.status !== 200) {
        console.log("Registration failed with status code:", response.status);
      }
    } catch (error) {
      if (error.response) {
        // The server responded with an error (e.g., HTTP status code 4xx or 5xx)
        setError(error.response.data.message.email);
        console.log(error.response.data.message.email);
        console.error("API Error:", error.response.data.status);
      } else if (error.request) {
        // The request was made but no response was received (e.g., network issue)
        setError("Please check your internet connection...");
        console.error("Network Error:", error.request);
      }
    }

    setLoading(false);
  };
