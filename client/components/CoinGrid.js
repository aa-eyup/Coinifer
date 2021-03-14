import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CoinCell from './CoinCell'
import PaginationNavbar from './PaginationNavbar'
import ReactLoading from 'react-loading'
import {fetchTopOneHundred, fetchMarketCapPage} from '../store/apiDataStore'
import {fetchWatchlist} from '../store/watchlist'

class CoinGrid extends React.Component {
  async componentDidMount() {
    const {pageNumber} = this.props.match.params
    //this.props.fetchTopOneHundred(pageNumber)
    await this.props.fetchWatchlist(this.props.user.id)
    await this.props.fetchMarketCapPage(pageNumber)
  }

  render() {
    const assets = this.props.marketCapPage
    if (assets) {
      return (
        <main id="container">
          <PaginationNavbar
            basepath="/coins/page"
            numberOfPages={10}
            currentPage={this.props.match.params.pageNumber}
            fetchFunction={this.props.fetchMarketCapPage}
          />
          <div className="grid">
            {assets.map(crypto => (
              <CoinCell key={crypto.id} crypto={crypto} />
            ))}
          </div>
        </main>
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
    marketCapPage: state.apiData.marketCapPage,
    topOneHundred: state.apiData.topOneHundred,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchTopOneHundred: pageNumber => dispatch(fetchTopOneHundred(pageNumber)),
    fetchMarketCapPage: pageNumber => dispatch(fetchMarketCapPage(pageNumber)),
    fetchWatchlist: userId => dispatch(fetchWatchlist(userId))
  }
}

export default connect(mapState, mapDispatch)(CoinGrid)
