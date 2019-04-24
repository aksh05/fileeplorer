import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import configureStore from './store/configureStore';
import Root from './components/Root';
const store = configureStore();
render(
    <Router>
      <Root store={store} />
    </Router>,
    document.getElementById('root')
  )
  