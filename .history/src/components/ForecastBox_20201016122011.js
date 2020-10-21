import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';

const ForecastBox = (props) => {
  const date = props.item.Date.split('T');
  const weatherDayIcon =
    props.item.Day.Icon < 10 ? '0' + props.item.Day.Icon : props.item.Day.Icon;
  const weatherNightIcon =
    props.item.Night.Icon < 10
      ? '0' + props.item.Night.Icon
      : props.item.Night.Icon;
  const temperatureMax = true ? Math.floor((props.item.Temperature.Maximum.Value - 32) * 5 / 9) + "C" : props.item.Temperature.Maximum.Value + "F"
  const temperatureMin = true ? Math.floor((props.item.Temperature.Minimum.Value - 32) * 5/9) + "C" : props.item.Temperature.Minimum.Value  + "F"



  return (
    <>
      <MainView
        height={props.height}
        width={props.width}
        isLandscape={props.isLandscape}>
        <ForecastText>{date[0]}</ForecastText>
        <ForecastText>
          {temperatureMax}
        </ForecastText>
        <ForecastText>{props.item.Day.IconPhrase}</ForecastText>
        <Logo
          source={{
            uri: `https://developer.accuweather.com/sites/default/files/${weatherDayIcon}-s.png`,
          }}
          style={{width: props.width*0.3, height:  props.width*0.3}}
        />
        <ForecastText>
          {temperatureMin}
        </ForecastText>
        <ForecastText>{props.item.Night.IconPhrase}</ForecastText>
        <Logo
          source={{
            uri: `https://developer.accuweather.com/sites/default/files/${weatherNightIcon}-s.png`,
          }}
          style={{width: props.width*0.3, height:  props.width*0.3}}
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
  background-color: white;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  elevation: 5;
  margin-bottom: 20px;
`;

const ForecastText = styled.Text`
  font-size: 12px;
  text-align: center;
`;

const Logo = styled.Image``;
