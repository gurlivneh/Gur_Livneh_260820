import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, Dimensions, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import * as Actions from '../state/actions';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import ForecastBox from '../components/ForecastBox';
import CurrentBox from '../components/CurrentBox';
import SearchBox from '../components/SearchBox';
import MyModal from '../components/MyModal';
import NavBar from '../components/NavBar';

const DEFUALT_LOCATION_KEY = '215854';
const DEFUALT_CITY = 'Tel Aviv';

const Main = ({navigation}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [height, setHeight] = useState(Dimensions.get('window').height);
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const isLandscape = width > height ? true : false;

  const city = useSelector(
    (state) => state.reducer.city,
    () => {},
  );
  const currentWeather = useSelector(
    (state) => state.reducer.currentWeather,
    () => {},
  );
  const forecast = useSelector(
    (state) => state.reducer.forecast,
    () => {},
  );
  const locationKey = useSelector(
    (state) => state.reducer.locationKey,
    () => {},
  );

  const favorites = useSelector(
    (state) => state.reducer.favorites,
    () => {},
  );

  const error = useSelector(
    (state) => state.reducer.error,
    () => {},
  );

  const dispatch = useDispatch();

  const handleFavoritesButton = () => {
    if (!isFavorite) {
      dispatch(
        Actions.addFavorite({
          city: city,
          locationKey: locationKey,
          currentWeather: currentWeather,
        }),
      );
      setIsFavorite(true);
    } else {
      dispatch(
        Actions.removeFavorite({
          city: city,
          locationKey: locationKey,
          currentWeather: currentWeather,
        }),
      );
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    dispatch(Actions.sendCitySelection(DEFUALT_LOCATION_KEY, DEFUALT_CITY));
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

  useEffect(() => {
    if (favorites) {
      favorites.forEach((item, i) => {
        if (item.locationKey === locationKey) {
          setIsFavorite(true);
        }
      });
    }
  }, [favorites]);

  return (
    <>
      <SafeAreaView>
        <MainView height={height} width={width}>
          <NavBar navigation={navigation} />
          <SearchView height={height} width={width} isLandscape={isLandscape}>
            <SearchBox
              isFavorite={isFavorite}
              setIsFavorite={setIsFavorite}
              isLandscape={isLandscape}
              height={height}
              width={width}
            />
          </SearchView>
          {currentWeather && forecast && !error && (
            <WeatherView isLandscape={isLandscape}>
              <FavoriteButton
                onPress={handleFavoritesButton}
                isFavorite={isFavorite}>
                <Text>{!isFavorite ? 'save' : 'delete'}</Text>
              </FavoriteButton>
              <WeatherRow isLandscape={isLandscape}>
                <CurrentBox
                  height={isLandscape ? height * 0.40 : height * 0.20}
                  width={isLandscape ? width * 0.2 : width * 0.9}
                  city={city}
                  currentWeather={currentWeather}
                />
                {forecast.DailyForecasts.map((item, i) => {
                  return (
                    <ForecastBox
                      key={i}
                      item={item}
                      height={isLandscape ? height * 0.43 : height * 0.23}
                      width={isLandscape ? width * 0.13 : width * 0.30}
                    />
                  );
                })}
              </WeatherRow>
            </WeatherView>
          )}
          {error && <MyModal />}
          {!currentWeather && !forecast && !error && (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        </MainView>
      </SafeAreaView>
    </>
  );
};

export default Main;

const MainView = styled.View`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
`;

const FavoriteButton = styled.TouchableOpacity`
  width: 50px;
  height: 30px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (!props.isFavorite ? 'yellowgreen' : 'red')};
  display: flex;
  border-radius: 30px;
  elevation: 5;
  margin-left: 5px;
`;
const WeatherView = styled.View`
  width: 100%;
  display: flex;
  height: ${(props) => (props.isLandscape ? 60 : 85)}%;
  background-color:green;
`;
const WeatherRow = styled.View`
  width: 100%;
  height: ${(props) => (props.isLandscape ? 40 : 95)}%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;


const SearchView = styled.View`
  width: 100%;
  flex-direction: row;
  height: ${(props) => (props.isLandscape ? 23 : 15)}%;
  justify-content: center;
  align-items: center;
  background-color:red;
`;
