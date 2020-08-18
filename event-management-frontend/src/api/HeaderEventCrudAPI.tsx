import { EventCrud } from "../model/EventCrud";
import { EventImage } from "../model/EventImage";
import locationUrl from "./LocationUrl";
const serverURL = 'http://ec2-54-154-96-2.eu-west-1.compute.amazonaws.com:8080'

const token = 'eyJraWQiOiJGQmJURFl2dldtZzlkM3pHRW1xMmZWS29oRDBuVzdUZFwveEZRTzVCR3BEdz0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiOUNWNzhSQjgxbkUteGp3WmdYYzNydyIsInN1YiI6IjllNjljNGU2LWY0MGEtNDNkNS1iNWI2LTA2MGQ0ODVlNDdkZCIsImNvZ25pdG86Z3JvdXBzIjpbIlJPTEVfQURNSU4iXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX3AzMEFTbzh1QyIsImNvZ25pdG86dXNlcm5hbWUiOiJzdGVmYW5fYWRtaW4iLCJnaXZlbl9uYW1lIjoiYmIiLCJhdWQiOiIyanFjNDYxb2xhaXFkMmUxMTFzcmlyNHRrMyIsImV2ZW50X2lkIjoiMzc0ZTM0OTEtOTY2YS00MGIwLWJkNDctYTYwNDEyNmJkYThiIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1OTc3NjgxMTksImV4cCI6MTU5Nzc3MTcxOSwiaWF0IjoxNTk3NzY4MTE5LCJmYW1pbHlfbmFtZSI6ImJiIiwiZW1haWwiOiJyYWR1c3RlZmFuMTEyMzU4QGdtYWlsLmNvbSJ9.XQmbdRyWRLshBL7kVHigEvqnYndynYf28QXRygCZXnFkBBds67VIy7OjgNQeZa3pRbjjyKT3g6zlKqgut_J3rLKwLfk0tsrj_83391jOXk19huTqEa0o5D_7mnjb0t0q0xa767HahxOhtm6B6taPulWIkjuvP1rV9J0g7IkR42MLS1M1JsLxQS7BwSdbcNevxXvNf318bY_NxCBVzPwMK0GcUCH3IzsfyXWfwj3p-TjeWw6x2t9-bLix9OCzodDJjRANjvEw1f9AOdDfVKTBpUrJdOo5x1LOZ8VDrDB1kn81tB-cOY6sySFTFAfK7DFV93QD8U5ANPCxqgmdVTGsiQ'

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

const sendImagesToAddAndDeteteToServer = async (newAddedImagesNames: string[], imagesToDelete: string []) => {
  return fetch(`${serverURL}/pictures`, {
      method: 'POST',
      body: JSON.stringify({picturesToSave: newAddedImagesNames, picturesToDelete: imagesToDelete}),
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
  const newAddedImagesNames = newAddedImages.map((image) => image.id);

  const imagesToDelete = images.filter((img) => img.deleted !== undefined).map((img) => img.url);

  // get presigned URLs from the server to upload on S3 and send images server have to delete from s3
  const newAddedImagesURLsToUpload = await sendImagesToAddAndDeteteToServer(newAddedImagesNames, imagesToDelete);

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
