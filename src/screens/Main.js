import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import styled from 'styled-components/native';
import * as Actions from '../state/actions';
import Autocomplete from 'react-native-autocomplete-input';
import * as MockData from '../mockData/mockData';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import ForecastBox from '../components/ForecastBox';
import CurrentBox from '../components/CurrentBox';
const isMock = true;
const DEFUALT_LOCATION_KEY = '215854';
const DEFUALT_CITY = 'Tel Aviv';
const Main = () => {
  const [keyword, setKeyword] = useState();
  const [autoCompleteRes, setAutoCompleteRes] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [height, setHeight] = useState(Dimensions.get('window').height);
  const [width, setWidth] = useState(Dimensions.get('window').width);
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

  const handleTextChange = (text) => {
    setKeyword(text);
    if (isMock) {
      if (text.length > 0) {
        setAutoCompleteRes(MockData.autocompleteKeyLocationRes);
      } else {
        setAutoCompleteRes([]);
      }
    } else {
      if (text.length > 0) {
        dispatch(Actions.getAutoComplete()).then((res) => {
          if (res.Code) {
            dispatch(Actions.setError(res.Message));
          } else {
            setAutoCompleteRes(res);
          }
        });
      } else {
        setAutoCompleteRes([]);
      }
    }
  };

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

  const selectCity = (key, city) => {
    setIsFavorite(false);
    if (favorites.length > 0) {
      favorites.forEach((item, i) => {
        if (item.locationKey === key) {
          setIsFavorite(true);
          return;
        }
      });
    }
    dispatch(Actions.sendCitySelection(key, city));
  };

  useEffect(() => {
    if (!currentWeather || !forecast) {
      dispatch(Actions.sendCitySelection(DEFUALT_LOCATION_KEY, DEFUALT_CITY));
    }
    AsyncStorage.getItem('favorites').then((res) => {
      dispatch(Actions.setFavorites(JSON.parse(res)));
    });
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
        <MainView>
          <Modal visible={error ? true : false} transparent={true}>
            <ModalView>
              <ModalBox>
                <ModalText onPress={() => dispatch(Actions.setError(null))}>
                  X
                </ModalText>
                <ModalTitle>
                  <ModalText>{error}</ModalText>
                </ModalTitle>
              </ModalBox>
            </ModalView>
          </Modal>
          <SearchView>
            <MyAutoComplete
              data={autoCompleteRes}
              defaultValue={keyword}
              placeholder="city"
              listContainerStyle={{height: 70}}
              onChangeText={(text) => handleTextChange(text)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    setAutoCompleteRes([]);
                    setKeyword(item.LocalizedName);
                    selectCity(item.Key, item.LocalizedName);
                  }}>
                  <Text>{item.LocalizedName}</Text>
                </TouchableOpacity>
              )}
            />
          </SearchView>
          {currentWeather && forecast && (
            <WeatherView>
              <FavoriteButton
                onPress={handleFavoritesButton}
                isFavorite={isFavorite}>
                <Text>{!isFavorite ? 'save' : 'delete'}</Text>
              </FavoriteButton>
              <WeatherRow>
                <CurrentBox
                  height={height}
                  width={width}
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
        </MainView>
      </SafeAreaView>
    </>
  );
};

export default Main;

export const MainView = styled.View`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const ModalBox = styled.View`
  width: 80%;
  height: 40%;
  background-color: white;
  border-radius: 7px;
  display: flex;
  padding: 10px;
  elevation: 10;
`;

export const ModalView = styled.View`
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;
  background-color: red;
`;

export const ModalText = styled.Text`
  font-size: 20px;
`;

export const ModalTitle = styled.View`
  font-size: 20px;
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FavoriteButton = styled.TouchableOpacity`
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

export const WeatherView = styled.View`
  width: 100%;
  display: flex;
  height: 75%;
`;

export const WeatherRow = styled.View`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: row;
  padding: 10px;
  flex-wrap: wrap;
`;
export const SearchView = styled.View`
  width: 60%;
  flex-direction: row;
  padding: 10px;
  max-height: 20%;
`;
export const MyAutoComplete = styled(Autocomplete)`
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: lightskyblue;
  display: flex;
`;
