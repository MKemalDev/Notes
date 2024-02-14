import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

import * as ImagePicker from "expo-image-picker";
const NotePage = ({ navigation }) => {
  const [title, setTitle] = React.useState("Note Title");
  const [content, setContent] = React.useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec"
  );
  const [image, setImage] = React.useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          onPress={() => navigation.goBack()}
          style={{ fontSize: 15, fontWeight: "bold", color: "#4F6D7A" }}
        >
          Geri Dön
        </Text>
      </View>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
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
          <Text onPress={pickImage} style={{ fontSize: 14 }}>
            Dosya Ekle
          </Text>
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
  header: {
    height: "12%",
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 20,
    justifyContent: "space-between",
  },
});
