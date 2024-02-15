import { Image } from "react-native";
import React from "react";

const ImageItem = ({ item, index }) => {
  return (
    <Image
      style={{
        width: "90%",
        height: 400,
        borderRadius: 20,
        alignSelf: "center",
      }}
      source={{ uri: "http://192.168.1.8/note_backend/uploads/" + item.file }}
    />
  );
};

export default ImageItem;
