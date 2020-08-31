import {headersAuth, serverEventsURL, serverURL} from "./Api";
import { fetchWrapper } from "./FetchWrapper";
import {TicketFilters} from "../model/TicketFilters";


export const fetchTicketsPaginated = (page: number, filters: TicketFilters) => {
    const paginatedUrl = new URL(serverURL + "/tickets/filter?page=" + (page-1) + "&size=2");

    // Testing will be done in task 9.4
    // Filters are received well, only API must be changed ---> use filters.title && filters.date

    return fetchWrapper(`${paginatedUrl}`, { headers: headersAuth })
        .then((response) => response.json())
        .then((json) => {
            return json.tickets;
        });
}
