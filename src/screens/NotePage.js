import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const NotePage = () => {
  const [title, setTitle] = React.useState("Note Title");
  const [content, setContent] = React.useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec"
  );
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          height: "80%",
          backgroundColor: "#D2E6ED",
          padding: 20,
          borderRadius: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextInput
            style={{ fontSize: 20, fontWeight: "bold", color: "#4F6D7A" }}
            onChangeText={(e) => setTitle(e)}
            value={title}
          />
          <Text style={{ fontSize: 14 }}>Dosya Ekle</Text>
        </View>
        <TextInput
          multiline={true}
          numberOfLines={1000}
          style={{
            textAlignVertical: "top",
            padding: 10,
          }}
          onChangeText={(e) => setContent(e)}
          value={content}
        />
      </View>
    </View>
  );
};

export default NotePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
});
