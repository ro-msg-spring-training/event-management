import { EventCrud } from "../model/EventCrud";
import { EventImage } from "../model/EventImage";
import locationUrl from "./LocationUrl";
const serverURL = 'http://ec2-54-154-96-2.eu-west-1.compute.amazonaws.com:8080'

const token = 'eyJraWQiOiJGQmJURFl2dldtZzlkM3pHRW1xMmZWS29oRDBuVzdUZFwveEZRTzVCR3BEdz0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiOEZNVXFiZ1Y4QzRLWGpqbmFpbHlRdyIsInN1YiI6IjllNjljNGU2LWY0MGEtNDNkNS1iNWI2LTA2MGQ0ODVlNDdkZCIsImNvZ25pdG86Z3JvdXBzIjpbIlJPTEVfQURNSU4iXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX3AzMEFTbzh1QyIsImNvZ25pdG86dXNlcm5hbWUiOiJzdGVmYW5fYWRtaW4iLCJnaXZlbl9uYW1lIjoiYmIiLCJhdWQiOiIyanFjNDYxb2xhaXFkMmUxMTFzcmlyNHRrMyIsImV2ZW50X2lkIjoiN2VlY2I4ZGItNjQ1MC00MzNmLWFkOGMtZmI0M2JlNjMzNTc2IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1OTc3NzMyMjIsImV4cCI6MTU5Nzc3NjgyMiwiaWF0IjoxNTk3NzczMjIyLCJmYW1pbHlfbmFtZSI6ImJiIiwiZW1haWwiOiJyYWR1c3RlZmFuMTEyMzU4QGdtYWlsLmNvbSJ9.DKNfDKTjE8HxwR0Qu8Jc9pz9XinanYVqDYITM6M060iBVNUvAQAoeKkQxeYMaMAABU-tptK6Ea-rFql2Sx1ILI9wkxpjNflkkNeK0Yz9GV1fL5VqOzd1i-Fi9v82Q4iBuAd1uBxIoM1qKGs3ycMqW3_BICiIzBvusxtS4xlQfkudcDPi1gTLF6-UicRd3vsBrLf-esMwQjOERdFiMrMd3VW5JBqhoAXu9Mbjq-Vh0wu63XM-jqJnvoIfp2uFUJqCfTo3CODSsZC3Yk8tzusbitPP_u95qimNrngph7Z6R85O5qjw0v3SR8mX-H2UWrb7x1DM6qhGW5H7q0w-qBaWRQ'

const headersAuth = {
    'Authorization': `Bearer ${token}`
}

//TODO modify links
export const fetchEventAPI = (id: string) => {
  return fetch(`${serverURL}/events/${id}`, {
    headers: headersAuth
  }).then((response) => response.json());
};

export const deleteEventAPI = (id: string) => {
  return fetch(`${serverURL}/events/${id}`, { method: "DELETE" , headers: headersAuth});
};

export const addEventAPI = (event: EventCrud) => {
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
  return fetch(`${serverURL}/events`, {
    method: 'PUT',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(event),
  }).then((response) => response.json());
};

const sendImagesToAddAndDeteteToServer = async (newAddedImagesIds: string[], imagesToDelete: string []) => {
  return fetch(`${serverURL}/pictures`, {
      method: 'POST',
      body: JSON.stringify({picturesToSave: newAddedImagesIds, picturesToDelete: imagesToDelete}),
      headers: headersAuth
  }).then(response => response.json(),) // return string[]
}

const saveEventImage = async (newAddedImages: File, newAddedImagesURLsToUpload: string) => {
  return fetch(newAddedImagesURLsToUpload, {
    method: "PUT",
    headers: {
      "Content-Type": "image/*",
      'Authorization': `Bearer ${token}`
    },
    body: newAddedImages,
  }).then((res) => res.url); // the URL where the image was saved on S3
};

export const updateImagesFromS3 = async (images: EventImage[]) => {
  const newAddedImages = images.filter((img) => img.file !== undefined && img.deleted === undefined);
  const newAddedImagesIds = newAddedImages.map((image) => image.id);

  const imagesToDelete = images.filter((img) => img.deleted !== undefined).map((img) => img.url);

  // get presigned URLs from the server to upload on S3 and send images server have to delete from s3
  const newAddedImagesURLsToUpload = await sendImagesToAddAndDeteteToServer(newAddedImagesIds, imagesToDelete);

  // upload images on S3 and save the images URL in order to send them back to server
  newAddedImages.forEach(async (newImage: EventImage, index: number) => {
    const urlS3 = newAddedImagesURLsToUpload[index];
    const indexImage = images.findIndex((im) => im.id === newImage.id);
    images[indexImage].url = await saveEventImage(newImage.file as File, urlS3);
  });

  return images
}

export function fetchLocation() {
  return fetch(locationUrl, {
    headers: headersAuth
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
}
