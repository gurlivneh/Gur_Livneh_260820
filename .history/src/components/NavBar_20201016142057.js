import React from 'react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../state/actions';
import { Switch} from "react-native";



const NavBar = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <MainView isLandscape={props.isLandscape}>
        <ButtonsView>
          <ButtonText
            onPress={() => props.navigation.navigate('Main')}
            selected={true}>
            Home
          </ButtonText>
          <ButtonText
            onPress={() => {
              props.navigation.navigate('Favorites')
            }}
            selected={ true }>
            Favorites
          </ButtonText>
        </ButtonsView>
        <Switch />
        <Switch/>
      </MainView>
    </>
  );
};

export default NavBar;

 const MainView = styled.View`
  width: 100%;
  height: ${(props) => (props.isLandscape ? 60 : 70)}px;
  align-items: center;
  justify-content: flex-start;
  display: flex;
  flex-direction: row;
  background-color: white;
`;

 const ButtonsView = styled.TouchableOpacity`
  width: 200px;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 5px;
`;

 const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.selected ? '#1da1f2' : 'lightblue')};
`;
