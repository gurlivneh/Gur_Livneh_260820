import React from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import * as Images from '../images/index';




const CurrentBox = (props) => {
  const isCelsius = useSelector(
    (state) => state.reducer.isCelsius,
    () => {},
  );
  const isDark = useSelector(
    (state) => state.reducer.isDark,
    () => {},
  );
  const weatherIcon = props.currentWeather.WeatherIcon < 10 ? "0"+props.currentWeather.WeatherIcon : props.currentWeather.WeatherIcon
  const temperature = isCelsius ? Math.floor((props.currentWeather.Temperature.Imperial.Value-32) * 5/9) + "°C" : props.currentWeather.Temperature.Imperial.Value + "°F"
  return (
    
    <MainView
      height={props.height}
      width={props.width}
      isDark={isDark}
    >
        <CurrentText  isDark={isDark}>{props.city}</CurrentText>
        <CurrentText  isDark={isDark}>{props.currentWeather.WeatherText}</CurrentText>
        <CurrentText  isDark={isDark}>
          {temperature}
        </CurrentText>
      <Logo
        source={{ uri: `${Images.BASE_URL + weatherIcon}-s.png` }}
        style={{width: 75, height:  45}}
			/>
      </MainView>
  );
};

export default CurrentBox;

 const MainView = styled.View`
  width: ${(props) => (props.width)}px;
  height: ${(props) => (props.height)}px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isDark ? "grey" : "white" )};
  display: flex;
  elevation: 5;
  border-radius: 7px;
  
`;

 const CurrentText = styled.Text`
  font-size: 16px;

  text-align:center;
  color: ${(props) => (props.isDark ?  "white" : "black" )};
`;

const Logo = styled.Image`
  margin:5px;

`;

