import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { getUser } from 'api';
import { types } from 'redux/types';

// logout
function* getUserSaga({
    payload
}: {
    payload: string;
}): Generator<any> {
    try {
        const response: any = yield call(getUser, payload);
        if (response.status === 'success') {
            yield put({
                type: types.GET_USER_INFO_SUCCESS,
                payload: response.user_data
            });
        } else {
            yield put({ type: types.GET_USER_INFO_FAIL });
        }
    } catch (error) {
        yield put({ type: types.GET_USER_INFO_FAIL });
    }
}

function* onGetUserSubmitWatcher() {
    yield takeLatest(types.GET_USER_INFO_REQUEST as any, getUserSaga);
}

export default [fork(onGetUserSubmitWatcher)];
