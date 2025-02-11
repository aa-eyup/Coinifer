import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import apiData from './apiDataStore';
import spiderChartData from './spiderChartStore';
import watchlist from './watchlist';

const reducer = combineReducers({
  user,
  apiData,
  watchlist,
  spiderChartData
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
