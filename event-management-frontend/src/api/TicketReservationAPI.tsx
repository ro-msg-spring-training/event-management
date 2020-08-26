import { headersAuth, serverURL, token, s3URL } from "./Api";
import { fetchWrapper } from "./FetchWrapper";

export const fetchTicketCategoriesAPI = (idEvent: string) => {
  return fetchWrapper(`${serverURL}/tickets/remaining/${idEvent}`, {
    headers: headersAuth
  }).then((response) => response.json());
};
