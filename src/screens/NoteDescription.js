import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const NoteDescription = ({ navigation, route }) => {
  const { description } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          onPress={() => navigation.goBack()}
          style={{ fontSize: 15, fontWeight: "bold", color: "#4F6D7A" }}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </Text>
      </View>
      <View style={{ width: "100%", height: "88%", elevation: 5, padding: 20 }}>
        <View style={styles.cart}>
          <Text>{description}</Text>
        </View>
      </View>
    </View>
  );
};

export default NoteDescription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    height: "12%",
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 5,
    paddingBottom: 20,
    justifyContent: "space-between",
  },
  cart: {
    width: "100%",
    height: 600,
    backgroundColor: "#fff",
    elevation: 4,
    borderRadius: 10,
    padding: 10,
    gap: 20,
  },
});
