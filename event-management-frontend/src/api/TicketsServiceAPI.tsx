import { headersAuth, serverURL } from "./Api";
import { fetchWrapper } from "./FetchWrapper";


export const fetchTicketsPaginated = (page: number) => {
    // Paginated home events requests
    // TODO: Test with ticket backend :D
    const paginatedUrl = new URL(serverURL + "/events/latest/" + page);

    return fetchWrapper(`${paginatedUrl}`, { headers: headersAuth })
        .then((response) => response.json())
        .then((json) => {
            return json;
        });
}