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
const getCoinpaperData = data => {
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
      console.log(data)
      dispatch(getMessariData(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchCoinpaperData = () => {
  return async dispatch => {
    try {
      const data = (
        await axios.get('https://static.coinpaper.io/api/coins.json')
      ).data
      console.log(data)
      dispatch(getCoinpaperData(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchMessariSingleCoin = id => {
  console.log('fetch single')
  return async dispatch => {
    try {
      const data = (await axios.get(`/api/messariAPI/${id}`)).data
      dispatch(getMessariSingleCoin(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// reducer
const initialState = {
  messariData: [],
  messariSingleCoin: {},
  coinpaperData: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSARI_DATA:
      return {...state, messariData: action.data}
    case GET_TOP100_DATA:
      return {...state, coinpaperData: action.data}
    case GET_MESSARI_SINGLE:
      return {...state, messariSingleCoin: action.data}
    default:
      return state
  }
}
