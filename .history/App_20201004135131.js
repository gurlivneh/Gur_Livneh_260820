import React, {useState, useEffect} from 'react';
import {Dimensions, ScrollView, SafeAreaView} from 'react-native';
import NavBar from './src/components/NavBar';
import styled from 'styled-components/native';
import {Provider} from 'react-redux';
import store from './src/state/store';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './src/screens/Main';
import Favorites from './src/screens/Favorites';

const Stack = createStackNavigator();

const App = () => {
  const [height, setHeight] = useState(Dimensions.get('window').height);
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const isLandscape = width > height ? true : false;
  const [page, setPage] = useState('Home');
  const handleNav = (item) => {
    setPage(item);
  };

  useEffect(() => {
    const handleChange = () => {
      setWidth(Dimensions.get('window').width);
      setHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', handleChange);

    return () => {
      Dimensions.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <>
      <SafeAreaView>
        <Provider store={store}>
          <MainView height={height} width={width}>
          <NavBar />
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Main">
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Favorites" component={Favorites} />
              </Stack.Navigator>
            </NavigationContainer>
          </MainView>
        </Provider>
      </SafeAreaView>
    </>
  );
};

export default App;

const MainView = styled.View`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-color: whitesmoke;
  display: flex;
`;
