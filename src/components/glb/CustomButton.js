import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const CustomButton = ({ text, onPress, style }) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <Text>{text}</Text>
    </Pressable>
  );
};

export default CustomButton;
