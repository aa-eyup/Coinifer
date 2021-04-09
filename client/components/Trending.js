import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchTrending} from '../store/apiDataStore';
import CoinCell from './CoinCell';
import {fetchWatchlist} from '../store/watchlist';

class Trending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchWatchlist();
    this.props.fetchTrending();
  }

  render() {
    return (
      <React.Fragment>
        <section className="hero is-success box">
          <div className="hero-body">
            <p className="title">Trending on CoinGecko today!</p>
            <p className="subtitle">
              CoinGecko is a major provider of fundamental analysis on the
              crypto market
            </p>
          </div>
        </section>
        <main id="container">
          <div className="grid">
            {this.props.trending.map(crypto => (
              <CoinCell key={crypto.id} crypto={crypto} />
            ))}
          </div>
        </main>
      </React.Fragment>
    );
  }
}

const mapState = state => {
  return {
    trending: state.apiData.trending,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    fetchTrending: () => dispatch(fetchTrending()),
    fetchWatchlist: () => dispatch(fetchWatchlist())
  };
};

export default connect(mapState, mapDispatch)(Trending);
