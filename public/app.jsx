import React from 'react';
import ReactDOM from 'react-dom';
import promiseMiddleware from 'redux-promise';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

import ChartsContainer from './components/ChartsContainer';
import NavBarContainer from './components/FilterBarContainer';
import rootReducer from './reducers';

const store = createStore(rootReducer, {}, applyMiddleware(promiseMiddleware));

const RootComponent = () => (
  <div>
    <NavBarContainer />
    <ChartsContainer />
  </div>
);

const App = () => (
  <Provider store={store}>
    <RootComponent />
  </Provider>
);
ReactDOM.render(<App />, document.getElementById('root'));
