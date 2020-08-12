import { EventImage } from "../model/EventImage"

export const UPDATE_EVENT_IMAGES = "UPDATE_EVENT_IMAGES"
export const UPLOAD_EVENT_S3 = "UPLOAD_EVENT_S3"

export const updateEventImages = (images: EventImage[]) => {
    return {
        type: UPDATE_EVENT_IMAGES,
        payload: images
    }
}

// to change the specification of the method
export const uploadEventImagesS3 = (images: any) => {
    return {
        type: UPLOAD_EVENT_S3,
        payload: images
    }
}