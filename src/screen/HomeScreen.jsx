import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { clearToken } from "../store/user";
import { useNavigation } from "@react-navigation/native";
import { RouteNames } from "../common/constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTab from "./HomeTab";
import EmployeeTab from "./EmployeeTab";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#ccc",
        headerStyle: {
          backgroundColor: "#131415",
        },
        headerTintColor: "#fff",
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
        tabBarStyle: {
          backgroundColor: "#131415",
        },
      }}
    >
      <Tab.Screen
        name={RouteNames.HOME_TAB}
        component={HomeTab}
        options={{
          tabBarIcon: (props) => {
            return <AntDesign name="home" size={20} color="#FFF" />;
          },
        }}
      />
      <Tab.Screen
        name={RouteNames.EMPLOYEE_TAB}
        component={EmployeeTab}
        options={{
          tabBarIcon: (props) => {
            return <Entypo name="list" size={20} color="#FFF" />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
