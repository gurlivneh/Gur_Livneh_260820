import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../state/actions';
import AsyncStorage from '@react-native-community/async-storage';

const Favorites = (props) => {
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state) => state.reducer.favorites,
    () => {},
  );
  const selectCity = (locationKey, city) => {
    dispatch(Actions.sendCitySelection(locationKey, city));
  };
  useEffect(() => {
    AsyncStorage.getItem('favorites').then((res) => {
      console.log('async res', JSON.parse(res));
      dispatch(Actions.setFavorites(JSON.parse(res)));
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <MainView>
          {favorites && (
            <WeatherRow>
              {favorites.map((item, i) => {
                return (
                  <FavoriteBox
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
          )}
        </MainView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favorites;

export const MainView = styled.View`
  align-items: center;
  display: flex;
  background-color: whitesmoke;
`;

export const WeatherRow = styled.View`
  width: 100%;
  height: auto;
  min-height: 100%;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  padding: 5px;
  flex-wrap: wrap;
`;

export const FavoriteBox = styled.TouchableOpacity`
  width: 120px;
  height: 120px;
  justify-content: center;
  align-items: center;
  background-color: lightseagreen;
  display: flex;
  margin-bottom: 5px;
  border-radius: 20px;
  /* elevation:7; */
`;
