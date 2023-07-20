import { all } from 'redux-saga/effects';
// sagas
import logoutSaga from './sagas/logoutSaga';
import loginSaga from 'redux/sagas/loginSaga';
import getUserSaga from './sagas/getUserSaga';
import sendSmsSaga from './sagas/sendSmsSaga';
import registerSaga from 'redux/sagas/registerSaga';
import phoneConfirmSaga from './sagas/phoneConfirmSaga';
import emailConfirmSaga from './sagas/emailConfirmSaga';
import profileUpdateSaga from './sagas/profileUpdateSaga';
import profileCreateSaga from 'redux/sagas/profileCreateSaga';

export default function* rootSaga() {
    yield all([
        ...loginSaga,
        ...logoutSaga,
        ...getUserSaga,
        ...sendSmsSaga,
        ...registerSaga,
        ...emailConfirmSaga,
        ...phoneConfirmSaga,
        ...profileCreateSaga,
        ...profileUpdateSaga
    ]);
}
