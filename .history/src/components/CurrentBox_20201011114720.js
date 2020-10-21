import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import * as Images from '../images/index'
import * as Actions from '../state/actions';
import {useDispatch, useSelector} from 'react-redux';
const DEFUALT_LOCATION_KEY = '215854';
const DEFUALT_CITY = 'Tel Aviv';

const CurrentBox = (props) => {
  const [currentWeather, setCurrentWeather] = useState();
  const [favoriteCurrentWeather, setFavoriteCurrentWeather] = useState();
  const locationKey = useSelector(
    (state) => state.reducer.locationKey,
    () => {},
  );


  // const weatherIcon = props.currentWeather.WeatherIcon

  useEffect(() => {
    dispatch(Actions.getCurrentWeather(props.locationKey, setCurrentWeather),);
    dispatch(Actions.getFavoriteCurrentWeather(props.locationKey, setFavoriteCurrentWeather))

    // Images.iconsArray.forEach((item => {
    //   if (item.code === weatherIcon) {
    //     setIconImage(item.path)
    //   }
    // }))
  },[]);
  return (
    
    <MainView
      height={props.height}
      width={props.width}
      IsDayTime={currentWeather.IsDayTime}
    >
        <CurrentText>{props.city}</CurrentText>
      {currentWeather && <CurrentText>{currentWeather.WeatherText}</CurrentText>}
      {currentWeather && <CurrentText>
        {currentWeather.Temperature.Imperial.Value +
          currentWeather.Temperature.Imperial.Unit}
      </CurrentText>}
      {currentWeather && <Logo source={currentWeather.iconPath} />}
      </MainView>
  );
};

export default CurrentBox;

 const MainView = styled.View`
  min-width: ${(props) => (props.width)}px;
  height: ${(props) => (props.height)}px;
  width:auto;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.IsDayTime ? "white" : "#D3D3D3")};
  display: flex;
  elevation: 5;
  border-radius: 7px;
  margin:5px;
  padding:10px;
`;

 const CurrentText = styled.Text`
  font-size: 18px;
  text-align:center;
  font-weight:bold;
`;

const Logo = styled.Image`
  margin:5px;

`;

