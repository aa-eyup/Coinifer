import axios from 'axios'

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

      let name = id ? id : messariData.slug
      const cgcData = (await axios.get(`/api/cgcAPI/coins/${name}`)).data
      const data = {messariData, cgcData}
      dispatch(getSpiderChartData({symbol, data}))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {}

export default function(state = initialState, action) {
  const data = action.data ? action.data.data : ''
  switch (action.type) {
    // add to spider obj use symbol as key
    case GET_SPIDERCHART_DATA:
      if (!state[action.data.symbol]) {
        return {
          ...state,
          [action.data.symbol]: {
            slug: data.messariData.slug,
            nvtScore: data.messariData.nvtScore,
            sharpeRatioObj: data.messariData.sharpeRatio,
            retentionScore: data.messariData.retentionScore,
            liquidityScore: data.cgcData.liquidityScore,
            communityScore: data.cgcData.communityScore,
            developmentScore: data.cgcData.developerScore
          }
        }
      } else {
        return state
      }
    default:
      return state
  }
}
