import { takeEvery } from 'redux-saga/effects'
import { INITIATE_SAVE_OAUTH_TOKEN } from '../actions/actionTypes'
import { saveIdToken } from './oAuthToken'
export function* watchOver() {

    yield takeEvery(INITIATE_SAVE_OAUTH_TOKEN, saveIdToken)
}