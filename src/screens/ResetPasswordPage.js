import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import CustomButton from "../components/glb/CustomButton";

const ResetPasswordPage = ({ navigation, route }) => {
  const [formValue, setFormValue] = React.useState({
    password: "",
    NewPassword: "",
  });
  const email = route.params.email;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notlarım</Text>
        <Text style={styles.subtitle}>Yeni Şifrenizi girebilirsiniz</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          placeholder={"Yeni Şifreniz"}
          value={formValue.password}
          onChangeText={(e) => setFormValue({ ...formValue, password: e })}
          style={styles.input}
        />

        <TextInput
          placeholder={"Yeni Şifreniz Tekrar"}
          value={formValue.NewPassword}
          onChangeText={(e) => setFormValue({ ...formValue, NewPassword: e })}
          style={styles.input}
        />
        <CustomButton
          text={"Doğrula"}
          onPress={() => {}}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default ResetPasswordPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 10,
  },
  header: {
    height: "20%",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4F6D7A",
  },
  subtitle: {
    fontSize: 12,
    color: "#4F6D7A",
    opacity: 0.5,
    fontWeight: "500",
  },
  button: {
    width: "75%",
    height: 50,
    backgroundColor: "#C0D6DF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "90%",
    marginTop: "5%",
    height: 275,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 25,
    flexDirection: "column",
  },
  input: {
    width: "75%",
    height: 45,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#C0D6DF",
    paddingLeft: 2,
  },
});
