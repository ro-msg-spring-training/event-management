import { combineReducers } from "redux"
import HeaderReducer from "../reducers/HeaderReducer"

const rootReducer = combineReducers({
  event: HeaderReducer,
})

export default rootReducer
