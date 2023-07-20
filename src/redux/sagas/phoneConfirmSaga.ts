import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { ConfirmPhonePayload } from 'interfaces';
import { phoneConfirm } from 'api';
import { types } from 'redux/types';

// Email confirm
function* phoneConfirmSaga({
    payload
}: {
    payload: ConfirmPhonePayload;
}): Generator<any> {
    try {
        const response: any = yield call(phoneConfirm, {
            code: payload.code,
            token: payload.token
        });

        if (response?.status === 'success') {
            yield put({ type: types.USER_CONFIRM_PHONE_SUCCESS });
        } else {
            yield put({ type: types.USER_CONFIRM_PHONE_FAIL });
        }
    } catch (error) {
        yield put({ type: types.USER_CONFIRM_PHONE_FAIL });
    }
}

function* onPhoneConfirmWatcher() {
    yield takeLatest(
        types.USER_CONFIRM_PHONE_REQUEST as any,
        phoneConfirmSaga
    );
}

export default [fork(onPhoneConfirmWatcher)];
