export const UPLOAD_IMAGES = "UPLOAD_IMAGES"

export const uploadImagesAction = (images: []) => {
    return {
        type: UPLOAD_IMAGES,
        payload: images
    }
}