import { createStackNavigator } from '@react-navigation/stack';
import Splash1 from './screens/auth/Splash1';
import Splash2 from './screens/auth/Splash2';
import Login from './screens/auth/Login';
import ForgotPassword from './screens/auth/ForgotPassword';
import VerifyOtp from './screens/auth/VerifyOtp';
import CreateNewPassword from './screens/auth/CreateNewPassword';
import ResetSuccess from './screens/auth/ResetSuccess';
import Register from './screens/auth/Register';
import VerifyAccount from './screens/auth/VerifyAccount';
import RegistrationDone from './screens/auth/RegistrationDone';
import Register2 from './screens/auth/Register2';

const Stack = createStackNavigator();

const AppStack = () => {

  return (
    <Stack.Navigator initialRouteName="splash1">
      <Stack.Screen name="splash1" component={Splash1} options={{headerShown: false}} />
      <Stack.Screen name="splash2" component={Splash2} options={{headerShown: false}} />
      <Stack.Screen name="login" component={Login} options={{headerShown: false}} />
      <Stack.Screen name="register" component={Register} options={{headerShown: false}} />
      <Stack.Screen name="register2" component={Register2} options={{headerShown: false}} />
      <Stack.Screen name="verifyAccount" component={VerifyAccount} options={{headerShown: false}} />
      <Stack.Screen name="registrationDone" component={RegistrationDone} options={{headerShown: false}} />
      <Stack.Screen name="forgotPassword" component={ForgotPassword} options={{headerShown: false}} />
      <Stack.Screen name="verifyOtp" component={VerifyOtp} options={{headerShown: false}} />
      <Stack.Screen name="createNewPassword" component={CreateNewPassword} options={{headerShown: false}} />
      <Stack.Screen name="resetSuccess" component={ResetSuccess} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export default AppStack;