import { serverURL, headersAuth } from "./Api";
import { fetchWrapper } from "./FetchWrapper";

export const fetchHighlightedEvents = () => {
  let url = `${serverURL}/events/highlighted`;
  const urlOptions = { headers: headersAuth };

  return fetchWrapper(url, urlOptions)
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
};
