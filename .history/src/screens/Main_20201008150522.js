import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
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

  const isFavorite = useSelector(
    (state) => state.reducer.isFavorite,
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
        }),
      );
    } else {
      dispatch(
        Actions.removeFavorite({
          city: city,
          locationKey: locationKey,
        }),
      );
    }
  };

  useEffect(() => {
    try {
      AsyncStorage.getItem('favorites').then((res) => {
        dispatch(Actions.setFavorites(JSON.parse(res)));
        if (!locationKey) {
          dispatch(
            Actions.sendCitySelection(DEFUALT_LOCATION_KEY, DEFUALT_CITY),
          );
        }
      });
    } catch (e) {
      alert('Failed to get the data');
      dispatch(Actions.sendCitySelection(DEFUALT_LOCATION_KEY, DEFUALT_CITY));
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
          <NavBar navigation={navigation} />
          <UpperView height={height} width={width} isLandscape={isLandscape}>
            <UpperViewBox isLandscape={isLandscape}>
              <FavoriteButton
                onPress={handleFavoritesButton}
                isFavorite={isFavorite}>
                <Text>{!isFavorite ? 'save' : 'delete'}</Text>
              </FavoriteButton>
            </UpperViewBox>
              <SearchBox
                isFavorite={isFavorite}
                isLandscape={isLandscape}
                height={height}
                width={width}
              />
            <UpperViewBox></UpperViewBox>
          </UpperView>
          {currentWeather && forecast && !error && (
            <WeatherColumn isLandscape={isLandscape}>
              <CurrentBox
                height={isLandscape ? height * 0. : height * 0.23}
                width={isLandscape ? width * 0.25 : width * 0.90}
                city={city}
                currentWeather={currentWeather}
              />
              <ScrollView>
                <WeatherRow
                  height={height}
                  width={width}
                >
                  {forecast.DailyForecasts.map((item, i) => {
                    return (
                      <ForecastBox
                        key={i}
                        item={item}
                        height={isLandscape ? height * 0.45 : height * 0.24}
                        width={isLandscape ? width * 0.20 : width * 0.45}
                        isLandscape={isLandscape}
                      />
                    );
                  })}
                </WeatherRow>
              </ScrollView>
            </WeatherColumn>
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

const WeatherRow = styled.View`
  width: 100%;
  min-height: ${(props) => props.height*0.35}px;
  height:auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom:10px;
  background-color:red;
`;

const WeatherColumn = styled.View`
  width: 100%;
  height: ${(props) => (props.isLandscape ? 55 : 95)}%;
  display: flex;
  flex-direction: ${(props) => (props.isLandscape ? "row" : "column")};
  justify-content: center;
  align-items: center;
  padding:5px;
`;

const UpperView = styled.View`
  width: 100%;
  flex-direction: row;
  height: ${(props) => (props.isLandscape ? 25 : 17)}%;
  justify-content: space-between;
  align-items: center;
`;
const UpperViewBox = styled.View`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content:${(props) => (props.isLandscape ? "flex-start" : "flex-end")};
  padding:10px;
`;
