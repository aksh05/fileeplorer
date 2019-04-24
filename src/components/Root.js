import React from 'react';
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import Browse from './Browse';
import SideBar from './SideBar';
import NotFound from './NotFound';

export default function Root({ store }) {
   const {rootdir} = store.getState();
   const {children} = rootdir;
    return (
        <Provider store={store}>
            <div className="file-explorer">
                <SideBar />
                <Switch>
                    <Route path="/" render={()=><Browse  />} />
                    <Route  component={NotFound} />
                </Switch>
            </div>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired
}