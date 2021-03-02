import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchCoinpaperData} from '../store/apiDataStore'
import CryptoBlock from './cryptoBlock'

class Grid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchCoinpaperData()
  }

  render() {
    console.log(this.props.coinpaperData)
    return (
      <div id="container">
        <div id="cryptos-grid">
          {this.props.coinpaperData.map(crypto => (
            <CryptoBlock key={crypto.id} crypto={crypto} />
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    coinpaperData: state.apiData.coinpaperData
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCoinpaperData: () => dispatch(fetchCoinpaperData())
  }
}

export default connect(mapState, mapDispatch)(Grid)
