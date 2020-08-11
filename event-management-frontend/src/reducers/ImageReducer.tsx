import { UPLOAD_IMAGES } from "../actions/ImageActions"
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
        case UPLOAD_IMAGES:
            return {
                ...state,
                images: action.payload
            }
        default:
            return state
    }
}

