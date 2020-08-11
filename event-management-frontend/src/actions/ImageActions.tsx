import { EventImage } from "../model/EventImage"

export const UPDATE_EVENT_IMAGES = "UPDATE_EVENT_IMAGES"

export const updateEventImages = (images: EventImage[]) => {
    return {
        type: UPDATE_EVENT_IMAGES,
        payload: images
    }
}