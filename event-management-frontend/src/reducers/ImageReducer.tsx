import { UPDATE_EVENT_IMAGES } from "../actions/ImageActions"
import { EventImage } from "../model/EventImage"


interface ReducerActionProps {
    type: string,
    payload: EventImage[]
}

const initialState = {
    images: [{id: 'first', name: 'butterfly', byteArr: 'https://img.bunadimineata.ro/uploads/2015/04/fluture-pe-floare_27122598-770x600.jpg'}],
}

export const ImagesReducer = (state = initialState, action: ReducerActionProps) => {
    switch (action.type) {
        case UPDATE_EVENT_IMAGES:
            return {
                ...state,
                images: action.payload
            }
        default:
            return state
    }
}

