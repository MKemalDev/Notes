import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import axios from "axios";

const UploadPage = ({ navigation, route }) => {
  const [image, setImage] = React.useState(null);
  const { id } = route.params;
  const { token } = useSelector((state) => state.user);
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [uploading, setUploading] = React.useState(0);

  const [uploadResponse, setUploadResponse] = React.useState(null);

  const uploadImage = async (file) => {
    try {
      var formData = new FormData();
      if (!file) {
        // Hiçbir resim seçilmemiş durumunu işle
        console.warn("Lütfen bir resim seçin");
        return;
      }
      formData.append("image", {
        uri: file?.uri,
        type: file?.mimeType,
        name: "image." + file?.mimeType.split("/")[1],
      });
      formData.append("note_id", id);
      const response = await axios.post(
        "http://192.168.1.8/note_backend/uploadImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-apikey": "Bearer " + token,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploading(percentCompleted);
          },
        }
      );

      if (response.status === 200) {
        setUploading(0);
        setUploadResponse("Resim yüklendi");
        getImages();
        setTimeout(() => {
          setImage(null);
          setUploadResponse(null);
        }, 1000);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        Alert.alert("Bir sorun Oluştu ", " lütfen resmi tekrar kaydedin");
        setUploading(0);
        setUploadResponse(null);
        setImage(null);
      } else {
        setUploading(0);
        setUploadResponse(null);
        setImage(null);
        Alert.alert("Bir sorun Oluştu", " lütfen resmi tekrar kaydedin");
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      var file = result.assets[0];
      setImage(file);
      uploadImage(file);
    }
  };

  const getImages = async () => {
    axios
      .get("http://192.168.1.8/note_backend/getImages?note_id=" + id, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-apikey": "Bearer " + token,
        },
      })
      .then((res) => {
        setImages(res.data.images);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 401) {
          reset();
        }
        console.log(err);
      });
  };

  const removeImage = async (id) => {
    axios
      .delete("http://192.168.1.8/note_backend/removeImage?image_id=" + id, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-apikey": "Bearer " + token,
        },
      })
      .then((res) => {
        getImages();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 401) {
          reset();
        }
        console.log(err);
      });
  };

  React.useEffect(() => {
    getImages();
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
      </View>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.images}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
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
                <Text>Resim Seç</Text>
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
                  style={{ position: "absolute", top: 5, right: 5, zIndex: 5 }}
                >
                  <AntDesign name="close" size={24} color="black" />
                </Pressable>
                {uploading > 0 && (
                  <View style={styles.progressContainer}>
                    <Text
                      style={{
                        fontSize: 30,
                        color: "#fff",
                        fontWeight: "bold",
                        opacity: 0.5,
                      }}
                    >
                      {uploading + "%"}
                    </Text>
                  </View>
                )}
                {uploadResponse && (
                  <View style={styles.progressContainer}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#fff",
                        fontWeight: "bold",
                        opacity: 0.5,
                      }}
                    >
                      {uploadResponse}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>

          {images.map((image, index) => (
            <View key={index} style={styles.image}>
              <Image
                source={{
                  uri: "http://192.168.1.8/note_backend/uploads/" + image.file,
                }}
                style={{ width: "100%", height: "100%", borderRadius: 10 }}
              />
              <Pressable
                onPress={() => removeImage(image.id)}
                style={{ position: "absolute", top: 5, right: 5, zIndex: 5 }}
              >
                <AntDesign name="close" size={24} color="black" />
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
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
  progressContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
});
