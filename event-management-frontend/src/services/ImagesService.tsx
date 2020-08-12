import { EventImage } from "../model/EventImage";

const awsURL = 'https://event-management-pictures.s3-eu-west-1.amazonaws.com/test.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200812T142419Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=AKIAQMOAINUJ4IPX7LEM%2F20200812%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=e2a8de0d6262038858930b9e8edb5e6212426f3ed2e9ac921cd3824a0f5c95de'
const serverURL = 'http://localhost:4000/events/pictures'

const getEventImagesURL = async (newAddedImagesNames: string[]) => {
    return fetch(serverURL, {
        method: 'POST',
        body: JSON.stringify(newAddedImagesNames)
    }).then(response => response.json(),) // return string[]
}

const saveEventImages = async(newAddedImages: File, newAddedImagesURLsToUpload: string) => {
    return fetch(newAddedImagesURLsToUpload, {
        method: 'PUT',
        headers: {
            'Content-Type': 'image/*'
        },
        body: newAddedImages
    }).then(res => res.url) // the URL where the image was saved on S3
}

export const uploadEventImages = async (images: EventImage[]) => {
    const newAddedImages = images.filter(img => img.file !== undefined && img.deleted === undefined).map(img => img.file)

    const newAddedImagesNames = newAddedImages.map(image => image?.name)
    const newAddedImagesURLsToUpload = await getEventImagesURL(newAddedImagesNames as string[])
    // const newAddedImagesURLsToUpload = ['https://event-management-pictures.s3-eu-west-1.amazonaws.com/test.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200812T142419Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=AKIAQMOAINUJ4IPX7LEM%2F20200812%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=e2a8de0d6262038858930b9e8edb5e6212426f3ed2e9ac921cd3824a0f5c95de']
    const s3URLs: string[] = [] 

    newAddedImagesURLsToUpload.forEach(async (url: string, index: number) => {
        const imageURLFromS3 = await saveEventImages(newAddedImages[index] as File, url)
        s3URLs.push(imageURLFromS3)
    });
    return s3URLs
}

export const uploadEventImagesOnServer = (images: EventImage[], s3URLs: string[]) => {
    const keyToDelete = images.filter(img => img.deleted!==undefined).map(img => img.byteArr) // URL of the image I want to remove
    const keysOreder: any = []

    return fetch(serverURL, {
        method: 'PUT',
        body: JSON.stringify({keyToDelete: keyToDelete, keysToAdd: s3URLs, keysOreder: keysOreder})
    })
}

export const fetchEventImages = () => {
    return fetch(serverURL)
        .then(response => response.json(),)
}