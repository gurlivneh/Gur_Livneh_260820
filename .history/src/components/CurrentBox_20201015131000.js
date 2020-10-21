import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import * as Images from '../images/index'


const CurrentBox = (props) => {
  const [iconImage, setIconImage] = useState();
  const weatherIcon = props.currentWeather.WeatherIcon

  useEffect(() => {
    console.log('weather icon', weatherIcon)
  },[weatherIcon]);
  return (
    
    <MainView
      height={props.height}
      width={props.width}
      IsDayTime={props.currentWeather.IsDayTime}
    >
        <CurrentText>{props.city}</CurrentText>
        <CurrentText>{props.currentWeather.WeatherText}</CurrentText>
        <CurrentText>
          {props.currentWeather.Temperature.Imperial.Value +
            props.currentWeather.Temperature.Imperial.Unit}
        </CurrentText>
        <Logo source={`https://developer.accuweather.com/sites/default/files/01-s.png`}
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
  background-color: ${(props) => (props.IsDayTime ? "white" : "#D3D3D3")};
  display: flex;
  elevation: 5;
  border-radius: 7px;
  margin:10px;
  padding:10px;
`;

 const CurrentText = styled.Text`
  font-size: 14px;
  text-align:center;
`;

const Logo = styled.Image`
  margin:5px;

`;

