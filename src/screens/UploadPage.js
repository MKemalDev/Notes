import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
const UploadPage = ({ navigation, route }) => {
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
      {/* {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )} */}
      <View style={styles.header}>
        <Text
          onPress={() => navigation.goBack()}
          style={{ fontSize: 15, fontWeight: "bold", color: "#4F6D7A" }}
        >
          <AntDesign name="close" size={24} color="black" />
        </Text>
      </View>
      <View style={styles.images}>
        <View onPress={pickImage} style={styles.upload}>
          <View style={{ alignItems: "center", gap: 10 }}>
            <AntDesign name="addfile" size={30} color="black" />
            <Text>Upload</Text>
          </View>
        </View>
        <View style={styles.image}></View>
        <View style={styles.image}></View>
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
    borderWidth: 1,
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
