import axios from 'axios'

// action type
const GET_MESSARI_DATA = 'GET_MESSARI_DATA'
const GET_TOP100_DATA = 'GET_TOP100_COINPAPER'
const GET_SINGLE_COIN = 'GET_SINGLE_COIN'
const GET_MESSARI_PROFILE = 'GET_MESSARI_PROFILE'

// action creator
const getMessariData = data => {
  return {
    type: GET_MESSARI_DATA,
    data
  }
}
const getTopOneHundred = data => {
  return {
    type: GET_TOP100_DATA,
    data
  }
}
const getSingleCoin = data => {
  return {
    type: GET_SINGLE_COIN,
    data
  }
}
const getMessariProfile = data => {
  return {
    type: GET_MESSARI_PROFILE,
    data
  }
}

// thunk
export const fetchMessariData = () => {
  return async dispatch => {
    try {
      const data = (await axios.get('/api/messariAPI')).data
      dispatch(getMessariData(data))
    } catch (error) {
      console.log(error)
    }
  }
}
export const fetchTopOneHundred = pageNumber => {
  return async dispatch => {
    try {
      // CoinGecko
      const data = (await axios.get(`/api/cgcAPI/coins/page/${pageNumber}`))
        .data
      /*
      // all 6k+ coins from CGC
          const data = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price'
      )
      */
      // coinpaper api send lighter load
      dispatch(getTopOneHundred(data))
    } catch (error) {
      console.log(error)
    }
  }
}
export const fetchSingleCoin = id => {
  return async dispatch => {
    try {
      const data = (await axios.get(`/api/messariAPI/coins/${id}`)).data
      dispatch(getSingleCoin(data))
    } catch (error) {
      console.log(error)
    }
  }
}
export const fetchMessariProfile = id => {
  return async dispatch => {
    try {
      const data = (await axios.get(`/api/messariAPI/coins/${id}/profile`)).data
      dispatch(getMessariProfile(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// reducer
const initialState = {
  messariAllCoinsData: [],
  messariProfile: {},
  singleCoin: {},
  topOneHundred: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSARI_DATA:
      return {...state, messariAllCoinsData: action.data}
    case GET_TOP100_DATA:
      return {...state, topOneHundred: action.data}
    case GET_SINGLE_COIN:
      return {...state, singleCoin: action.data}
    case GET_MESSARI_PROFILE:
      return {...state, messariProfile: action.data}
    default:
      return state
  }
}
