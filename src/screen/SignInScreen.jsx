import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RouteNames } from "../common/constants";
import { setMail, setToken } from "../store/user";
import { FontWeight } from "../common/styles";
import PrimaryButton from "../components/src/component/PrimaryButton";

const SignInScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  });

  const loginHandler = async (email, password) => {
    const lowerEmail = email.toLowerCase().trim();
    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lowerEmail, password }),
      });

      const responseData = await response.json();

      if (response.ok) {
        const token = responseData.token;
        if (!!token) {
          dispatch(setMail(lowerEmail));
          dispatch(setToken(token));
          navigation.navigate(RouteNames.HOME_SCREEN);
        }
      } else {
        if (responseData.error === "user_not_found") {
          throw new Error("User not found");
        } else if (responseData.error === "missing_password") {
          throw new Error("Missing password");
        } else {
          throw new Error("API ERROR PLEASE CONTACT API PROVIDER");
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const handleLogin = async (values) => {
    try {
      await loginHandler(values.email, values.password);
      values.email = "";
      values.password = "";
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#131415",
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          borderRadius: 10,
          marginTop: 200,
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Text style={{ color: "white", fontSize: 25 }} color="white">
            LOGIN USER
          </Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.containerFirstBox}>
            <View style={styles.textBoxContainer}>
              <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={handleLogin}
                validationSchema={validationSchema}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                }) => (
                  <>
                    <View style={{ marginBottom: 10 }}>
                      <TextInput
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        placeholder="Email"
                        placeholderTextColor="white" // Set placeholder text color to white
                        style={{
                          height: 40,
                          borderColor: "white",
                          borderWidth: 1,
                          borderRadius: 10,
                          color: "white",
                          paddingLeft: 10,
                        }}
                      />
                      {errors.email && (
                        <Text style={styles.error}>{errors.email}</Text>
                      )}
                    </View>

                    <View style={{ marginBottom: 10 }}>
                      <TextInput
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        placeholder="Password"
                        secureTextEntry
                        placeholderTextColor="white" // Set placeholder text color to white
                        style={{
                          height: 40,
                          borderColor: "white",
                          borderWidth: 1,
                          borderRadius: 10,
                          color: "white",
                          paddingLeft: 10,
                        }}
                      />
                      {errors.password && (
                        <Text style={styles.error}>{errors.password}</Text>
                      )}
                    </View>

                    <View style={styles.containerSecondBox}>
                      <PrimaryButton text={"Log In"} onPress={handleSubmit} />
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  formContainer: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 20,
    color: "#fff",
  },
  error: {
    color: "red",
  },
  containerFirstBox: {
    gap: 20,
  },
  containerSecondBox: {},
  textBoxContainer: {
    gap: 20,
  },

  forgotTextContainer: {
    height: 18,
    justifyContent: "flex-end",
  },
  forgotText: {
    fontSize: 12,
    fontWeight: FontWeight.THIN,
    lineHeight: 18,
    textAlign: "right",
    color: "#D4FB54",
  },
  container: {
    position: "absolute",
  },
});
