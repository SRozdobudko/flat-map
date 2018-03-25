import * as reducers from './reducers';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers(reducers);
const finalCreateStore = compose(applyMiddleware(thunkMiddleware))(createStore);

let store = finalCreateStore(rootReducer);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers');
    store.replaceReducer(nextRootReducer);
  });
}

export default store;

