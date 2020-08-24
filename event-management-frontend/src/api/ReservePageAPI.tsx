import { fetchWrapper } from "./FetchWrapper";
import { serverURL, headersAuth } from "./Api";

export function fetchReserveEventAPI(id: number) {
  return fetchWrapper(`${serverURL}/events/${id}`, { headers: headersAuth })
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
}
