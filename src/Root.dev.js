import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import App from './components/App';


export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <App />
        </div>
      </Provider>
    );
  }
}


