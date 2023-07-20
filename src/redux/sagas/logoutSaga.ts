import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { logoutUser } from 'api';
import { types } from 'redux/types';

// logout
function* logoutSaga({
    payload
}: {
    payload: string;
}): Generator<any> {
    try {
        const response: any = yield call(logoutUser, payload);
        if (response.status === 'success') {
            yield put({ type: types.USER_LOGOUT_SUCCESS });
        } else {
            yield put({ type: types.USER_LOGOUT_FAIL });
        }
    } catch (error) {
        yield put({ type: types.USER_LOGOUT_FAIL });
    }
}

function* onLogoutSubmitWatcher() {
    yield takeLatest(types.USER_LOGOUT_REQUEST as any, logoutSaga);
}

export default [fork(onLogoutSubmitWatcher)];
