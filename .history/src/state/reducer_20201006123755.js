const defaultState = {
  favorites: [],
  currentWeather: null,
  forecast: null,
  city: null,
  locationKey: null,
  error: null,
  isFavorite: false,
};



const reducer = (state = defaultState, action) => {

  switch (action.type) {
    case 'SET_FAVORITES':
      const newFavorites = [...state.favorites]
      return { 
        ...state, //copying the orignal state
        favorites: newFavorites, //reassingning todos to new array
       }

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
    case 'SET_IS_FAVORITE':
      return Object.assign({}, state, {
        isFavorite: action.isFavorite,
      });

    default:
      return state;
  }
};

export default reducer;
