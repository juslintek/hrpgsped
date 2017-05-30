import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup' // ES6
import { ConnectedRouter } from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';

const history = createHistory();

//import App from './components/App';
import Home from './components/Pages/Home';
import SinglePage from './components/Pages/SinglePage';
import SinglePost from './components/Pages/SinglePost';
import NotFound from './components/Pages/NotFound';

import Header from './components/Header';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './styles/index.css';

import store from './store';

ReactDOM.render(
  <Provider store={store}>
	  <ConnectedRouter history={history}>
      <div>
        <Header/>
        <Route render={({ location }) => (

            <Switch key={location.key} location={location}>
              <Route exact path="/" component={Home}/>
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

  // <Route render={({ location }) => (
  //         <CSSTransitionGroup
  //           transitionName="example"
  //           transitionEnterTimeout={500}
  //           transitionLeaveTimeout={300}>
  //           <Switch key={location.key} location={location}>
  //             <Route exact path="/" component={Home}/>
  //             <Route path="/about" component={SinglePage}/>
  //             <Route path="/posts/:slug" component={SinglePost}/>
  //             <Route component={NotFound}/>
  //           </Switch>
  //         </CSSTransitionGroup>
  //       )}/>