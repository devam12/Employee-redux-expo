import { ActivityIndicator, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RouteNames } from "./common/constants";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SignInScreen from "./screen/SignInScreen";
import { useDispatch, useSelector } from "react-redux";
import HomeScreen from "./screen/HomeScreen";
import { loadTokenFromStorage, setToken } from "./store/user";

const AppStack = createNativeStackNavigator();

const Route = () => {
  const authToken = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setTokenInRedux = async () => {
      try {
        const token = await loadTokenFromStorage();
        if (token) {
          dispatch(setToken(token));
        }
      } catch (error) {
        console.error("Error loading token from AsyncStorage:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!authToken) {
      setTokenInRedux();
    } else {
      setLoading(false);
    }
  }, [authToken, dispatch]);

  const initialRoute = authToken
    ? RouteNames.HOME_SCREEN
    : RouteNames.SIGNIN_SCREEN;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <AppStack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            headerShown: false,
          }}
        >
          <AppStack.Screen
            name={RouteNames.SIGNIN_SCREEN}
            component={SignInScreen}
          />
          <AppStack.Screen
            name={RouteNames.HOME_SCREEN}
            component={HomeScreen}
          />
        </AppStack.Navigator>
      </SafeAreaProvider>
    </View>
  );
};

export default Route;

const styles = StyleSheet.create({});
