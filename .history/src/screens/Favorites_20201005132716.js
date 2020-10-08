import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, Dimensions, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../state/actions';
import AsyncStorage from '@react-native-community/async-storage';
import NavBar from '../components/NavBar'
import CurrentBox from '../components/CurrentBox'


const Favorites = ({navigation}) => {
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
    // dispatch(Actions.updateFavoriteCurrentWeather())
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
        <NavBar navigation={navigation}/>
          <ScrollView>
            {favorites && (
              <WeatherRow>
                {favorites.map((item, i) => {
                  return (
                    <CurrentBox
                    height={170}
                    width={170}
                    city={item.city}
                    currentWeather={item.currentWeather}
                    key={i}
                      onPress={() => {
                        // selectCity(item.locationKey, item.city);
                        navigation.navigate('Main');
                      }}/>
                  );
                })}
              </WeatherRow>
            )}
          </ScrollView>
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
  padding-bottom: 50px;


`;


const Logo = styled.Image`
  margin:5px;

`;


const WeatherRow = styled.View`
  width: 100%;
  display: flex;
  flex-direction:row;
  flex-wrap:wrap;
`;

const FavoriteBox = styled.TouchableOpacity`
  min-width: ${(props) => (props.width > props.height ? 80 : 100)}px;
  width: auto;
  height: ${(props) => (props.width > props.height ? 80 : 100)}px;
  justify-content: center;
  align-items: center;
  background-color: white;
  display: flex;
  margin: 10px;
  border-radius: 20px;
  elevation: 7;
  padding: 5px;
`;
