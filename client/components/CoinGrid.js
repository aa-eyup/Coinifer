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
    const {pageNumber} = this.props.match.params
    console.log(
      'grid component mounts ======================== page ',
      pageNumber
    )
    this.props.fetchTopOneHundred(this.props.match.params.pageNumber)
  }

  render() {
    console.log('all', this.props.topOneHundred)
    return (
      <div id="container">
        <div id="cryptos-grid">
          {this.props.topOneHundred.map(crypto => (
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
    fetchTopOneHundred: pageNumber => dispatch(fetchTopOneHundred(pageNumber))
  }
}

export default connect(mapState, mapDispatch)(CoinGrid)
