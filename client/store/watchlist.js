import axios from 'axios'

// action type
const ADD_TO_WATCHLIST = 'ADD_TO_WATCHLIST'
const REMOVE_FROM_WATCHLIST = 'REMOVE_FROM_WATCHLIST'

// action creator
const _addToWatchlist = data => {
  return {
    type: ADD_TO_WATCHLIST,
    data
  }
}
const _removeFromWatchlist = data => {
  return {
    type: ADD_TO_WATCHLIST,
    data
  }
}
// thunk
export const addToWatchlist = data => {
  return async dispatch => {
    try {
      await axios.post(`/api/watchlistAPI/users/${data.userid}`, data)
      dispatch(_addToWatchlist(data))
    } catch (error) {
      console.log(error)
    }
  }
}
export const removeFromWatchlist = data => {
  return async dispatch => {
    try {
      await axios.delete(`/api/watchlistAPI/users/${data.userid}`, data)
      dispatch(_removeFromWatchlist(data))
    } catch (error) {
      console.log(error)
    }
  }
}
// reducer
const initialState = {
  assets: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_WATCHLIST:
      return {
        ...state,
        assets: [
          ...state.assets,
          {
            assetname: action.data.assetName,
            assetSymbol: action.data.assetSymbol
          }
        ]
      }
    case REMOVE_FROM_WATCHLIST:
      return {
        ...state,
        assets: state.assets.filter(
          asset =>
            asset.name !== action.data.assetName &&
            asset.symbol !== action.data.assetSymbol
        )
      }
    default:
      return state
  }
}
