import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../redux/userSlice";
const RegisterPage = ({ navigation }) => {
  const [formValue, setFormValue] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const { isLoading, error, response } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (response || error) {
      setInterval(() => {
        dispatch(reset());
      }, 3000);
    }
  }, [response, error]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notlarım</Text>
        <Text style={styles.subtitle}>
          Yeni notlar eklemek için kayıt yapınız
        </Text>
      </View>
      <Text style={styles.error}>{error}</Text>
      <Text style={styles.message}>{response?.message}</Text>
      <View style={styles.form}>
        <TextInput
          placeholder={"E-posta"}
          value={formValue.email}
          onChangeText={(e) => setFormValue({ ...formValue, email: e })}
          style={styles.input}
        />

        <TextInput
          placeholder={"Kullanıcı Adı"}
          value={formValue.username}
          onChangeText={(e) => setFormValue({ ...formValue, username: e })}
          style={styles.input}
        />

        <TextInput
          placeholder={"Şifre"}
          secureTextEntry={true}
          value={formValue.password}
          onChangeText={(e) => setFormValue({ ...formValue, password: e })}
          style={styles.input}
        />

        <Pressable
          onPress={() => {
            dispatch(register(formValue));
          }}
          style={styles.button}
        >
          <Text>{isLoading ? "Kayıt Yapılıyor..." : "Kayıt Ol"}</Text>
        </Pressable>
      </View>
      <Text
        onPress={() => navigation.navigate("Login")}
        style={styles.subtitle}
      >
        Hesabınız var mı ? <Text>Giriş Yap</Text>
      </Text>
    </View>
  );
};

export default RegisterPage;

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
  error: {
    color: "red",
    fontSize: 15,
    fontWeight: "500",
    alignSelf: "center",
  },

  message: {
    color: "green",
    fontSize: 15,
    fontWeight: "500",
    alignSelf: "center",
  },
});
