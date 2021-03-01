import axios from 'axios'

// action type
const GET_MESSARI_DATA = 'GET_MESSARI_DATA'

// action creator
const getMessariData = data => {
  return {
    type: GET_MESSARI_DATA,
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

// reducer
const initialState = {
  messariData: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSARI_DATA:
      return {...state, messariData: action.data}
    default:
      return state
  }
}
