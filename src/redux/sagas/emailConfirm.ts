import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { ConfirmEmailRequest } from 'interfaces';
import { emailConfirm } from 'api';
import { types } from 'redux/types';

// Email confirm
function* emailConfirmSaga({
    payload
}: {
    payload: ConfirmEmailRequest;
}): Generator<any> {
    try {
        const response: any = yield call(emailConfirm, {
            ref: payload.ref,
            token: payload.token
        });

        if (response?.status === 'success') {
            yield put({
                type: types.USER_CONFIRM_EMAIL_SUCCESS,
                payload: response.data
            });
        } else {
            yield put({
                type: types.USER_CONFIRM_EMAIL_FAIL
            });
        }
    } catch (error) {
        yield put({
            type: types.USER_CONFIRM_EMAIL_FAIL
        });
    }
}

function* onEmailConfirmWatcher() {
    yield takeLatest(
        types.USER_CONFIRM_EMAIL_REQUEST as any,
        emailConfirmSaga
    );
}

export default [fork(onEmailConfirmWatcher)];
