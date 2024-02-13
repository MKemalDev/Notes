import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import CustomInput from "../components/glb/CustomInput";
import CustomButton from "../components/glb/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
const LoginPage = ({ navigation }) => {
  const [formValue, setFormValue] = React.useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector((state) => state.user);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notlarım</Text>
        <Text style={styles.subtitle}>
          Notlarızını görmek için giriş yapınız
        </Text>
      </View>
      <Text style={styles.error}>{error}</Text>
      <View style={styles.form}>
        <TextInput
          placeholder={"Kullanıcı Adı"}
          value={formValue.username}
          onChangeText={(e) => setFormValue({ ...formValue, username: e })}
          style={styles.input}
        />

        <CustomInput
          placeholder={"Şifre"}
          secureTextEntry={true}
          value={formValue.password}
          onChangeText={(e) => setFormValue({ ...formValue, password: e })}
          style={styles.input}
        />
        <Text
          onPress={() => navigation.navigate("Forgot")}
          style={{
            fontSize: 12,
            width: "88%",
            color: "#4F6D7A",
            opacity: 0.8,
            fontWeight: "500",
            alignSelf: "flex-end",
          }}
        >
          Şifremi unuttum !
        </Text>
        <Pressable
          onPress={() => {
            dispatch(login(formValue.username, formValue.password));
          }}
          style={styles.button}
        >
          <Text>{isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}</Text>
        </Pressable>
      </View>
      <Text
        onPress={() => navigation.navigate("Register")}
        style={styles.subtitle}
      >
        Hesabınız yok mu ? <Text>Kayıt Ol</Text>{" "}
      </Text>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 10,
  },

  error: {
    color: "red",
    fontSize: 15,
    fontWeight: "500",
    alignSelf: "center",
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
