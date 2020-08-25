import { headersAuth, serverURL } from "./Api";
import { fetchWrapper } from "./FetchWrapper";


export const fetchTicketsPaginated = (page: number) => {
    const paginatedUrl = new URL(serverURL + "/tickets/filter/" + page);

    return fetchWrapper(`${paginatedUrl}`, { headers: headersAuth })
        .then((response) => response.json())
        .then((json) => {
            return json;
        });
}