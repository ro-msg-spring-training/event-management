import { takeEvery } from "redux-saga/effects"
import { Auth } from "aws-amplify"

// function monitorableAction(action: any) {
//     return action.type.includes('REQUEST')
// }

function* monitor(monitoredAction: any) {
    yield Auth.currentSession()
        .then(data => {
            localStorage.setItem("idToken", data.getIdToken().getJwtToken())
        })
        .catch(err => console.log('curent session error', err));
}

export function* refreshMonitor() {
    yield takeEvery('*', monitor)
}