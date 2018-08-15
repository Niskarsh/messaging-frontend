import { put } from 'redux-saga'
import { COMPLETE_SAVE_OAUTH_TOKEN } from '../actions/actionTypes'

export function* saveIdToken(action) {
    yield localStorage.setItem("idToken", action.idToken)
    yield put({
        idToken: action.idToken,
        type: COMPLETE_SAVE_OAUTH_TOKEN
    })
}