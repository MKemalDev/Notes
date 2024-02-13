import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const CustomButton = ({ text, onPress, style }) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <Text
        style={{
          color: "white",
          fontSize: 18,
          textAlign: "center",
          fontWeight: "500",
          textTransform: "uppercase",
          letterSpacing: 2,
          padding: 15,
          width: "100%",
          backgroundColor: "#4F6D7A",
          borderRadius: 10,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
