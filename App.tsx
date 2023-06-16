/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import AppProvider from './contexts/AppContext';
import Routes from './routes/routes';

const queryClient = new QueryClient();

const App = () => {
  return (
    <AppProvider>
      <View style={style.container}>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
            <Routes />
          </QueryClientProvider>
        </NavigationContainer>
      </View>
    </AppProvider>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
});
