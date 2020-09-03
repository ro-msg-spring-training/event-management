import { fetchWrapper } from './FetchWrapper';
import { serverURL, headersAuth } from './Api';

export const fetchEventWithLocationsAPI = (id: string) => {
  return fetchWrapper(`${serverURL}/events/${id}?type=userEventDetails`, {
    headers: headersAuth
  }).then((response) => response.json());
};
