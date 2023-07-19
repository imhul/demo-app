import { all } from 'redux-saga/effects';

import loginSaga from 'redux/sagas/loginSaga';
import registerSaga from 'redux/sagas/registerSaga';
import profileCreateSaga from 'redux/sagas/profileCreateSaga';

export default function* rootSaga() {
    yield all([...loginSaga, ...registerSaga, ...profileCreateSaga]);
}
