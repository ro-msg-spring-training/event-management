import {headersAuth, serverURL} from "./Api";
import { fetchWrapper } from "./FetchWrapper";
import {TicketFilters} from "../model/TicketFilters";


export const fetchTicketsPaginated = (page: number, filters: TicketFilters) => {
    let paginatedUrl = serverURL + "/tickets/filter?page=" + (page-1) + "&size=2";

    filters.title !== '' ? paginatedUrl += "&title=" + filters.title:
        filters.date !== undefined ? paginatedUrl += "&date=" + filters.date : paginatedUrl += "";

    return fetchWrapper(`${paginatedUrl}`, { headers: headersAuth })
        .then((response) => response.json())
        .then((json) => {
            return json.tickets;
        });
}
