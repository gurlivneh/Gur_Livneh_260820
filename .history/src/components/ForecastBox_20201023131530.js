import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import * as Images from '../images/index';

const ForecastBox = (props) => {
  const isCelsius = useSelector(
    (state) => state.reducer.isCelsius,
    () => {},
  );
  const isDark = useSelector(
    (state) => state.reducer.isDark,
    () => {},
  );
  const date = props.item.Date.split('T');
  const weatherDayIcon =
    props.item.Day.Icon < 10 ? '0' + props.item.Day.Icon : props.item.Day.Icon;
  const weatherNightIcon =
    props.item.Night.Icon < 10
      ? '0' + props.item.Night.Icon
      : props.item.Night.Icon;
  const temperatureMax = isCelsius
    ? Math.floor(((props.item.Temperature.Maximum.Value - 32) * 5) / 9) + '°C'
    : props.item.Temperature.Maximum.Value + '°F';
  const temperatureMin = isCelsius
    ? Math.floor(((props.item.Temperature.Minimum.Value - 32) * 5) / 9) + '°C'
    : props.item.Temperature.Minimum.Value + '°F';

  return (
    <>
      <MainView
        height={props.height}
        width={props.width}
        isLandscape={props.isLandscape}
        isDark={isDark}>
        <ForecastText isDark={isDark}>{date[0]}</ForecastText>
        <ForecastText isDark={isDark}>{temperatureMax}</ForecastText>
        <ForecastText isDark={isDark}>{props.item.Day.IconPhrase}</ForecastText>
        <Logo
          source={{
            uri: `https://developer.accuweather.com/sites/default/files/${weatherDayIcon}-s.png`,
          }}
          style={{width: 75, height: 45}}
        />
        <ForecastText isDark={isDark}>{temperatureMin}</ForecastText>
        <ForecastText isDark={isDark}>
          {props.item.Night.IconPhrase}
        </ForecastText>
        <Logo
          source={{
            uri: `https://developer.accuweather.com/sites/default/files/${weatherNightIcon}-s.png`,
          }}
          style={{width:75, height: 45}}
        />
      </MainView>
    </>
  );
};

export default ForecastBox;

const MainView = styled.View`
  min-width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  width: auto;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isDark ? 'grey' : 'white')};
  display: flex;
  border-radius: 10px;
  elevation: 5;
  margin-bottom: ${(props) => (props.isLandscape ? 5 : 10)}px;;
  margin-top: ${(props) => (props.isLandscape ? 0 : 10)}px;

`;

const ForecastText = styled.Text`
  font-size: 12px;
  text-align: center;
  color: ${(props) => (props.isDark ? 'white' : 'black')};
`;

const Logo = styled.Image``;
