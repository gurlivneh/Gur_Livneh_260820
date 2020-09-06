
const BASE_URL = 'http://dataservice.accuweather.com/'
const API_KEY = '?apikey=jtYJchNuz2UpXkPs8GPK8q5FnGL6aPOa'
const CURRENT = 'currentconditions/v1/'
const FORECAST = 'forecasts/v1/daily/5day/'
const CITY_AUTO_COMPLETE = 'locations/v1/cities/autocomplete'
import axios from "axios";


const _request = (type, query) => {

  return new Promise((resolve, reject) => {
         axios.get(BASE_URL + type + API_KEY + query).then(response => {
          resolve(response.data)

        })
        .catch(error => {
            resolve({Code:"error", Message:error.response.data.Message})

        })
    
  })
} 


export const getAutoSearch = (keyword) => {
    return _request(CITY_AUTO_COMPLETE,  `&q=${keyword}`)
}

export const getBylocationKey = (locationKey) => {
    let type = CURRENT + locationKey
    return _request(type, "")
}

export const getForecastBylocationKey = (locationKey) => {
    let type = FORECAST + locationKey
    return _request(type, "")
}

export const getMockTlvCurrent = () => {
    
    return new Promise((resolve, reject) => {
        resolve(mockData)
    })

}
