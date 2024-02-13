import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginPage, RegisterPage, ForgotPage } from "../screens";
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
    </Stack.Navigator>
  );
};

export default AuthStack;
