import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

import { useSelector } from "react-redux";
import axios from "axios";
const NotePage = ({ navigation, route }) => {
  const [title, setTitle] = React.useState(null);
  const [content, setContent] = React.useState(null);

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
          <Text
            onPress={() => {
              navigation.navigate("Upload");
            }}
            style={{ fontSize: 14 }}
          >
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
