import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 28, fontWeight: "bold", color: "#4F6D7A" }}>
          Notlarım
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "500", opacity: 0.5 }}>
          Yeni Not Ekle
        </Text>
      </View>

      <ScrollView style={{ width: "100%" }}>
        <View style={styles.body}>
          {[...Array(10)].map((_, index) => (
            <Pressable
              onPress={() => {
                navigation.navigate("Note", {
                  id: index,
                });
              }}
              key={index}
              style={styles.cart}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "500", color: "#4F6D7A" }}
                >
                  Note Title
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    opacity: 0.7,
                    color: "#3C362A",
                  }}
                >
                  12.12.2022
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  opacity: 0.5,
                  fontWeight: "500",
                  marginBottom: 10,
                }}
              >
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    height: "12%",
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 20,
    justifyContent: "space-between",
  },
  body: {
    width: "100%",
    gap: 20,
    overflowY: "scroll",
    flexDirection: "column",
    padding: 20,
  },
  cart: {
    width: "100%",
    height: 200,
    backgroundColor: "#D2E6ED",
    borderRadius: 10,
    padding: 20,
    gap: 20,
  },
});
