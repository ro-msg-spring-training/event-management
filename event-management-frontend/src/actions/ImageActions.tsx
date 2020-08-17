import { EventImage } from "../model/EventImage"

export const UPDATE_EVENT_IMAGES = "UPDATE_EVENT_IMAGES"
export const UPLOAD_EVENT_IMAGES_S3 = "UPLOAD_EVENT_IMAGES_S3"
export const FETCH_EVENT_IMAGES_S3 = "FETCH_EVENT_IMAGES_S3"
export const FETCH_EVENT_IMAGES_S3_REQUEST = "FETCH_EVENT_IMAGES_S3_REQUEST"
export const FETCH_EVENT_IMAGES_S3_SUCCESS = "FETCH_EVENT_IMAGES_S3_SUCCESS"
export const FETCH_EVENT_IMAGES_S3_ERROR = "FETCH_EVENT_IMAGES_S3_ERROR"

export const updateEventImages = (images: EventImage[]) => {
    return {
        type: UPDATE_EVENT_IMAGES,
        payload: images
    }
}

export const fetchEventImagesS3 = (eventId: number) => {
    return {
        type: FETCH_EVENT_IMAGES_S3,
        payload: eventId
    }
}

export const fetchEventImagesS3Request = () => {
    return {
        type: FETCH_EVENT_IMAGES_S3_REQUEST,
    }
}

export const fetchEventImagesS3Success = (images: EventImage[]) => {
    return {
        type: FETCH_EVENT_IMAGES_S3_SUCCESS,
        payload: images
    }
}

export const fetchEventImagesS3Error = () => {
    return {
        type: FETCH_EVENT_IMAGES_S3_ERROR,
    }
}

// to change the specification of the method
export const uploadEventImagesS3 = (images: any, eventId: number) => {
    return {
        type: UPLOAD_EVENT_IMAGES_S3,
        payload: {
            images: images,
            id: eventId
        }
    }
}