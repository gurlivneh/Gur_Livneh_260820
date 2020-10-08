import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createSwitchNavigator } from '@react-navigation/stack';
import Main from '../screens/Main';
import Favorites from '../screens/Favorites';

const Switch = createSwitchNavigator();

const MySwitch = () => {
  return (
    <NavigationContainer>
      <Switch.Navigator>
        <Switch.Screen
          name="Home"
          component={HomeScreen}
        />
        <Switch.Screen name="Profile" component={ProfileScreen} />
      </Switch.Navigator>
    </NavigationContainer>
  );
};




  
  

