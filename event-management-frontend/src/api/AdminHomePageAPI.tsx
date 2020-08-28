//import { headersAuth, serverURL } from "./Api";

export const serverURL = "http://ec2-54-154-96-2.eu-west-1.compute.amazonaws.com:8080";
export const s3URL = "https://event-management-pictures.s3-eu-west-1.amazonaws.com";

export const token = localStorage.getItem("idToken");

export const headersAuth = {
  Authorization: `Bearer ${localStorage.getItem("idToken")}`,
};

export function fetchUpcomingEventsAPI() {
  return fetch(`${serverURL}/events/upcoming`, {
    headers: headersAuth,
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
}

export function fetchHistoryEventsAPI() {
  return fetch(`${serverURL}/events/history`, {
    headers: headersAuth,
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
}
