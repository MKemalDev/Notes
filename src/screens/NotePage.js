import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import axios from "axios";
const NotePage = ({ navigation, route }) => {
  const [title, setTitle] = React.useState(null);
  const [content, setContent] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const { id } = route.params;
  const { token } = useSelector((state) => state.user);
  const [response, setResponse] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const getNotes = async () => {
    axios
      .get("http://192.168.1.8/note_backend/getNote?id=" + id, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-apikey": "Bearer " + token,
        },
      })
      .then((res) => {
        setLoading(false);
        setTitle(res.data.note.title);
        setContent(res.data.note.content);
      })
      .catch((err) => {
        setLoading(false);
        setResponse(err.response.data);
      });
  };

  React.useEffect(() => {
    getNotes();
  }, []);

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
          <AntDesign name="close" size={24} color="black" />
        </Text>
        <Text
          onPress={() => {}}
          style={{ fontSize: 15, fontWeight: "bold", color: "#4F6D7A" }}
        >
          <AntDesign name="check" size={24} color="black" />
        </Text>
      </View>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <View
        style={{
          width: "100%",
          height: "88%",
          backgroundColor: "#D2E6ED",
          padding: 20,
          borderRadius: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 5,
            alignItems: "center",
          }}
        >
          <TextInput
            style={{ fontSize: 20, fontWeight: "bold", color: "#4F6D7A" }}
            onChangeText={(e) => setTitle(e)}
            value={loading ? "Yükleniyor..." : title || "Not Başlığı"}
          />
          <Text onPress={pickImage} style={{ fontSize: 14 }}>
            <AntDesign name="addfile" size={20} color="black" />
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
          value={loading ? "Yükleniyor..." : content || "Not yazın"}
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
    padding: 5,
    paddingBottom: 20,
    justifyContent: "space-between",
  },
});
