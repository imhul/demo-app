import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { ProfileCreatePayload } from 'interfaces';
import { profileCreate } from 'api';
import { types } from 'redux/types';

// Create profile
function* profileCreateSaga({
    payload
}: {
    payload: ProfileCreatePayload;
}): Generator<any> {
    try {
        const response: any = yield call(profileCreate, {
            data: payload.data,
            token: payload.token
        });

        if (response?.status === 'success') {
            yield put({
                type: types.USER_CREATE_PROFILE_SUCCESS,
                payload: response.data
            });
        } else {
            yield put({
                type: types.USER_CREATE_PROFILE_FAIL,
                payload: 'error'
            });
        }
    } catch (error) {
        yield put({
            type: types.USER_CREATE_PROFILE_FAIL,
            payload: 'error'
        });
    }
}

function* onCreateUserWatcher() {
    yield takeLatest(
        types.USER_CREATE_PROFILE_REQUEST as any,
        profileCreateSaga
    );
}

export default [fork(onCreateUserWatcher)];
