import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
} from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { reset } from "../redux/userSlice";
import axios from "axios";
import { useSelector } from "react-redux";
import Swiper from "react-native-swiper";
import ImageItem from "../components/ImageItem";
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
        setNotes(res.data.notes);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 401) {
          reset();
        }
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
          <FontAwesome6 name="add" size={24} color="black" />
        </Text>
      </View>

      <ScrollView style={{ width: "100%" }}>
        <View style={styles.body}>
          {notes.map((note, index) => (
            <Pressable key={index} style={styles.cart}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "500",
                    color: "#4F6D7A",
                  }}
                >
                  {note.title}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    opacity: 0.7,
                    color: "#3C362A",
                  }}
                >
                  {new Date(note.create_date).toLocaleDateString()}
                </Text>
              </View>
              <View style={{ height: "82%" }}>
                <Swiper
                  dot={<View style={{ display: "none" }} />}
                  activeDotStyle={{
                    display: "none",
                  }}
                >
                  {note.images.map((image, index) => (
                    <ImageItem key={index} item={image} index={index} />
                  ))}
                </Swiper>
                <View style={{ height: "10%", gap: 8 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "500",
                      color: "#3C362A",
                      paddingHorizontal: 20,
                    }}
                  >
                    @Kemal07
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      paddingHorizontal: 20,
                    }}
                  >
                    <Text
                      onPress={() => {
                        navigation.navigate("NoteDescription", {
                          description: note.content,
                        });
                      }}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={{
                        fontSize: 13,
                        fontWeight: "500",
                        opacity: 0.7,
                        flex: 1,
                        color: "#3C362A",
                      }}
                    >
                      {note.content}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      alignSelf: "flex-end",
                      paddingHorizontal: 20,
                    }}
                  >
                    Düzenle
                  </Text>
                </View>
              </View>
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
    height: 600,
    backgroundColor: "#fff",
    elevation: 4,
    borderRadius: 10,
    padding: 10,
    gap: 20,
  },
});
