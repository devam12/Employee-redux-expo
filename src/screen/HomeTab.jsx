import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
} from "react-native";
import {
  clearMail,
  clearToken,
  loadTokenFromStorage,
  setData,
} from "../store/user";
import { useNavigation } from "@react-navigation/native";
import { RouteNames } from "../common/constants";
import { Formik } from "formik";
import * as yup from "yup";
import PrimaryButton from "../components/src/component/PrimaryButton";

const HomeTab = () => {
  const dispatch = useDispatch();
  const { token, data, mail } = useSelector((state) => state.user);
  const navigation = useNavigation();

  console.log({ mail });

  const validationSchema = yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    age: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, "Age must be a number"),
    address: yup.string().required(),
    city: yup.string().required(),
  });

  const logoutHandler = () => {
    dispatch(clearMail());
    dispatch(clearToken());
    navigation.navigate(RouteNames.SIGNIN_SCREEN);
  };

  const handleAddEmployee = (values, { resetForm }) => {
    dispatch(setData(values));
    resetForm();
  };

  useEffect(() => {
    const loadToken = async () => {
      try {
        const homeToken = await loadTokenFromStorage();
      } catch (error) {
        console.error("Error loading token from AsyncStorage:", error);
      }
    };

    loadToken();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <ScrollView>
          {mail && (
            <>
              <TouchableOpacity style={styles.emailContainer}>
                <Text style={styles.emailText}>Email : </Text>
              </TouchableOpacity>

              <View style={styles.hr}></View>
            </>
          )}

          <TouchableOpacity style={styles.formContainer}>
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                age: "",
                address: "",
                city: "",
              }}
              onSubmit={handleAddEmployee}
              validationSchema={validationSchema}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                resetForm,
                values,
                errors,
              }) => (
                <>
                  <View style={styles.inputContainer}>
                    <TextInput
                      onChangeText={handleChange("firstname")}
                      onBlur={handleBlur("firstname")}
                      value={values.firstname}
                      placeholder="Enter Fristname "
                      placeholderTextColor="white"
                      style={styles.input}
                    />
                    {errors.firstname && (
                      <Text style={styles.error}>{errors.firstname}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      onChangeText={handleChange("lastname")}
                      onBlur={handleBlur("lastname")}
                      value={values.lastname}
                      placeholder="Enter Lastname"
                      placeholderTextColor="white"
                      style={styles.input}
                    />
                    {errors.lastname && (
                      <Text style={styles.error}>{errors.lastname}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      onChangeText={handleChange("age")}
                      onBlur={handleBlur("age")}
                      value={values.age}
                      placeholder="Enter age"
                      placeholderTextColor="white"
                      style={styles.input}
                    />
                    {errors.age && (
                      <Text style={styles.error}>{errors.age}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      onChangeText={handleChange("address")}
                      onBlur={handleBlur("address")}
                      value={values.address}
                      placeholder="Enter address"
                      placeholderTextColor="white"
                      style={styles.input}
                    />
                    {errors.address && (
                      <Text style={styles.error}>{errors.address}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      onChangeText={handleChange("city")}
                      onBlur={handleBlur("city")}
                      value={values.city}
                      placeholder="Enter city"
                      placeholderTextColor="white"
                      style={styles.input}
                    />
                    {errors.city && (
                      <Text style={styles.error}>{errors.city}</Text>
                    )}
                  </View>

                  <PrimaryButton
                    text={"Add Employee"}
                    onPress={() => handleSubmit(values, { resetForm })}
                    style={styles.addButton}
                  />
                </>
              )}
            </Formik>
          </TouchableOpacity>
        </ScrollView>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <PrimaryButton
            text={"Logout"}
            onPress={logoutHandler}
            style={styles.logoutButton}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131415",
    padding: 20,
    paddingBottom: 70,
  },
  emailContainer: {
    padding: 5,
    marginTop: 10,
  },
  emailText: {
    marginBottom: 10,
    color: "#FFF",
  },
  hr: {
    borderWidth: 1,
    borderColor: "#FFF",
    marginVertical: 10,
  },
  formContainer: {
    padding: 5,
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    color: "white",
    paddingLeft: 10,
  },
  error: {
    color: "red",
  },
  addButton: {
    backgroundColor: "#FFF",
  },
  logoutContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  logoutButton: {
    backgroundColor: "#D2042D",
  },
});

export default HomeTab;
