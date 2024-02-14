import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { reset } from "../redux/userSlice";
import axios from "axios";
import { useSelector } from "react-redux";
const HomePage = ({ navigation }) => {
  const { token } = useSelector((state) => state.user);
  const [notes, setNotes] = React.useState([]);
  const [response, setResponse] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const getNotes = async () => {
    axios
      .get("http://192.168.1.8/note_backend/getNotes", {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-apikey": "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setNotes(res.data.notes);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
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
        <Text style={{ fontSize: 28, fontWeight: "bold", color: "#4F6D7A" }}>
          Notlarım
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "500", opacity: 0.5 }}>
          Yeni Not Ekle
        </Text>
      </View>

      <ScrollView style={{ width: "100%" }}>
        <View style={styles.body}>
          {notes.map((note, index) => (
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
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    color: "#4F6D7A",
                  }}
                >
                  {note.title}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    opacity: 0.7,
                    color: "#3C362A",
                  }}
                >
                  {new Date(note.create_date).toLocaleDateString()}
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
                {note.content.slice(0, 275) + "..."}
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
    padding: 20,
    flexDirection: "column",
  },

  cart: {
    width: "100%",
    height: 200,
    backgroundColor: "#D2E6ED",
    borderRadius: 10,
    padding: 10,
    gap: 20,
  },
});
