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
          name="Main"
          component={Main}
        />
        <Switch.Screen name="Favorites" component={Favorites} />
      </Switch.Navigator>
    </NavigationContainer>
  );
};

export default MySwitch




  
  

