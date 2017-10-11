import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import Home from './components/Home';
import Detail from "./components/Detail";
import { getAllPosts, getCategories } from "./actions";
import registerServiceWorker from './registerServiceWorker';

import './styles/index.css';
import './styles/common.css';

const history = createHistory();
const middleware = [routerMiddleware(history), thunk];
const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

store.dispatch(getAllPosts());
store.dispatch(getCategories());

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div className="common">
                <Route exact path="/" component={Home} />
                <Route exact path="/category/:catId" component={Home} />
                <Route exact path="/details/:slug" component={Detail} />
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();