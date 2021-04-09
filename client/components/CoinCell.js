import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import CoinSpiderChart from './CoinSpiderChart';
import {addToWatchlist, removeFromWatchlist} from '../store/watchlist';

const CoinCell = props => {
  const {crypto} = props;
  console.log(crypto);
  return (
    <section className="coin-cell">
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-24x24">
                <img src={crypto.image ? crypto.image.small : crypto.thumb} />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-6">
                <Link
                  to={{
                    pathname: `/coins/${crypto.symbol}/profile`,
                    state: {id: crypto.id}
                  }}
                >{`${crypto.name}`}</Link>
              </p>
            </div>
            {props.user.id ? (
              props.watchlist.filter(
                asset =>
                  asset.assetSymbol === crypto.symbol &&
                  asset.assetName === crypto.name
              ).length > 0 ? (
                <div
                  className="watchlist-button media-right"
                  onClick={() =>
                    props.removeFromWatchlist({
                      userId: props.user.id,
                      assetName: crypto.name,
                      assetSymbol: crypto.symbol
                    })
                  }
                >
                  <figure className="button is-24x24 is-danger">
                    {/* <i className="far fa-minus-square fa-lg"></i> */}
                    <p className="watchlist-icon">
                      <strong>-</strong>
                    </p>
                    <p className="watchlist-msg tag">Remove from watchlist</p>
                  </figure>
                </div>
              ) : (
                <div
                  className="watchlist-button media-right"
                  onClick={() =>
                    props.addToWatchlist({
                      userId: props.user.id,
                      assetName: crypto.name,
                      assetSymbol: crypto.symbol,
                      imageUrl: crypto.image ? crypto.image.small : crypto.thumb
                    })
                  }
                >
                  <figure className="button is-24x24 is-success">
                    {/* <i className="far fa-plus-square fa-lg"></i> */}
                    <p className="watchlist-icon">
                      <strong>+</strong>
                    </p>
                    <p className="watchlist-msg tag">Add to watchlist</p>
                  </figure>
                </div>
              )
            ) : (
              ''
            )}
          </div>
          <div className="card-image">
            <figure className="is-4by3">
              <CoinSpiderChart symbol={crypto.symbol} id={crypto.id} />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapState = state => {
  return {
    watchlist: state.watchlist.assets,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    addToWatchlist: data => dispatch(addToWatchlist(data)),
    removeFromWatchlist: data => dispatch(removeFromWatchlist(data))
  };
};
export default connect(mapState, mapDispatch)(CoinCell);
