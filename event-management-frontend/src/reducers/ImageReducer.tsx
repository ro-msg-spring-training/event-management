import { UPDATE_EVENT_IMAGES } from "../actions/ImageActions"
import { EventImage } from "../model/EventImage"


interface ReducerActionProps {
    type: string,
    payload: EventImage[]
}

const initialState = {
    images: [],
}

export const ImagesReducer = (state = initialState, action: ReducerActionProps) => {
    switch (action.type) {
        case UPDATE_EVENT_IMAGES:
            console.log('le-am pus in store', action.payload)
            return {
                ...state,
                images: action.payload
            }
        default:
            return state
    }
}

