import { UPDATE_EVENT_IMAGES, FETCH_EVENT_IMAGES_S3_SUCCESS, FETCH_EVENT_IMAGES_S3_ERROR, FETCH_EVENT_IMAGES_S3_REQUEST } from "../actions/ImageActions"
import { EventImage } from "../model/EventImage"


interface ReducerActionProps {
    type: string,
    payload: EventImage[]
}

const initialState = {
    isError: false,
    isLoading: false,
    // images: [{ id: 'first', name: 'butterfly', byteArr: 'https://event-management-pictures.s3-eu-west-1.amazonaws.com/first.jpg' }],
    images: []
}

export const ImagesReducer = (state = initialState, action: ReducerActionProps) => {
    switch (action.type) {
        case UPDATE_EVENT_IMAGES:
            return {
                ...state,
                images: action.payload,
                isError: false
            }
        case FETCH_EVENT_IMAGES_S3_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_EVENT_IMAGES_S3_SUCCESS:
            return {
                ...state,
                isError: false,
                isLoading: false,
                images: action.payload
            }
        case FETCH_EVENT_IMAGES_S3_ERROR:
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        default:
            return state
    }
}

