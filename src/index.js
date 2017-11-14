import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import SpeedTest from './components/Pages/SpeedTest';
import './styles/index.css';

import store/*, {engine}*/ from './store';

ReactDOM.render(
        <Provider store={store}>
                <SpeedTest />
        </Provider>,
    document.getElementById('root')
);
