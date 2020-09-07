import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, Dimensions, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../state/actions';
import AsyncStorage from '@react-native-community/async-storage';

const Favorites = (props) => {
  const [height, setHeight] = useState(Dimensions.get('window').height);
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state) => state.reducer.favorites,
    () => {},
  );
  const selectCity = (locationKey, city) => {
    dispatch(Actions.sendCitySelection(locationKey, city));
  };
  useEffect(() => {
    try {
      AsyncStorage.getItem('favorites').then((res) => {
        dispatch(Actions.setFavorites(JSON.parse(res)));
      });
    } catch (e) {
      alert('Failed to get the data');
    }
    const handleChange = () => {
      setWidth(Dimensions.get('window').width);
      setHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', handleChange);

    return () => {
      Dimensions.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <>
      <SafeAreaView>
        <MainView height={height} width={width}>
          {favorites && (
            <ScrollView>
              <WeatherRow>
                {favorites.map((item, i) => {
                  return (
                    <FavoriteBox
                      height={height}
                      width={width}
                      key={i}
                      onPress={() => {
                        selectCity(item.locationKey, item.city);
                        props.handleNav('Home');
                      }}>
                      <Text>{item.city}</Text>
                      <Text>{item.currentWeather.WeatherText}</Text>
                      <Text>
                        {item.currentWeather.Temperature.Imperial.Value +
                          item.currentWeather.Temperature.Imperial.Unit}
                      </Text>
                    </FavoriteBox>
                  );
                })}
              </WeatherRow>
            </ScrollView>
          )}
        </MainView>
      </SafeAreaView>
    </>
  );
};

export default Favorites;

const MainView = styled.View`
  background-color: whitesmoke;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

const WeatherRow = styled.View`
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

const FavoriteBox = styled.TouchableOpacity`
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 30;
      margin: 2;
      border-color: '#2a4944';
      border-width: 1;
      background-color: #d2f7f1;
      `
