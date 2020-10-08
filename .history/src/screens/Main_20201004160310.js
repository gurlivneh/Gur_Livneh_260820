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
          <SearchView height={height} width={width}>
            <SearchBox
              isFavorite={isFavorite}
              setIsFavorite={setIsFavorite}
              height={height}
              width={width}
            />
          </SearchView>
          {currentWeather && forecast && !error && (
            <WeatherView>
              <FavoriteButton
                onPress={handleFavoritesButton}
                isFavorite={isFavorite}>
                <Text>{!isFavorite ? 'save' : 'delete'}</Text>
              </FavoriteButton>
              <WeatherRow>
                <CurrentBox
                  height={height*0.5}
                  width={width*0.9}
                  city={city}
                  currentWeather={currentWeather}
                />
                {forecast.DailyForecasts.map((item, i) => {
                  return (
                    <ForecastBox
                      key={i}
                      item={item}
                      height={height}
                      width={width}
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
  height: 55%;
`;
const WeatherRow = styled.View`
  width: 100%;
  height: 55%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

`;

const ForecastRow = styled.View`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: row;
  padding: 10px;
`;
const SearchView = styled.View`
  width: 100%;
  flex-direction: row;
  height: ${(props) => (props.isLandscape ? 20 : 15)}%;
  justify-content: center;
  align-items: center;
`;
