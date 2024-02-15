import React from "react";
import { HomePage, NoteDescription, NotePage, UploadPage } from "../screens";
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
      <Stack.Screen name="Upload" component={UploadPage} />
      <Stack.Screen name="NoteDescription" component={NoteDescription} />
    </Stack.Navigator>
  );
};

export default UserStack;
