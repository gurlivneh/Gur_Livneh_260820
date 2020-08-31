import * as Requests from '../services/Requests';
import * as MockData from '../mockData/mockData';
import AsyncStorage from '@react-native-community/async-storage';
const isMock = false;

export const page = (page) => {
  return {
    type: 'SET_PAGE',
    page,
  };
};
export const setFavorites = (favorites) => {
  return {
    type: 'SET_FAVORITES',
    favorites,
  };
};

export const currentWeather = (currentWeather) => {
  return {
    type: 'SET_CURRENT_WEATHER',
    currentWeather,
  };
};

export const forecast = (forecast) => {
  return {
    type: 'SET_FORECAST',
    forecast,
  };
};

export const setCity = (city) => {
  return {
    type: 'SET_CITY',
    city,
  };
};

export const setError = (error) => {
  return {
    type: 'SET_ERROR',
    error,
  };
};

export const setLocationKey = (locationKey) => {
  return {
    type: 'SET_LOCATION_KEY',
    locationKey,
  };
};

export const sendCitySelection = (locationKey, city) => {
  return (dispatch, getState) => {
    if (isMock) {
      dispatch(currentWeather(MockData.current[0]));
      dispatch(forecast(MockData.forecast));
      dispatch(setCity(city));
      dispatch(setLocationKey(locationKey));
    } else {
      dispatch(setCity(city));
      dispatch(setLocationKey(locationKey));
      Requests.getBylocationKey(locationKey).then((res) => {
        if (res.Code) {
           dispatch(setError(res.Message));
        } else {
          dispatch(currentWeather(res[0]));
        }
      });
      Requests.getForecastBylocationKey(locationKey).then((res) => {
        if (res.Code) {
           dispatch(setError(res.Message));
        } else {
          dispatch(forecast(res));
        }
      });
    }
  };
};

export const addFavorite = (favorite) => {
  return (dispatch, getState) => {
    const {reducer} = getState();
    let newfavorites = [];
    if (reducer.favorites) {
      newfavorites = reducer.favorites;
    }
    newfavorites.push(favorite);
    dispatch(setFavorites(newfavorites));
    const jsonValue = JSON.stringify(newfavorites);
    AsyncStorage.setItem('favorites', jsonValue);
  };
};

export const removeFavorite = (favorite) => {
  return (dispatch, getState) => {
    const {reducer} = getState();
    let newfavorites = reducer.favorites;
    newfavorites.forEach((item, i) => {
      if (item.locationKey === favorite.locationKey) {
        newfavorites.splice(i, 1);
      }
    });
    dispatch(setFavorites(newfavorites));
    const jsonValue = JSON.stringify(newfavorites);
    AsyncStorage.setItem('favorites', jsonValue);
  };
};

export const getAutoComplete = (text) => {
    return new Promise((resolve) => {
      Requests.getAutoSearch(text).then((res) => {
        resolve(res);
      });
    });
  
};
