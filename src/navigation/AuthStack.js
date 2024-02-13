import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  LoginPage,
  RegisterPage,
  ForgotPage,
  TwoFactorAuthCodePage,
  ResetPasswordPage,
} from "../screens";
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
      <Stack.Screen name="Forgot" component={ForgotPage} />
      <Stack.Screen
        name="TwoFactorAuthCode"
        component={TwoFactorAuthCodePage}
      />
      <Stack.Screen name="ResetPassword" component={ResetPasswordPage} />
    </Stack.Navigator>
  );
};

export default AuthStack;
