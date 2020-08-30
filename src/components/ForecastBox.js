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

const ForecastBox = (props) => {
    let date = props.item.Date.split("T")

  return (
    <>
      <MainView height={props.height} width={props.width}>
        <ForecastText>
          {props.item.Temperature.Maximum.Value + props.item.Temperature.Maximum.Unit}
        </ForecastText>
        <ForecastText>{props.item.Day.IconPhrase}</ForecastText>
        <ForecastText>{date[0]}</ForecastText>
      </MainView>
    </>
  );
};

export default ForecastBox;


export const MainView = styled.View`
  width: ${props => props.width > props.height ? 15 : 30}%;
  height: ${props => props.width > props.height ? 40 : 30}%;
  justify-content: center;
  align-items: center;
  background-color: lightseagreen;
  display: flex;
  margin: 5px;
  border-radius: 20px;
  elevation: 20;
`;

export const ForecastText = styled.Text`
  font-size: 16px;
`;