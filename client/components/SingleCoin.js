// SOME COINS FROM COINPAPER MAY NOT HAVE DATA FROM MESSARI
// (MESSAR DATA WILL BE USED FOR SINGLE VIEW)

import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProfile} from '../store/apiDataStore'
import {fetchSpiderChartData} from '../store/spiderChartStore'
import ReactLoading from 'react-loading'

class CryptoSingle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    // get id from props.match.params (should be coinpaper .symbol -> .toLowercase())
    const coinSymbol = this.props.match.params.coinSymbol.toLowerCase()
    // fetch only profile data => THE SPIDER CHART MOUNT CALLS FOR METRICS DATA
    this.props.fetchProfile(coinSymbol)
    // fetch cgc data using this.props.location.state.id COMBINE WITHIN fetchProfile
  }
  render() {
    const {profile} = this.props
    //profile.name
    // profile.profile.technology.overview
    console.log('single', this.props.profile)
    console.log('props', this.props.location.state)
    if (profile && profile.slug === this.props.location.state.id) {
      return (
        <>
          <section className="hero is-primary">
            <div className="hero-body">
              <p className="title">{`${profile.name} (${profile.symbol})`}</p>
            </div>
          </section>
          <div className="tile is-ancestor">
            <div className="tile is-parent">
              <div className="tile is-child box">
                <p className="title">{profile.name}'s Technology</p>
                <p>{profile.profile.technology.overview.technology_details}</p>
              </div>
            </div>
          </div>
        </>
      )
    } else {
      return (
        <div className="center">
          <ReactLoading
            type="cubes"
            color="rgb(36, 225, 96)"
            height={25}
            width={50}
          />
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    profile: state.apiData.profile,
    spiderChartData: state.spiderChartData
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProfile: coinId => dispatch(fetchProfile(coinId)),
    fetchSpiderChartData: (symbol, id) =>
      dispatch(fetchSpiderChartData(symbol, id))
  }
}
export default connect(mapState, mapDispatch)(CryptoSingle)
