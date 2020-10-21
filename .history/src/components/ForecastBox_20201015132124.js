import React , {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import * as Images from '../images/index'


const ForecastBox = (props) => {
  let date = props.item.Date.split("T")

  const weatherDayIcon = props.item.Day.Icon < 10 ? "0" + props.item.Day.Icon : props.item.Day.Icon
  const weatherDayIcon = props.item.Night.Icon < 10 ? "0"+props.item.Night.Icon : props.item.Night.Icon


  // useEffect(() => {
  //   Images.iconsArray.forEach((item => {
  //     if (item.code === weatherDayIcon) {
  //       setIconDayImage(item.path)
  //     }
  //     if (item.code === weatherNightIcon) {
  //       setIconNightImage(item.path)
  //     }
  //   }))
  // },[weatherDayIcon, weatherNightIcon]);

  return (
    <>
      <MainView
        height={props.height}
        width={props.width}
        isLandscape={props.isLandscape}>
      <ForecastText>{date[0]}</ForecastText>
        <ForecastText>
          {props.item.Temperature.Maximum.Value + props.item.Temperature.Maximum.Unit}
        </ForecastText>
        <ForecastText>{props.item.Day.IconPhrase}</ForecastText>
        <Logo
          source={{ uri: `https://developer.accuweather.com/sites/default/files/${weatherIcon}-s.png` }}
        style={{width: 75, height: 75}} />
        <ForecastText>
          {props.item.Temperature.Minimum.Value + props.item.Temperature.Minimum.Unit}
        </ForecastText>
        <ForecastText>{props.item.Night.IconPhrase}</ForecastText>
        <Logo
          source={{ uri: `https://developer.accuweather.com/sites/default/files/${weatherIcon}-s.png` }}
        style={{width: 75, height: 75}} />
      </MainView>
    </>
  );
};

export default ForecastBox;


 const MainView = styled.View`
  min-width: ${props => props.width}px;
  height: ${props => props.height}px;
  width:auto;
  align-items: center;
  justify-content:center;
  background-color: white;
  display: flex;
  padding:10px;
  border-radius: 10px;
  elevation: 5;
  margin-bottom:20px;


`;

 const ForecastText = styled.Text`
  font-size: 12px;
  text-align:center;
`;

const Logo = styled.Image`

`;