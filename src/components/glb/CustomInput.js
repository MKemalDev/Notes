import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const CustomInput = ({ placeholder, value, onChangeValue, style }) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChange={onChangeValue}
      style={style}
    />
  );
};

export default CustomInput;
