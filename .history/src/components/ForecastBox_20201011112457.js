import React , {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import * as Images from '../images/index'
import {useDispatch, useSelector} from 'react-redux';
import { ActionSheetIOS } from 'react-native';
const DEFUALT_LOCATION_KEY = '215854';
const DEFUALT_CITY = 'Tel Aviv';


const ForecastBox = (props) => {

  const [forecast, setForecast] = useState();
  const locationKey = useSelector(
    (state) => state.reducer.locationKey,
    () => {},
  );

  // let date = props.item.Date.split("T")
  // const [iconDayImage, setIconDayImage] = useState();
  // const [iconNightImage, setIconNightImage] = useState();
  // const weatherDayIcon = props.item.Day.Icon
  // const weatherNightIcon = props.item.Night.Icon


  useEffect(() => {
    dispatch(Actions.getForecast(locationKey, setForecast))
    // Images.iconsArray.forEach((item => {
    //   if (item.code === weatherDayIcon) {
    //     setIconDayImage(item.path)
    //   }
    //   if (item.code === weatherNightIcon) {
    //     setIconNightImage(item.path)
    //   }
    // }))
  },[]);

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
        <Logo source={iconDayImage} />
        <ForecastText>
          {props.item.Temperature.Minimum.Value + props.item.Temperature.Minimum.Unit}
        </ForecastText>
        <ForecastText>{props.item.Night.IconPhrase}</ForecastText>
        <Logo source={iconNightImage} />
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