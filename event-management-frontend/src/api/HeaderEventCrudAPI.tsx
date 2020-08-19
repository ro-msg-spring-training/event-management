import { EventCrud } from "../model/EventCrud";
import { EventImage } from "../model/EventImage";
import { headersAuth, serverURL, token, s3URL } from "./Api";


//TODO modify links
export const fetchEventAPI = (id: string) => {
  return fetch(`${serverURL}/events/${id}`, {
    headers: headersAuth
  }).then((response) => response.json());
};

export const deleteEventAPI = (id: string) => {
  return fetch(`${serverURL}/events/${id}`, { method: "DELETE", headers: headersAuth });
};

export const addEventAPI = (event: EventCrud) => {
  console.log('event to add', event)
  return fetch(`${serverURL}/events`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(event),
  }).then((response) => response.json());
};

export const editEventAPI = (event: EventCrud) => {
  console.log('editEventAPI', event)
  return fetch(`${serverURL}/events/${event.id}`, {
    method: 'PUT',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(event),
  }).then((response) => response.json());
};

const sendImagesToAddAndDeteteToServer = async (newAddedImagesIds: string[], imagesToDelete: string[]) => {
  const pictures = { picturesToSave: newAddedImagesIds, picturesToDelete: imagesToDelete }
  console.log('to deleteeeeeeee', pictures)
  return fetch(`${serverURL}/pictures`, {
    method: 'POST',
    body: JSON.stringify(pictures),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
  }).then(response => response.json(),) // return string[]
}

const saveEventImage = async (newAddedImages: File, newAddedImagesURLsToUpload: string) => {
  return fetch(newAddedImagesURLsToUpload, {
    method: "PUT",
    headers: {
      "Content-Type": "image/*",
    },
    body: newAddedImages,
  }).then((res) => {
    console.log('result AWS', res)
    return res.url
  }); // the URL where the image was saved on S3
};

export const updateImagesFromS3 = async (images: EventImage[]) => {
  const newAddedImages = images.filter((img) => img.file !== undefined && img.deleted === undefined);
  const newAddedImagesIds = newAddedImages.map((image) => image.id) as string[];

  const imagesToDelete = images.filter((img) => img.deleted !== undefined && img.file === undefined).map((img) => img.id) as string[];

  // get presigned URLs from the server to upload on S3 and send images server have to delete from s3
  const newAddedImagesURLsToUpload = await sendImagesToAddAndDeteteToServer(newAddedImagesIds, imagesToDelete);

  console.log('e promise sau nu??', newAddedImagesURLsToUpload)

  // upload images on S3 and save the images URL in order to send them back to server
  newAddedImages.forEach((newImage: EventImage, index: number) => {
    const urlS3 = newAddedImagesURLsToUpload[index];
    const indexImage = images.findIndex((im) => im.id === newImage.id);
    saveEventImage(newImage.file as File, urlS3);
    images[indexImage].url = `${s3URL}/${images[indexImage].id}`
    console.log('url de poze', images[indexImage].url)
  });
  console.log('dupa for each', images)
  return images.filter(img => img.deleted === undefined).map(img => img.url)
}

export function fetchLocation() {
  return fetch(`${serverURL}/locations`, {
    headers: headersAuth
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
}
