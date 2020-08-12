import { FETCH_EVENT_REQUEST, FETCH_EVENT_SUCCESS, FETCH_EVENT_FAILURE, DELETE_EVENT_REQUEST, DELETE_EVENT_SUCCESS, DELETE_EVENT_FAILURE, ADD_EVENT_REQUEST, ADD_EVENT_SUCCESS, ADD_EVENT_FAILURE } from "../actions/HeaderActions"

interface IProductBase {
  name: string,
  category: string,
  image: string,
  description: string,
}

export interface IProductDetailsReady extends IProductBase {
  id: number,
  price: number
}

export interface ProductState {
  loading: boolean,
  product: IProductDetailsReady,
  error: string
}

const initialState: ProductState = {
  loading: false,
  product: { id: -1, name: "NEW EVENT", category: "mock", price: 0, image: "mock", description: "mock" },
  error: ''
}

const HeaderReducer = (state = initialState, action: { type: string, payload: IProductDetailsReady }) => {
  switch (action.type) {
    case FETCH_EVENT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_EVENT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        error: ''
      }
    case FETCH_EVENT_FAILURE:
      return {
        loading: false,
        product: action.payload
      }
    case DELETE_EVENT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_EVENT_SUCCESS:
      return {
        ...initialState,
      }
    case DELETE_EVENT_FAILURE:
      return {
        error: action.payload
      }
    case ADD_EVENT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ADD_EVENT_SUCCESS:
      return {
        loading: false,
      }
    case ADD_EVENT_FAILURE:
      return {
        loading: false,
        newProduct: action.payload
      }
    default: return state
  }
}

export default HeaderReducer