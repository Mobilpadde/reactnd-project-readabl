import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

import reducers from './reducers';
import Home from './components/Home';
import Detail from "./components/Detail";
import registerServiceWorker from './registerServiceWorker';

import './styles/index.css';
import './styles/common.css';

const history = createHistory();
const middleware = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    composeEnhancers({
        ...reducers,
        routing: routerReducer,
    }),
    applyMiddleware(...middleware)
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div className="common">
                <Route exact path="/" component={Home} />
                <Route exact path="/details/:slug" component={Detail} />
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
