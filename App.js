import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Route from './src/Route';
import { Provider } from 'react-redux';
import store from './src/store/store';
import { AppRegistry } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style={"dark"} />
        <Provider store={store}>
          <Route />
        </Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

AppRegistry.registerComponent('employeeapp', () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});





