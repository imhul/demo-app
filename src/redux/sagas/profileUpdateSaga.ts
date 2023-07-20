import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { UpdateProfilePayload } from 'interfaces';
import { updateProfile } from 'api';
import { types } from 'redux/types';

// Create profile
function* profileUpdateSaga({
    payload
}: {
    payload: UpdateProfilePayload;
}): Generator<any> {
    try {
        const response: any = yield call(updateProfile, {
            data: payload.data,
            token: payload.token
        });

        if (response.status === 'success') {
            yield put({
                type: types.USER_UPDATE_PROFILE_SUCCESS,
                payload: response.user_data
            });
        } else {
            yield put({ type: types.USER_UPDATE_PROFILE_FAIL });
        }
    } catch (error) {
        yield put({ type: types.USER_UPDATE_PROFILE_FAIL });
    }
}

function* onUpdateUserWatcher() {
    yield takeLatest(
        types.USER_UPDATE_PROFILE_REQUEST as any,
        profileUpdateSaga
    );
}

export default [fork(onUpdateUserWatcher)];
