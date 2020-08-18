import { EventCrud } from "../model/EventCrud";
import { EventImage } from "../model/EventImage";
import locationUrl from "./LocationUrl";
const serverURL = 'http://ec2-54-154-96-2.eu-west-1.compute.amazonaws.com:8080'


//TODO modify links
export const fetchEventAPI = (id: string) => {
  return fetch(`http://localhost:4000/products/${id}`).then(response => response.json())
}

export const deleteEventAPI = (id: string) => {
  return fetch(`http://localhost:4000/products/${id}`, { method: 'DELETE' })
}

export const addEventAPI = (event: EventCrud) => {
  console.log('event to add', event)
  return fetch(`${serverURL}/events`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  }).then(response => response.json())
}

export const editEventAPI = (event: EventCrud) => {
  return fetch(`${serverURL}/events`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  }).then(response => response.json())
}

const sendImagesToAddAndDeteteToServer = async (newAddedImagesNames: string[], imagesToDelete: string []) => {
  return fetch(`${serverURL}/pictures`, {
      method: 'POST',
      body: JSON.stringify({picturesToSave: newAddedImagesNames, picturesToDelete: imagesToDelete})
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

export const updateImagesFromS3 = async (images: EventImage[]) => {
  const newAddedImages = images.filter(img => img.file !== undefined && img.deleted === undefined)
  const newAddedImagesNames = newAddedImages.map(image => image.id)

  const imagesToDelete = images.filter(img => img.deleted !== undefined).map(img => img.url)

  // get presigned URLs from the server to upload on S3 and send images server have to delete from s3
  const newAddedImagesURLsToUpload = await sendImagesToAddAndDeteteToServer(newAddedImagesNames, imagesToDelete)

  // upload images on S3 and save the images URL in order to send them back to server
  newAddedImages.forEach(async (newImage: EventImage, index: number) => {
    const urlS3 = newAddedImagesURLsToUpload[index]
    const indexImage = images.findIndex(im => im.id === newImage.id)
    images[indexImage].url = await saveEventImage(newImage.file as File, urlS3)
  });

  return images
}

export function fetchLocation() {
  return fetch(locationUrl)
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
}