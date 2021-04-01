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
      const vwap = (
        await axios.get(
          `/api/cryptocompareAPI/coins/${symbol.toUpperCase()}/long-term-vwap`
        )
      ).data.vwap
      const nvt = (
        await axios.get(
          `/api/cryptocompareAPI/coins/${symbol.toUpperCase()}/nvt`
        )
      ).data.nvt
      const data = {messariData, cgcData, vwap, nvt}
      dispatch(getSpiderChartData({symbol, data}))
    } catch (error) {
      console.log(error)
    }
  }
}

// helpper functions ------------------------------------
const vwapTransformation = (currentPrice, vwap) => {
  let pDelta = ((currentPrice - vwap) / currentPrice) * 100
  if (pDelta < 50) {
    return Math.max(0, 50 - pDelta)
  } else {
    return Math.min(50 + pDelta, 100)
  }
}
const nvtTransformation = nvt => {
  if (nvt === null) return null
  const upperThreshold = 150
  const lowerThreshold = 70
  const min = Math.min(upperThreshold, nvt)
  const score =
    ((upperThreshold - min) / (upperThreshold - lowerThreshold)) * 100
  return Math.min(score, 100)
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
            vwap: vwapTransformation(data.cgcData.currentPrice, data.vwap),
            nvtScore: nvtTransformation(data.nvt),
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
