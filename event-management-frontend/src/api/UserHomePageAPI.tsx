import { serverURL, headersAuth } from "./Api";
import { fetchWrapper } from "./FetchWrapper";

export const fetchHighlightedEvents = () => {
  let url = `${serverURL}/events/highlighted`;
  const urlOptions = { headers: headersAuth };
  console.log("api: ");
  return fetchWrapper(url, urlOptions)
    .then((response) => response.json())
    .then((json) => {
      console.log("api: ", json[1].title, json[1].id, json[1].picture);
      return json;
    });
};
