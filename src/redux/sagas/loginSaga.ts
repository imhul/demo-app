import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { LoginRequest } from 'interfaces';
import { loginUser } from 'api';
import { types } from 'redux/types';

// login
function* loginSaga({
    payload
}: {
    payload: LoginRequest;
}): Generator<any> {
    try {
        const response: any = yield call(loginUser, {
            login: payload.login,
            password: payload.password
        });
        if (response.status === 'success') {
            yield put({
                type: types.USER_LOGIN_SUCCESS,
                payload: response.data
            });
        } else {
            yield put({
                type: types.USER_LOGIN_FAIL,
                payload: 'error'
            });
        }
    } catch (error) {
        yield put({ type: types.USER_LOGIN_FAIL, payload: 'error' });
    }
}

function* onLoginSubmitWatcher() {
    yield takeLatest(types.USER_LOGIN_REQUEST as any, loginSaga);
}

export default [fork(onLoginSubmitWatcher)];
