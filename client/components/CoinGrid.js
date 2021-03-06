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
    console.log('grid component mounts ========================')
    this.props.fetchTopOneHundred()
  }

  render() {
    const page = +this.props.match.params.pageNumber
    const start = 10 * (page - 1)
    const end = 10 * page
    console.log('all', this.props.topOneHundred)
    return (
      <div id="container">
        <div id="cryptos-grid">
          {this.props.topOneHundred.slice(start, end).map(crypto => (
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
