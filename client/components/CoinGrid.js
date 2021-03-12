import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchTopOneHundred, fetchMarketCapPage} from '../store/apiDataStore'
import CoinCell from './CoinCell'
import PaginationNavbar from './PaginationNavbar'
import ReactLoading from 'react-loading'

class CoinGrid extends React.Component {
  componentDidMount() {
    const {pageNumber} = this.props.match.params
    //this.props.fetchTopOneHundred(pageNumber)
    this.props.fetchMarketCapPage(pageNumber)
  }

  render() {
    const assets = this.props.marketCapPage
    console.log('assets from Coingrid ----------------------', assets)
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
    topOneHundred: state.apiData.topOneHundred
  }
}

const mapDispatch = dispatch => {
  return {
    fetchTopOneHundred: pageNumber => dispatch(fetchTopOneHundred(pageNumber)),
    fetchMarketCapPage: pageNumber => dispatch(fetchMarketCapPage(pageNumber))
  }
}

export default connect(mapState, mapDispatch)(CoinGrid)
