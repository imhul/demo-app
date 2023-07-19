import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { RegistrationRequest } from 'interfaces';
import { register } from 'api';
import { types } from 'redux/types';

// registration`
function* registerSaga({
    payload
}: {
    payload: RegistrationRequest;
}): Generator<any> {
    try {
        const response: any = yield call(register, {
            email: payload.email,
            password: payload.password,
            ref: payload.ref
        });
        if (response.status === 'success') {
            yield put({
                type: types.USER_REGISTER_SUCCESS,
                payload: response.data
            });
        } else {
            yield put({
                type: types.USER_REGISTER_FAIL,
                payload: 'error'
            });
        }
    } catch (error) {
        yield put({
            type: types.USER_REGISTER_FAIL,
            payload: 'error'
        });
    }
}

function* onRegisterWatcher() {
    yield takeLatest(
        types.USER_REGISTER_REQUEST as any,
        registerSaga
    );
}

export default [fork(onRegisterWatcher)];
