import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import * as Actions from '../state/actions';
import {useDispatch, useSelector} from 'react-redux';

const FavoritesBox = (props) => {
  const dispatch = useDispatch();
  const [favoriteCurrentWeather, setFavoriteCurrentWeather] = useState();


  useEffect(() => {
    dispatch(
      Actions.getFavoriteCurrentWeather(
        props.locationKey,
        setFavoriteCurrentWeather,
      ),
    );
  }, []);
  return (
    <MainView
      height={props.height}
      width={props.width}
      onPress={() => {
        props.selectCity(props.locationKey, props.city);
        props.navigation.navigate('Main');
      }}>
      <CurrentText>{props.city}</CurrentText>
      {favoriteCurrentWeather && (
        <CurrentText>{favoriteCurrentWeather.WeatherText}</CurrentText>
      )}
      {favoriteCurrentWeather && (
        <CurrentText>
          { true ? Math.floor((favoriteCurrentWeather.Temperature.Imperial.Value-32) * 5/9) + "C" : favoriteCurrentWeather.Temperature.Imperial.Value + "F"}
        </CurrentText>
      )}
      {favoriteCurrentWeather && (
        <Logo
          source={{
            uri: `https://developer.accuweather.com/sites/default/files/${
              favoriteCurrentWeather.WeatherIcon < 10
                ? '0' + favoriteCurrentWeather.WeatherIcon
                : favoriteCurrentWeather.WeatherIcon
            }-s.png`,
          }}
          style={{width:  props.width*0.35, height:  props.width*0.35}}
        />
      )}
    </MainView>
  );
};

export default FavoritesBox;

const MainView = styled.TouchableOpacity`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (true ? 'white' : '#D3D3D3')};
  display: flex;
  elevation: 5;
  border-radius: 7px;
  margin: 10px;
  padding: 10px;
`;

const CurrentText = styled.Text`
  font-size: 14px;
  text-align: center;
`;

const Logo = styled.Image`
  margin: 5px;
`;
