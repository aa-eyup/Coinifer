import axios from 'axios'
const CoinGecko = require('coingecko-api')
const CoinGeckoClient = new CoinGecko()

// action type
const GET_SPIDERCHART_DATA = 'GET_SPIDERCHART_DATA'

// action creator
const getSpiderChartData = data => {
  return {
    type: GET_SPIDERCHART_DATA,
    data
  }
}

// thunk
export const fetchSpiderChartData = (symbol, id) => {
  return async dispatch => {
    try {
      const messariData = (await axios.get(`/api/messariAPI/coins/${symbol}`))
        .data
      const cgcData = (await axios.get(`/api/cgcAPI/coins/${id}`)).data
      // single from coingecko
      const data = {messariData, cgcData}
      dispatch(getSpiderChartData({symbol, data}))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    // add to spider obj use symbol as key
    case GET_SPIDERCHART_DATA:
      return {
        ...state,
        [action.data.symbol]: action.data.data
      }
    default:
      return state
  }
}
