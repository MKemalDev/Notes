import React from "react";
import { HomePage, NotePage, ProfilePage } from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const UserStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Note" component={NotePage} />
    </Stack.Navigator>
  );
};

export default UserStack;
