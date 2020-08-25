import { headersAuth, serverURL } from "./Api";
import { fetchWrapper } from "./FetchWrapper";
import { UserEventFilters } from "../model/UserEventFilters";
import { UserEventType } from "../model/UserEventType";


const computeFilterStringQuery = (filters: UserEventFilters, page: number, limit: number) => {
    let querry = filters.type === UserEventType.UPCOMING ? 'upcoming?' : 'history?';
    let querryArr: string[] = [];

    querryArr.push(`pageNumber=${page}`)
    querryArr.push(`limit=${limit}`)

    if (filters.title) {
        querryArr.push(`title=${filters.title}`)
    }
    if (filters.rate) {
        querryArr.push(`rate=${filters.rate}&rateSign=${filters.rateSign}`)
    }
    if (filters.locations) {
        filters.locations.map(loc => querryArr.push(`multipleLocations=${loc}`))
    }
    return querry + querryArr.join('&')
}

export const fetchEvents = (page: number, limit: number, filters?: UserEventFilters) => {
    let url = `${serverURL}/events/user/`

    if (filters) {
        url += computeFilterStringQuery(filters, page, limit)
    }
    else {
        url += `upcoming?pageNumber=${page}&limit=${limit}`;
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
