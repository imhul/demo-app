import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { sendSms } from 'api';
import { types } from 'redux/types';

// login
function* sendSmsSaga({
    payload
}: {
    payload: string;
}): Generator<any> {
    try {
        const response: any = yield call(sendSms, payload);
        if (response.status === 'success') {
            yield put({ type: types.USER_CONFIRM_SEND_SMS_SUCCESS });
        } else {
            yield put({ type: types.USER_CONFIRM_SEND_SMS_FAIL });
        }
    } catch (error) {
        yield put({ type: types.USER_CONFIRM_SEND_SMS_FAIL });
    }
}

function* onSendSmsSubmitWatcher() {
    yield takeLatest(
        types.USER_CONFIRM_SEND_SMS_REQUEST as any,
        sendSmsSaga
    );
}

export default [fork(onSendSmsSubmitWatcher)];
