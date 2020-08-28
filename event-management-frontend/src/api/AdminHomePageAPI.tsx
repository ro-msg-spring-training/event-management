import { headersAuth, serverURL } from "./Api";
import { fetchWrapper } from "./FetchWrapper"


export function fetchUpcomingEventsAPI() {
  return fetchWrapper(`${serverURL}/events/upcoming`, {
    headers: headersAuth,
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
}

export function fetchHistoryEventsAPI() {
  return fetchWrapper(`${serverURL}/events/history`, {
    headers: headersAuth,
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
}
