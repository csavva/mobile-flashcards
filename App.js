import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import {createStore} from "redux";
import reducer from './reducers';
import {Provider} from "react-redux";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import {createStackNavigator} from '@react-navigation/stack';
import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import AddCard from "./components/AddCard";
import Deck from "./components/Deck";
import Quiz from "./components/Quiz";
import {purple, white} from "./utils/colors";
import { setLocalNotification } from './utils/notification'

const Tabs =
    Platform.OS === "ios"
        ? createBottomTabNavigator()
        : createMaterialTopTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const TabNav = () => (
  <Tabs.Navigator
      initialRouteName="Decks"
      screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
              let icon;
              if (route.name === "Add Deck") {
                  icon = (
                      <FontAwesome name="plus-square" size={size} color={color}/>
                  );
              } else if (route.name === "Decks") {
                  icon = (
                      <Ionicons name="ios-list" size={size} color={color}/>
                  );
              }
              return icon;
          }
      })}
      tabBarOptions={{
          header: null,
          activeTintColor: Platform.OS === "ios" ? purple : white,
          showIcon: true,
          style: {
              height: 80,
              backgroundColor: Platform.OS === "ios" ? white : purple,
              shadowColor: "rgba(0, 0, 0, 0.24)",
              shadowOffset: {
                  width: 0,
                  height: 3
              },
              shadowRadius: 6,
              shadowOpacity: 1
          }
      }}
  >
      <Tabs.Screen name="Decks" component={DeckList}/>
      <Tabs.Screen name="Add Deck" component={AddDeck} options={{title: 'Add Deck'}}/>
  </Tabs.Navigator>
);

const Stack = createStackNavigator();
const MainNav = () => (
    <Stack.Navigator headerMode="screen">
        <Stack.Screen
            name="Home"
            component={TabNav}
            options={{headerShown: true}}/>
        <Stack.Screen
            name="Decks"
            component={DeckList}
            options={{headerShown: true}}
        />
        <Stack.Screen
            name="New Deck"
            component={AddDeck}
        />
        <Stack.Screen
            name="Add Card"
            component={AddCard}
            options={{title: 'Add Card' }}
        />
        <Stack.Screen
            name="Quiz"
            component={Quiz}
            options={{headerShown: true, title: ''}, ({ route }) => ({ title: route.params.deckTitle })}
        />
        <Stack.Screen
          name="Deck"
          component={Deck}
          options={({ route }) => ({ title: route.params.deckTitle })}
        />
    </Stack.Navigator>
);

export default class App extends Component {
    componentDidMount() {
        setLocalNotification()
    }

    render(){
        return (
        <Provider store={createStore(reducer)}>
            <View style={{flex: 1}}>
                <NavigationContainer>
                    {/* <UdaciStatusBar backgroundColor={purple} barStyle="light-content"/> */}
                    <MainNav/>
                </NavigationContainer>
            </View>
        </Provider>
        );
    }


}