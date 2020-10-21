import React from 'react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../state/actions';
import {Switch} from 'react-native';

const NavBar = (props) => {
  const dispatch = useDispatch();
  const isCelsius = useSelector(
    (state) => state.reducer.isCelsius,
    () => {},
  );
  const isDark = useSelector(
    (state) => state.reducer.isDark,
    () => {},
  );

  const toggleSwitch = () => dispatch(Actions.setIsCelsius(!isCelsius));

  return (
    <>
      <MainView isLandscape={props.isLandscape} isDark={isDark}>
        <ButtonsView>
          <ButtonText
            onPress={() => props.navigation.navigate('Main')}
            selected={true}
            isDark={isDark}>
            Home
          </ButtonText>
          <ButtonText
            onPress={() => {
              props.navigation.navigate('Favorites');
            }}
            selected={true}
            isDark={isDark}>
            Favorites
          </ButtonText>
        </ButtonsView>
        <SwitchView>
        <SwitchTitle isDark={isDark}>F°</SwitchTitle>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isCelsius ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isCelsius}
          />
          <SwitchTitle isDark={isDark}>C°</SwitchTitle>
        </SwitchView>
      </MainView>
    </>
  );
};

export default NavBar;

const MainView = styled.View`
  width: 100%;
  height: ${(props) => (props.isLandscape ? 60 : 70)}px;
  /* align-items: center; */
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  background-color: white;
`;

const ButtonsView = styled.TouchableOpacity`
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items:center;

`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.selected ? '#1da1f2' : 'lightblue')};
`;

const SwitchView = styled.View`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction:row;
  align-items: center;
  justify-content: center;

`;

const SwitchTitle = styled.Text`
  font-size: 16px;
  color: #81b0ff;
  font-weight: bold;
`;
