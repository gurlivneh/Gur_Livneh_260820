const defaultState = {
  favorites: [],
  currentWeather: null,
  forecast: null,
  city: null,
  locationKey: null,
  error:null
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

      case 'SET_FAVORITES':

      return Object.assign({}, state, {
        favorites: action.favorites,
      });

    case 'SET_CURRENT_WEATHER':
      return Object.assign({}, state, {
        currentWeather: action.currentWeather,
      });

    case 'SET_FORECAST':
      return Object.assign({}, state, {
        forecast: action.forecast,
      });
    case 'SET_CITY':
      return Object.assign({}, state, {
        city: action.city,
      });
    case 'SET_LOCATION_KEY':
      return Object.assign({}, state, {
        locationKey: action.locationKey,
      });
      case 'SET_ERROR':
        return Object.assign({}, state, {
          error: action.error,
        });

    default:
      return state;
  }
};

export default reducer;
