import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomInput from "../components/glb/CustomInput";
import CustomButton from "../components/glb/CustomButton";

const LoginPage = () => {
  const [formValue, setFormValue] = React.useState({
    username: "",
    password: "",
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notlarım</Text>
        <Text style={styles.subtitle}>
          Notlarızını görmek için giriş yapınız
        </Text>
      </View>
      <View style={styles.form}>
        <CustomInput
          placeholder={"Kullanıcı Adı"}
          value={formValue.username}
          onChangeValue={(e) => setFormValue({ ...formValue, username: e })}
          style={styles.input}
        />

        <CustomInput
          placeholder={"Şifre"}
          value={formValue.password}
          onChangeValue={(e) => setFormValue({ ...formValue, password: e })}
          style={styles.input}
        />
        <Text
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
        <CustomButton
          text={"Giriş Yap"}
          onPress={() => {}}
          style={styles.button}
        />
      </View>
      <Text style={styles.subtitle}>
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
