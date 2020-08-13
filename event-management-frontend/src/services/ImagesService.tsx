import { EventImage } from "../model/EventImage";

const serverURL = 'http://localhost:4000/pictures'


const getEventImagesURL = async (newAddedImagesNames: string[]) => {
    return fetch(serverURL, {
        method: 'POST',
        body: JSON.stringify(newAddedImagesNames)
    }).then(response => response.json(),) // return string[]
}

const saveEventImage = async (newAddedImages: File, newAddedImagesURLsToUpload: string) => {
    return fetch(newAddedImagesURLsToUpload, {
        method: 'PUT',
        headers: {
            'Content-Type': 'image/*'
        },
        body: newAddedImages
    }).then(res => res.url) // the URL where the image was saved on S3
}

export const uploadEventImagesS3 = async (images: EventImage[]) => {
    console.log('in uploadEventImagesS3 method', images)
    
    const newAddedImages = images.filter(img => img.file !== undefined && img.deleted === undefined)
    const newAddedImagesNames = newAddedImages.map(image => image.name)

    // get presigned URLs from the server to upload on S3  
    const newAddedImagesURLsToUpload = await getEventImagesURL(newAddedImagesNames as string[])

    // upload images on S3 and save the images URL in order to send them back to server
    newAddedImages.forEach(async (newImage: EventImage, index: number) => {
        const urlS3 = newAddedImagesURLsToUpload[index]
        const indexImage = images.findIndex(im => im.id === newImage.id)
        images[indexImage].url = await saveEventImage(newImage.file as File, urlS3)
    });

    return images
}

export const uploadEventImagesOnServer = (images: EventImage[], id: number) => {
    const imagesToDelete = images.filter(img => img.deleted !== undefined).map(img => img.url) 
    const imagesOrder = images.filter(img => img.deleted === undefined).map(img => img.url) 

    return fetch(`${serverURL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ imagesToDelete: imagesToDelete, imagesOrder: imagesOrder})
    })
}

export const fetchEventImages = (id: number) => {
    return fetch(`${serverURL}/${id}`)
        .then(response => response.json(),)
}