import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';

const history = createHistory();

import SinglePage from './components/Pages/SinglePage';
import SinglePost from './components/Pages/SinglePost';
import NotFound from './components/Pages/NotFound';
import SpeedTest from './components/Pages/SpeedTest';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './styles/index.css';

import store/*, {engine}*/ from './store';

ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <div>
                    <Route render={({location}) => (

                        <Switch key={location.key} location={location}>
                            <Route exact path="/" component={SpeedTest}/>
                            <Route path="/about" component={SinglePage}/>
                            <Route path="/posts/:slug" component={SinglePost}/>
                            <Route component={NotFound}/>
                        </Switch>
                    )}/>
                </div>
            </ConnectedRouter>
        </Provider>,
    document.getElementById('root')
);
