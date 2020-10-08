import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import * as Images from '../images/index'


const CurrentBox = (props) => {
  const [iconImage, setIconImage] = useState();
  const weatherIcon = props.currentWeather.WeatherIcon
  const iconsArray = [
    Images.CODE_1,
    Images.CODE_2,
    Images.CODE_3,
    Images.CODE_4,
    Images.CODE_5,
    Images.CODE_6,
    Images.CODE_7,
    Images.CODE_8,
    Images.CODE_11,
    Images.CODE_12,
    Images.CODE_13,    
    Images.CODE_14,
    Images.CODE_15,
    Images.CODE_16,
    Images.CODE_17,
]
  const setIcon = () => {
    console.log("weatherIcon", weatherIcon)
        //setIconImage(iconsArray[weatherIcon - 1])
  }

  //useEffect(() => {
    setIcon()
  //}, []);
  return (
    <>
      <MainView height={props.height} width={props.width}>
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
  width: ${(props) => (props.width > props.height ? 15 : 95)}%;
  height: ${(props) => (props.width > props.height ? 80 : 55)}%;
  justify-content: center;
  align-items: center;
  background-color: white;
  display: flex;
  elevation: 20;
  border-radius: 7px;
  margin:10px;
`;

 const CurrentText = styled.Text`
  font-size: 18px;
`;

const Logo = styled.Image`
  width: 50px;
  height: 50px;
  margin:5px;
  background-color: white;

`;

