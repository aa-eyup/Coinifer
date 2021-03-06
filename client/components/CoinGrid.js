import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchCoinpaperData} from '../store/apiDataStore'
import CoinCell from './CoinCell'

class CoinGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchCoinpaperData()
  }

  render() {
    console.log('all', this.props.coinpaperData)
    return (
      <div id="container">
        <div id="cryptos-grid">
          {this.props.coinpaperData.map(crypto => (
            <CoinCell key={crypto.id} crypto={crypto} />
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    coinpaperData: state.apiData.coinpaperAllCoinsData
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCoinpaperData: () => dispatch(fetchCoinpaperData())
  }
}

export default connect(mapState, mapDispatch)(CoinGrid)
