import { takeEvery } from 'redux-saga/effects'
import { INITIATE_SAVE_OAUTH_TOKEN, INITIATE_LOGOUT } from '../actions/actionTypes'
import { saveIdToken } from './oAuthToken'
import { logout } from './logout'
export function* watchOver() {

    yield takeEvery(INITIATE_SAVE_OAUTH_TOKEN, saveIdToken)
    yield takeEvery(INITIATE_LOGOUT, logout)
}