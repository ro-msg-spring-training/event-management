import { headersAuth, serverURL, token, s3URL } from "./Api";
import { fetchWrapper } from "./FetchWrapper";
import Booking from "../model/Booking";

export const fetchTicketCategoriesAPI = (idEvent: string) => {
  return fetchWrapper(`${serverURL}/tickets/remaining/${idEvent}`, {
    headers: headersAuth
  }).then((response) => response.json());
};

export const addBookingsAPI = (booking: Booking) => {
  console.log("addBookingsAPI ", JSON.stringify(booking));
  return fetchWrapper(`${serverURL}/bookings`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(booking),
  }).then((response) => response.json());
};
