/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {Dimensions, View} from 'react-native';
import Main from './src/screens/Main';
import Favorites from './src/screens/Favorites';
import NavBar from './src/components/NavBar';
import styled from 'styled-components/native';
import {Provider} from 'react-redux';
import store from './src/state/store';


const {height, width} = Dimensions.get('window');

const App = () => {

  const [page, setPage] = useState('Home');
  const handleNav = (item) => {
    setPage(item);
  };

  return (
    <>
      <Provider store={store}>
        <MainView>
          <NavBar handleNav={handleNav} page={page}/>
          {page === 'Home' ? (
            <Main/>
          ) : (
            <Favorites handleNav={handleNav} />
          )}
        </MainView>
      </Provider>
    </>
  );
};

export default App;

export const MainView = styled.View`
  width: 100%;
  min-height:100%;
  background-color: whitesmoke;

`;

export const ButtonsView = styled.View`
  width: 40%;
  height: 95%;
  align-items: center;
  justify-content: flex-end;
  /* background-color: blueviolet; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
`;

export const MyButton = styled.View`
  width: 40%;
  height: 75%;
  background-color: green;
  color: white;
`;
