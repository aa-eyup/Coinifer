import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchTopOneHundred} from '../store/apiDataStore'
import CoinCell from './CoinCell'

class CoinGrid extends React.Component {
  componentDidMount() {
    const {pageNumber} = this.props.match.params
    this.props.fetchTopOneHundred(pageNumber)
  }

  render() {
    console.log('all', this.props.topOneHundred)
    return (
      <main id="container">
        <div className="grid">
          {this.props.topOneHundred.map(crypto => (
            <CoinCell key={crypto.id} crypto={crypto} />
          ))}
        </div>
      </main>
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
