import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomInput from "../components/glb/CustomInput";

const LoginPage = () => {
  const [formValue, setFormValue] = React.useState({
    username: "",
    password: "",
  });

  return (
    <View style={styles.container}>
      <Text>LoginPage</Text>
      <CustomInput
        placeholder={"Username"}
        value={formValue.username}
        onChangeValue={(e) => setFormValue({ ...formValue, username: e })}
        style={styles.input}
      />

      <CustomInput
        placeholder={"Password"}
        value={formValue.password}
        onChangeValue={(e) => setFormValue({ ...formValue, password: e })}
        style={styles.input}
      />
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7D82B8",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 25,
  },
  input: {
    width: "75%",
    height: 45,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 20,
  },
});
