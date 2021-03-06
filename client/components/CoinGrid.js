import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchTopOneHundred} from '../store/apiDataStore'
import CoinCell from './CoinCell'

class CoinGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchTopOneHundred()
  }

  render() {
    console.log('all', this.props.topOneHundred)
    return (
      <div id="container">
        <div id="cryptos-grid">
          {this.props.topOneHundred.slice(0, 10).map(crypto => (
            <CoinCell key={crypto.id} crypto={crypto} />
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    topOneHundred: state.apiData.topOneHundred
  }
}

const mapDispatch = dispatch => {
  return {
    fetchTopOneHundred: () => dispatch(fetchTopOneHundred())
  }
}

export default connect(mapState, mapDispatch)(CoinGrid)
