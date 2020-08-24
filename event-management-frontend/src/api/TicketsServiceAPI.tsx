import { headersAuth, serverURL, serverEventsURL } from "./Api";
import {fetchWrapper} from "./FetchWrapper";


// Test with products for now, until backend is done
export const fetchTickets = () => {
    //return fetchWrapper(`${serverURL}/tickets`, { headers: headersAuth })
    return fetch('http://localhost:4000/products')
        .then(response => response.json())
        .then(json => {
            return json;
        })
}