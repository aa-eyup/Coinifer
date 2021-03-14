import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CoinCell from './CoinCell'
import ReactLoading from 'react-loading'
import {fetchWatchlist} from '../store/watchlist'

class Watchlist extends React.Component {
  async componentDidMount() {
    await this.props.fetchWatchlist(this.props.user.id)
  }

  render() {
    const assets = this.props.watchlist
    //console.log('assets from Coingrid ----------------------', assets)
    if (assets) {
      return (
        <main id="container">
          <div className="grid">
            {assets.map(crypto => (
              <CoinCell
                key={crypto.assetSymbol}
                crypto={{
                  symbol: crypto.assetSymbol,
                  name: crypto.assetName,
                  id: crypto.assetName.toLowerCase()
                }}
              />
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
    user: state.user,
    watchlist: state.watchlist.assets
  }
}

const mapDispatch = dispatch => {
  return {
    fetchWatchlist: userId => dispatch(fetchWatchlist(userId))
  }
}

export default connect(mapState, mapDispatch)(Watchlist)
