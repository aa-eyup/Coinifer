import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Login, Signup, Watchlist} from './components';
import {me} from './store';

import SingleCoin from './components/SingleCoin';
import CoinGrid from './components/CoinGrid';
import Trending from './components/Trending';
import Methodology from './components/Methodology';

class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData();
  }

  render() {
    const {isLoggedIn} = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/">
          <Redirect to="/trending" />
        </Route>
        <Route
          path="/coins/page/:pageNumber"
          render={routProps => <CoinGrid {...routProps} />}
        />
        <Route path="/trending" component={Trending} />
        <Route path="/methodology" component={Methodology} />
        {/* <Route path="/graph" component={} /> */}
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route
              path="/coins/:coinSymbol/profile"
              render={routProps => <SingleCoin {...routProps} />}
            />
            <Route path="/user/:userId/watchlist" component={Watchlist} />
            {/* <Route path="/">
              <Redirect to="/user/:userId/watchlist" />
            </Route> */}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}

        <Route component={Watchlist} />
      </Switch>
    );
  }
}

const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes b/c props changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
