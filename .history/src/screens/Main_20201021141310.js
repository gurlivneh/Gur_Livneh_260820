import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
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
import FavoriteButton from '../components/FavoriteButton';
import LocationButton from '../components/LocationButton';

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

  const error = useSelector(
    (state) => state.reducer.error,
    () => {},
  );

  const useGeoposition = useSelector(
    (state) => state.reducer.useGeoposition,
    () => {},
  );
  const isDark = useSelector(
    (state) => state.reducer.isDark,
    () => {},
  );

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      AsyncStorage.getItem('favorites').then((res) => {
        dispatch(Actions.setFavorites(JSON.parse(res)));
        if (!useGeoposition) {
          dispatch(
            Actions.sendCitySelection(DEFUALT_LOCATION_KEY, DEFUALT_CITY),
          );
        } else {
          dispatch(Actions.getLocation());
        }
      });
    } catch (e) {
      alert('Failed to get favorites data');
      if (!useGeoposition) {
        dispatch(Actions.sendCitySelection(DEFUALT_LOCATION_KEY, DEFUALT_CITY));
      } else {
        dispatch(Actions.getLocation());
      }
    }

    const handleChange = () => {
      setWidth(Dimensions.get('window').width);
      setHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', handleChange);

    return () => {
      Dimensions.removeEventListener('change', handleChange);
    };
  }, [useGeoposition]);

  return (
    <>
      <SafeAreaView>
        <MainView height={height} width={width} isDark={isDark}>
          <NavBar navigation={navigation} isLandscape={isLandscape} />
          <UpperView height={height} width={width} isLandscape={isLandscape}>
            <FavoriteButton isLandscape={isLandscape} />
            <SearchBox
              isLandscape={isLandscape}
              height={height}
              width={width}
            />
            <LocationButton isLandscape={isLandscape} />
          </UpperView>
          {currentWeather && forecast && !error && (
            <WeatherColumn isLandscape={isLandscape}>
              <CurrentBox
                height={isLandscape ? height * 0.45 : height * 0.25}
                width={isLandscape ? width * 0.25 : width * 0.9}
                city={city}
                currentWeather={currentWeather}
              />
              <ScrollView>
                <WeatherRow
                  height={height}
                  width={width}
                  isLandscape={isLandscape}>
                  {forecast.DailyForecasts.map((item, i) => {
                    return (
                      <ForecastBox
                        key={i}
                        item={item}
                        height={isLandscape ? height * 0.49 : height * 0.3}
                        width={isLandscape ? width * 0.2 : width * 0.4}
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
  background-color: ${(props) => (props.isDark ? 'lightgrey' : 'whitesmoke')};
`;

const WeatherRow = styled.View`
  width: 100%;
  min-height: ${(props) =>
    props.isLandscape ? props.height * 0.75 : props.height * 0.35}px;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: ${(props) =>
    props.isLandscape ? 'space-evenly' : 'space-evenly'};
  align-items: ${(props) => (props.isLandscape ? 'center' : 'center')};
  flex-wrap: wrap;
  margin-bottom: 10px;
  margin-top: ${(props) => (props.isLandscape ? 0 : 10)}px;
`;

const WeatherColumn = styled.View`
  width: 100%;
  height: ${(props) => (props.isLandscape ? 52 : 65)}%;
  display: flex;
  flex-direction: ${(props) => (props.isLandscape ? 'row' : 'column')};
  justify-content: center;
  align-items: center;
  /* background-color:red; */
`;

const UpperView = styled.View`
  width: 95%;
  flex-direction: row;
  height: ${(props) => (props.isLandscape ? 23 : 20)}%;
  justify-content: space-evenly;
  align-items: center;
  /* background-color:blue; */
`;
