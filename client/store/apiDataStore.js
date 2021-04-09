import axios from 'axios';

// action type
const GET_MESSARI_DATA = 'GET_MESSARI_DATA';
const GET_TOP100_DATA = 'GET_TOP100_COINPAPER';
const GET_MARKETCAP_PAGE = 'GET_MARKETCAP_PAGE';
const GET_SINGLE_COIN = 'GET_SINGLE_COIN';
const GET_PROFILE = 'GET_PROFILE';
const GET_TRENDING = 'GET_TRENDING';

// action creator
const getMessariData = data => {
  return {
    type: GET_MESSARI_DATA,
    data
  };
};
const getTopOneHundred = (pageNumber, data) => {
  return {
    type: GET_TOP100_DATA,
    pageNumber,
    data
  };
};
const getSingleCoin = data => {
  return {
    type: GET_SINGLE_COIN,
    data
  };
};
const getProfile = data => {
  return {
    type: GET_PROFILE,
    data
  };
};
const getTrending = data => {
  return {
    type: GET_TRENDING,
    data
  };
};
const getMarketCapPage = pageNumber => {
  return {
    type: GET_MARKETCAP_PAGE,
    pageNumber
  };
};
// thunk
export const fetchTopOneHundred = pageNumber => {
  return async dispatch => {
    try {
      // CoinGecko
      const data = (await axios.get(`/api/cgcAPI/coins/page/${pageNumber}`))
        .data;
      await dispatch(getTopOneHundred(pageNumber, data));
      dispatch(getMarketCapPage(pageNumber));
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchMarketCapPage = pageNumber => {
  return async (dispatch, getState) => {
    const {topOneHundred} = getState().apiData;
    if (topOneHundred[pageNumber]) {
      dispatch(getMarketCapPage(pageNumber));
    } else {
      await dispatch(fetchTopOneHundred(pageNumber));
    }
  };
};
export const fetchMessariData = () => {
  return async dispatch => {
    try {
      const data = (await axios.get('/api/messariAPI')).data;
      dispatch(getMessariData(data));
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchSingleCoin = id => {
  return async dispatch => {
    try {
      const data = (await axios.get(`/api/messariAPI/coins/${id}`)).data;
      dispatch(getSingleCoin(data));
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchProfile = id => {
  return async dispatch => {
    try {
      const data = (await axios.get(`/api/messariAPI/coins/${id}/profile`))
        .data;
      // integrate cgc single asset data (need to pass in asset name vs. symbol for messari)
      dispatch(getProfile(data));
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchTrending = () => {
  return async dispatch => {
    try {
      const data = (await axios.get('/api/cgcAPI/trending')).data;
      dispatch(getTrending(data));
    } catch (error) {
      console.log(error);
    }
  };
};

// reducer
const initialState = {
  messariAllCoinsData: [],
  messariProfile: {},
  singleCoin: {},
  topOneHundred: {},
  marketCapPage: [],
  trending: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSARI_DATA:
      return {...state, messariAllCoinsData: action.data};
    case GET_TOP100_DATA:
      return {
        ...state,
        topOneHundred: {
          ...state.topOneHundred,
          [action.pageNumber]: action.data
        }
      };
    case GET_MARKETCAP_PAGE:
      return {...state, marketCapPage: state.topOneHundred[action.pageNumber]};
    case GET_SINGLE_COIN:
      return {...state, singleCoin: action.data};
    case GET_PROFILE:
      return {...state, profile: action.data};
    case GET_TRENDING:
      return {...state, trending: action.data};
    default:
      return state;
  }
}
