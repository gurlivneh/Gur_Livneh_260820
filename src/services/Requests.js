
const BASE_URL = 'http://dataservice.accuweather.com/'
const API_KEY = '?apikey=jtYJchNuz2UpXkPs8GPK8q5FnGL6aPOa'
const CURRENT = 'currentconditions/v1/'
const FORECAST = 'forecasts/v1/daily/5day/'
const CITY_AUTO_COMPLETE = 'locations/v1/cities/autocomplete'





const _request = (type, method = 'GET', query) => {

  return new Promise((resolve, reject) => {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': '',
    }

    let body
   
      headers["Content-Type"] = "application/json"
      // body = JSON.stringify(data)
   
  

    console.log("Testing body: ", BASE_URL + type + API_KEY + query)
    

    
      fetch(BASE_URL + type + API_KEY + query, {
        method,
        headers,
      }).then(res => {
        return res.json()
      })
        .then(response => {
          console.log('res:', response)

          resolve(response)
        })
        .catch(error => {
          console.log("fetch error", error)
          reject(error)
        })
    
  })
} 


export const getAutoSearch = (keyword) => {
    console.log("search value", keyword)
    return _request(CITY_AUTO_COMPLETE, 'GET', `&q=${keyword}`)
}

export const getBylocationKey = (locationKey) => {
    console.log("key", locationKey)
    let type = CURRENT + locationKey
    return _request(type, 'GET',"")
}

export const getForecastBylocationKey = (locationKey) => {
    console.log("key", locationKey)
    let type = FORECAST + locationKey
    return _request(type, 'GET',"")
}

export const getMockTlvCurrent = () => {
    
    return new Promise((resolve, reject) => {
        resolve(mockData)
    })

}
