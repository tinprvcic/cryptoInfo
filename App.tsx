import 'react-native-gesture-handler';
import * as React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import HomeScreen from './components/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import InfoScreen from './components/InfoScreen';
import {Pressable, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AboutScreen from './components/AboutScreen';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: '#f04',
    text: '#fcfcfc',
  },
};

const App = () => {
  StatusBar.setBackgroundColor('#f04', false);
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({navigation}) => {
            return {
              headerRight: () => (
                <Pressable
                  android_ripple={{color: '#ccc', borderless: true}}
                  onPress={() => navigation.navigate('About')}>
                  <Icon
                    name="info"
                    color="#fff"
                    style={{fontSize: 24, paddingRight: 16}}
                  />
                </Pressable>
              ),
            };
          }}
        />
        <Stack.Screen
          name="Info"
          component={InfoScreen}
          //@ts-ignore
          options={({route}) => ({title: route.params.name})}
        />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
