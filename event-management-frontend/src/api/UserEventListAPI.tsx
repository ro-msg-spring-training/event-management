import { headersAuth, serverURL } from "./Api";

export const fetchEvents = (page: number, limit: number) => {
    const url = `${serverURL}/events/user/upcoming?pageNumber=${page}&limit=${limit}`;
    const urlOptions = {headers: headersAuth};

    return fetch(url, urlOptions)
        .then((response) => response.json())
        .then((json) => {
            return json;
        });
}
