import React from 'react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../state/actions';
import { Switch } from 'react-native';
import {useRoute} from '@react-navigation/native'



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
  const route = useRoute();
  console.log('route', route)

  return (
    <>
      <MainView isLandscape={props.isLandscape} isDark={isDark}>
        <ButtonsView>
          <ButtonText
            onPress={() => props.navigation.navigate('Main')}
            selected={route.name === 'Main'}
            isDark={isDark}>
            Home
          </ButtonText>
          <ButtonText
            onPress={() => {
              props.navigation.navigate('Favorites');
            }}
            selected={route.name === 'Favorites'}
            isDark={isDark}>
            Favorites
          </ButtonText>
        </ButtonsView>
        <DarkSwitchView>
          <SwitchTitle isDark={isDark}>☼</SwitchTitle>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={'#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => dispatch(Actions.setIsDark(!isDark))}
            value={isDark}
          />
          <SwitchTitle isDark={isDark}>☽</SwitchTitle>
        </DarkSwitchView>
        <SwitchView>
          <SwitchTitle isDark={isDark}>F°</SwitchTitle>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={'#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => dispatch(Actions.setIsCelsius(!isCelsius))}
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
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  background-color: ${(props) => (props.isDark ? 'grey' : 'white')};
`;

const ButtonsView = styled.TouchableOpacity`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => (props.isDark ? 'white' : '#81b0ff')};
  opacity:${(props) => (props.selected ? '1' : '0.6')};
`;

const SwitchView = styled.View`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const DarkSwitchView = styled.View`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

`;

const SwitchTitle = styled.Text`
  font-size: 14px;
  color: ${(props) => (props.isDark ? 'white' : '#81b0ff')};
  font-weight: bold;
`;
