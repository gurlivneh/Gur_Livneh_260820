import React from 'react';
import styled from 'styled-components/native';
import * as Images from '../images/index'


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
        <Logo source={Images.SUNNY} />
      </MainView>
    </>
  );
};

export default CurrentBox;

 const MainView = styled.View`
  width: ${(props) => (props.width > props.height ? 15 : 95)}%;
  height: ${(props) => (props.width > props.height ? 50 : 60)}%;
  justify-content: center;
  align-items: center;
  background-color: white;
  display: flex;
  elevation: 5;
  border-radius: 7px;
`;

 const CurrentText = styled.Text`
  font-size: 18px;
`;

const Logo = styled.Image`
  width: 60px;
  height: 50px;
  margin:5px;
  background-color: #1da1f2;

`;

