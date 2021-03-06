import axios from 'axios'

// action type
const GET_MESSARI_DATA = 'GET_MESSARI_DATA'
const GET_TOP100_DATA = 'GET_TOP100_COINPAPER'
const GET_MESSARI_SINGLE = 'GET_MESSARI_SINGLE'

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
const getMessariSingleCoin = data => {
  return {
    type: GET_MESSARI_SINGLE,
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
export const fetchTopOneHundred = () => {
  return async dispatch => {
    try {
      // CoinGecko
      const data = (await axios.get('/api/cgcAPI/coins')).data
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
export const fetchMessariSingleCoin = id => {
  return async dispatch => {
    try {
      const data = await axios.get(`/api/messariAPI/coins/${id}`)
      dispatch(getMessariSingleCoin(data.data))
    } catch (error) {
      console.log(error)
    }
  }
}

// reducer
const initialState = {
  messariAllCoinsData: [],
  messariSingleCoin: {},
  topOneHundred: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSARI_DATA:
      return {...state, messariAllCoinsData: action.data}
    case GET_TOP100_DATA:
      return {...state, topOneHundred: action.data}
    case GET_MESSARI_SINGLE:
      return {...state, messariSingleCoin: action.data}
    default:
      return state
  }
}
