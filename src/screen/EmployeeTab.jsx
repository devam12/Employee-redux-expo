import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { clearData, setData } from "../store/user";
import PrimaryButton from "../components/src/component/PrimaryButton";
import { useFocusEffect } from "@react-navigation/native";

const EmployeeTab = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const dispatch = useDispatch();

  const fetchEmployeeData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("employee");
      if (storedData !== null) {
        setEmployeeData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Error retrieving data from AsyncStorage:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchEmployeeData();
    }, [])
  );

  const clearDataAndStorage = async () => {
    console.log("call");
    try {
      await AsyncStorage.removeItem("employee");
      dispatch(clearData());
      fetchEmployeeData();
    } catch (error) {
      console.error("Error removing data from AsyncStorage:", error);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <ScrollView>
          {employeeData?.map((employee, index) => (
            <View key={index} style={styles.employeeContainer}>
              <Text style={styles.nameText}>
                {`${employee.firstname} ${employee.lastname}`}
              </Text>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>{`Age: ${employee.age}`}</Text>
                <Text
                  numberOfLines={2}
                  style={styles.detailText}
                >{`${employee.address}, ${employee.city}`}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.logoutContainer}>
          <PrimaryButton
            text={"Clear Data"}
            onPress={clearDataAndStorage}
            style={styles.logoutButton}
            disable={employeeData?.length === 0}
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
  },
  employeeContainer: {
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  nameText: {
    color: "#FFF",
    textTransform: "capitalize",
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailText: {
    color: "#FFF",
    textTransform: "capitalize",
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

export default EmployeeTab;
