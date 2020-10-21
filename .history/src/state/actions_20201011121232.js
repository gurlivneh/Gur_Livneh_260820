import * as Requests from '../services/Requests';
import * as MockData from '../mockData/mockData';
import AsyncStorage from '@react-native-community/async-storage';
import * as Images from '../images/index';

const isMock = true;

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

export const setIsFavorite = (isFavorite) => {
  return {
    type: 'SET_IS_FAVORITE',
    isFavorite,
  };
};

const setIconPath = (data) => {
  Images.iconsArray.forEach((item) => {
    if (item.code === data.weatherIcon) {
      data.iconPath = item.path;
      return data
    }
  });
}

export const checkIsFavorite = (locationKey) => {
  return (dispatch, getState) => {
    const {reducer} = getState();
    dispatch(setIsFavorite(false));
    reducer.favorites.forEach((item) => {
      if (item.locationKey === locationKey) {
        dispatch(setIsFavorite(true));
        return;
      }
    });
  };
};

export const getFavoriteCurrentWeather = (
  locationKey,
  setFavoriteCurrentWeather,
) => {
  return (dispatch, getState) => {
    Requests.getBylocationKey(locationKey).then((res) => {
      if (res.Code) {
        dispatch(setError(res.Message));
      } else {
        Images.iconsArray.forEach((item) => {
          if (item.code === res[0].WeatherIcon) {
            res[0].iconPath = item.path;
            return;
          }
        });
        setFavoriteCurrentWeather(res[0]);
      }
    });
  };
};

export const getCurrentWeather = (locationKey, setCurrentWeather) => {
  return (dispatch, getState) => {
    if (isMock) {
      let currentWeather = setIconPath(MockData.current[0])
      setCurrentWeather(currentWeather);
    } else {
      Requests.getBylocationKey(locationKey).then((res) => {
        if (res.Code) {
          dispatch(setError(res.Message));
        } else {
          let currentWeather = setIconPath(res[0])
          setCurrentWeather(currentWeather);
        }
      });
    }
  };
};



export const getForecast = (locationKey, setForecast) => {
  if (isMock) {
    let forecast = setIconPath(MockData.forecast)
    setForecast(forecast);
  }
  Requests.getForecastBylocationKey(locationKey).then((res) => {
    if (res.Code) {
      dispatch(setError(res.Message));
    } else {
      let forecast = setIconPath(res)
      setForecast(forecast);
    }
  });
};

export const addFavorite = (favorite) => {
  return (dispatch, getState) => {
    const {reducer} = getState();
    let newfavorites = [];
    if (reducer.favorites) {
      newfavorites = reducer.favorites;
    }
    newfavorites.push(favorite);
    dispatch(setIsFavorite(true));
    dispatch(setFavorites(newfavorites));
    try {
      const jsonValue = JSON.stringify(newfavorites);
      AsyncStorage.setItem('favorites', jsonValue);
    } catch (e) {
      alert('Failed to get the data');
    }
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
    dispatch(setIsFavorite(false));
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
