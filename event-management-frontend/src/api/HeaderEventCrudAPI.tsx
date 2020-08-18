import { EventCrud } from "../model/EventCrud";
import { EventImage } from "../model/EventImage";
import locationUrl from "./LocationUrl";
const serverURL = 'http://ec2-54-154-96-2.eu-west-1.compute.amazonaws.com:8080'
const s3URL = 'https://event-management-pictures.s3-eu-west-1.amazonaws.com'

const token = 'eyJraWQiOiJGQmJURFl2dldtZzlkM3pHRW1xMmZWS29oRDBuVzdUZFwveEZRTzVCR3BEdz0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiRG1KZnJCeWRHa2Q0dXNDRHVZQlkxdyIsInN1YiI6IjllNjljNGU2LWY0MGEtNDNkNS1iNWI2LTA2MGQ0ODVlNDdkZCIsImNvZ25pdG86Z3JvdXBzIjpbIlJPTEVfQURNSU4iXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX3AzMEFTbzh1QyIsImNvZ25pdG86dXNlcm5hbWUiOiJzdGVmYW5fYWRtaW4iLCJnaXZlbl9uYW1lIjoiYmIiLCJhdWQiOiIyanFjNDYxb2xhaXFkMmUxMTFzcmlyNHRrMyIsImV2ZW50X2lkIjoiMzNmYTYzNjYtYjhiZi00MWJmLWE3OTctY2FhZjNkNzExYWI4IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1OTc3NzcyOTEsImV4cCI6MTU5Nzc4MDg5MSwiaWF0IjoxNTk3Nzc3MjkxLCJmYW1pbHlfbmFtZSI6ImJiIiwiZW1haWwiOiJyYWR1c3RlZmFuMTEyMzU4QGdtYWlsLmNvbSJ9.R-Z5T2kLwNYIO5QVZV0GWCY1t6UgYK0DBi9FHXwOcJSgGlvJjC-PKGSF6Cf8nekRboryid3Gj6eclIF-ZF48SJR0u-cTl5vjBdG269A5lGNoDyfFqVcwbmm0Xvgszsfb2xymTyphWdG25mEGm2VJX8erl1dzgrUhc0f9gUGr70MXte8WLmZPwgmznb4mAV4RtzS70VgCqIfPF0xQ0MyjOFpiL6MyW1bG0TkPw1n0YtNZIn48MbkuVk5kV4aUl-FpX3V1f2mNbXjyF4M7D8GTCSyhvuD8yQYNFcOn0WR7gXXNwt4ClnrjmkNx1y2E5i8iYiFYy51TRTLmU0STo62LlQ'

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

const sendImagesToAddAndDeteteToServer = async (newAddedImagesIds: string[], imagesToDelete: string []) => {
  const pictures = {picturesToSave: newAddedImagesIds, picturesToDelete: imagesToDelete}

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
    return res.url}); // the URL where the image was saved on S3
};

export const updateImagesFromS3 = async (images: EventImage[]) => {
  const newAddedImages = images.filter((img) => img.file !== undefined && img.deleted === undefined);
  const newAddedImagesIds = newAddedImages.map((image) => image.id) as string[];

  const imagesToDelete = images.filter((img) => img.deleted !==undefined  && img.file === undefined).map((img) => img.url) as string [];

  // get presigned URLs from the server to upload on S3 and send images server have to delete from s3
  const newAddedImagesURLsToUpload = await sendImagesToAddAndDeteteToServer(newAddedImagesIds, imagesToDelete);

  console.log('e promise sau nu??', newAddedImagesURLsToUpload)

  // upload images on S3 and save the images URL in order to send them back to server
  newAddedImages.forEach(async (newImage: EventImage, index: number) => {
    const urlS3 = newAddedImagesURLsToUpload[index];
    const indexImage = images.findIndex((im) => im.id === newImage.id);
    await saveEventImage(newImage.file as File, urlS3);
    images[indexImage].url = `${s3URL}/${images[indexImage].id}`
    console.log('url de poze', images[indexImage].url )
  });

  return images.map(img => img.url)
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
