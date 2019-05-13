import React from 'react';
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import Explorer from './Explorer';
import SideBar from './SideBar';
/* import NotFound from './NotFound'; */

import '../sass/root.scss';

export default function Root({ store }) {
    return (
        <Provider store={store}>
            <div className="file-explorer">
                <SideBar />
                <Switch>
                    <Route path="/" render={()=><Explorer  />} />
                   {/*  <Route  component={NotFound} /> */}
                </Switch>
            </div>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired
}