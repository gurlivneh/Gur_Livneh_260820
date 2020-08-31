import React, {useState, useEffect} from 'react';
import {Dimensions, ScrollView, SafeAreaView} from 'react-native';
import Main from './src/screens/Main';
import Favorites from './src/screens/Favorites';
import NavBar from './src/components/NavBar';
import styled from 'styled-components/native';
import {Provider} from 'react-redux';
import store from './src/state/store';

const App = () => {
  const [page, setPage] = useState('Home');
  const handleNav = (item) => {
    setPage(item);
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <Provider store={store}>
            <MainView>
              <NavBar handleNav={handleNav} page={page} />
              {page === 'Home' ? <Main /> : <Favorites handleNav={handleNav} />}
            </MainView>
          </Provider>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;

const MainView = styled.View`
  width: 100%;
  min-height: 100%;
  background-color: whitesmoke;
  display: flex;
`;
