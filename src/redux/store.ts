import { createBrowserHistory } from 'history';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import rootReducer from 'redux/reducer';
import rootSaga from 'redux/saga';

const saga = createSagaMiddleware();
const history = createBrowserHistory();

const store = configureStore({
    reducer: rootReducer(history),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(saga)
            .concat(routerMiddleware(history)),
    devTools: true,
    preloadedState: {}
});

saga.run(rootSaga);

export default store;
