import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import * as Images from '../images/index';

const CurrentBox = (props) => {
  const [iconImage, setIconImage] = useState();
  const weatherIcon = props.currentWeather.WeatherIcon;

  useEffect(() => {
    Images.iconsArray.forEach((item) => {
      if (item.code === weatherIcon) {
        setIconImage(item.path);
      }
    });
  }, [weatherIcon]);
  return (
    <>
      <MainView
        isLandscape={props.isLandscape}
        IsDayTime={props.currentWeather.IsDayTime}>
        <CurrentText>{props.city}</CurrentText>
        <CurrentText>{props.currentWeather.WeatherText}</CurrentText>
        <CurrentText>
          {props.currentWeather.Temperature.Imperial.Value +
            props.currentWeather.Temperature.Imperial.Unit}
        </CurrentText>
        <Logo source={iconImage} />
      </MainView>
    </>
  );
};

export default CurrentBox;

const MainView = styled.View`
  width: ${(props) => (props.isLandscape ? 15 : 95)}%;
  height: ${(props) => (props.isLandscape ? 80 : 55)}%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.IsDayTime ? 'white' : '#D3D3D3')};
  display: flex;
  elevation: 5;
  border-radius: 7px;
  margin: 10px;
`;

const CurrentText = styled.Text`
  font-size: 18px;
`;

const Logo = styled.Image`
  margin: 5px;
`;