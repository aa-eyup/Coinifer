// SOME COINS FROM COINPAPER MAY NOT HAVE DATA FROM MESSARI
// (MESSAR DATA WILL BE USED FOR SINGLE VIEW)

import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchMessariProfile} from '../store/apiDataStore'
import {fetchSpiderChartData} from '../store/spiderChartStore'

class CryptoSingle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    // get id from props.match.params (should be coinpaper .symbol -> .toLowercase())
    const coinId = this.props.match.params.coinId.toLowerCase()
    // fetch only profile data => THE SPIDER CHART MOUNT CALLS FOR METRICS DATA
    this.props.fetchMessariProfile(coinId)
  }
  render() {
    console.log('single', this.props.messariProfile)
    return <div></div>
  }
}

const mapState = state => {
  return {
    messariProfile: state.apiData.messariProfile,
    spiderChartData: state.spiderChartData
  }
}

const mapDispatch = dispatch => {
  return {
    fetchMessariProfile: coinId => dispatch(fetchMessariProfile(coinId)),
    fetchSpiderChartData: (symbol, id) =>
      dispatch(fetchSpiderChartData(symbol, id))
  }
}
export default connect(mapState, mapDispatch)(CryptoSingle)
