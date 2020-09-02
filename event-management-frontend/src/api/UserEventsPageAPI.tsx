import { headersAuth, serverURL } from "./Api";
import { fetchWrapper } from "./FetchWrapper";
import { UserEventFilters } from "../model/userEventsPage/UserEventFilters";
import { UserEventType } from "../model/userEventsPage/UserEventType";


const computeFilterStringQuery = (filters: UserEventFilters, page: number, limit: number) => {
    let query = filters.type === UserEventType.UPCOMING ? 'upcoming?' : 'history?';
    let queryArr: string[] = [];

    queryArr.push(`page=${page}`);
    queryArr.push(`size=${limit}`);

    if (filters.title) {
        queryArr.push(`title=${filters.title}`);
    }
    if (filters.rate || filters.rate === 0) {
        queryArr.push(`rate=${filters.rate}&rateSign=${filters.rateSign}`);
    }
    if (filters.locations) {
        filters.locations.map(loc => queryArr.push(`multipleLocations=${loc}`));
    }
    return query + queryArr.join('&');
}

export const fetchEvents = (page: number, limit: number, filters?: UserEventFilters) => {
    let url = `${serverURL}/events/user/`;

    if (filters) {
        url += computeFilterStringQuery(filters, page, limit);
    }
    else {
        url += `upcoming?page=${page}&size=${limit}`;
    }
    const urlOptions = { headers: headersAuth };

    return fetchWrapper(url, urlOptions)
        .then((response) => response.json())
        .then((json) => {
            return json;
        });
}

export const fetchEventsLocations = () => {
    const url = `${serverURL}/locations`;
    const urlOptions = { headers: headersAuth };

    return fetchWrapper(url, urlOptions)
        .then((response) => response.json())
        .then((json) => {
            return json;
        });
}
