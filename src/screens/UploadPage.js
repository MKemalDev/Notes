import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
const UploadPage = ({ navigation, route }) => {
  const [image, setImage] = React.useState(null);
  const { id } = route.params;

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("note_id", id);
    await fetch("http://192.168.1.8/note_backend/uploadImage", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
      uploadImage();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          onPress={() => navigation.goBack()}
          style={{ fontSize: 15, fontWeight: "bold", color: "#4F6D7A" }}
        >
          <AntDesign name="close" size={24} color="black" />
        </Text>
      </View>
      <View style={styles.images}>
        <View style={styles.upload}>
          <Pressable
            onPress={pickImage}
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <AntDesign name="addfile" size={30} color="black" />
            <Text>Upload</Text>
          </Pressable>
        </View>
        {image && (
          <View style={styles.image}>
            <Image
              source={{ uri: image.uri }}
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
            />
            <Pressable
              onPress={() => setImage(null)}
              style={{ position: "absolute", top: 5, right: 5 }}
            >
              <AntDesign name="close" size={24} color="black" />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

export default UploadPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
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
  images: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    height: "88%",
  },
  image: {
    height: 150,
    width: "45%",
    position: "relative",
    borderRadius: 10,
  },
  upload: {
    height: 150,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "dashed",
  },
});
