import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
const {height, width} = Dimensions.get('window');

const CurrentBox = (props) => {
  return (
    <>
      <MainView height={props.height} width={props.width}>
        <CurrentText>{props.city}</CurrentText>
        <CurrentText>{props.currentWeather.WeatherText}</CurrentText>
        <CurrentText>
          {props.currentWeather.Temperature.Imperial.Value +
            props.currentWeather.Temperature.Imperial.Unit}
        </CurrentText>
      </MainView>
    </>
  );
};

export default CurrentBox;

export const MainView = styled.View`
  width: ${(props) => (props.width > props.height ? 18 : 95)}%;
  height: ${(props) => (props.width > props.height ? 50 : 50)}%;
  justify-content: center;
  align-items: center;
  background-color: #1da1f2;
  display: flex;
  elevation: 20;
  border-radius: 7px;
`;

export const CurrentText = styled.Text`
  font-size: 24px;
`;
