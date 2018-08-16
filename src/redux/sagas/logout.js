import { put } from 'redux-saga/effects'
import { COMPLETE_LOGOUT } from '../actions/actionTypes'

export function* logout(action) {
    yield localStorage.removeItem("idToken")
    yield action.reference.setState({redirect : true})
    yield put({
        type: COMPLETE_LOGOUT
    })
}