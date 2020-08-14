import { combineReducers } from "redux"
import HeaderReducer from "../reducers/HeaderEventCrudReducer"

const rootReducer = combineReducers({
  event: HeaderReducer,
})

export default rootReducer
