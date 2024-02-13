import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const CustomInput = ({
  placeholder,
  value,
  onChangeValue,
  style,
  secureTextEntry = false,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      secureTextEntry={secureTextEntry}
      onChange={onChangeValue}
      style={style}
    />
  );
};

export default CustomInput;
