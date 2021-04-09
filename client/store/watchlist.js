import axios from 'axios';

// action type
const ADD_TO_WATCHLIST = 'ADD_TO_WATCHLIST';
const REMOVE_FROM_WATCHLIST = 'REMOVE_FROM_WATCHLIST';
const GET_WATCHLIST = 'GET_WATCHLIST';

// action creator
const _addToWatchlist = data => {
  return {
    type: ADD_TO_WATCHLIST,
    data
  };
};
const _removeFromWatchlist = data => {
  return {
    type: REMOVE_FROM_WATCHLIST,
    data
  };
};
const getWatchlist = data => {
  return {
    type: GET_WATCHLIST,
    data
  };
};

// thunk
export const addToWatchlist = data => {
  return async dispatch => {
    try {
      await axios.post(`/api/watchlistAPI/users/${data.userId}`, data);
      dispatch(_addToWatchlist(data));
    } catch (error) {
      console.log(error);
    }
  };
};
export const removeFromWatchlist = data => {
  return async dispatch => {
    try {
      await axios.put(`/api/watchlistAPI/users/${data.userId}`, data);
      dispatch(_removeFromWatchlist(data));
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchWatchlist = userId => {
  return async dispatch => {
    try {
      const assets = (await axios.get(`/api/watchlistAPI/users/${userId}`))
        .data;
      // will transform name of prop when passing into coin cell
      // imageUrl -> thumb
      dispatch(getWatchlist(assets));
    } catch (error) {
      console.log(error);
    }
  };
};
// reducer
const initialState = {
  assets: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_WATCHLIST:
      return {...state, assets: action.data};
    case ADD_TO_WATCHLIST:
      return {
        ...state,
        assets: [
          ...state.assets,
          {
            assetName: action.data.assetName,
            assetSymbol: action.data.assetSymbol,
            thumb: action.data.imageUrl
          }
        ]
      };
    case REMOVE_FROM_WATCHLIST:
      return {
        ...state,
        assets: state.assets.filter(
          asset =>
            asset.assetName !== action.data.assetName &&
            asset.assetSymbol !== action.data.assetSymbol
        )
      };
    default:
      return state;
  }
}
