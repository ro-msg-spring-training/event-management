import { EventFilters } from "../model/EventFilters";
import moment from 'moment'
import { EventSort } from "../model/EventSort";
import { headersAuth, serverURL, serverEventsURL } from "./Api";
import {fetchWrapper} from "./FetchWrapper";


const computeLimit = () => {
    let limit: any = {}

    limit['limit'] = 2;

    return limit;
}

const computePage = (page: number) => {
    let pageToSend: any = {}

    pageToSend['pageNumber'] = page;

    return pageToSend
}

const computeSortQueryString = (sort: EventSort) => {
    let sortToSend: any = {}

    sortToSend['sortCriteria'] = sort.criteria === "occRate" ? "OCCUPANCY_RATE" : sort.criteria.toUpperCase();
    sortToSend['sortType'] = sort.type === "asc" ? 1 : 0;

    return sortToSend;
}

const computeFilterQueryString = (filters: EventFilters) => {
    let filtersToSend: any = {}

    if (filters.title !== '' && filters.title !== undefined) {
        filtersToSend['title'] = filters.title
    }
    if (filters.subtitle !== '' && filters.subtitle !== undefined) {
        filtersToSend['subtitle'] = filters.subtitle
    }
    if (filters.status !== 'none' && filters.status !== undefined) {
        filtersToSend['status'] = filters.status
    }
    if (filters.location !== '' && filters.location !== undefined) {
        filtersToSend['location'] = filters.location
    }
    if (filters.startDate !== null && filters.startDate !== undefined) {
        filtersToSend['startDate'] = moment(filters.startDate).format("YYYY-MM-DD")
    }
    if (filters.endDate !== null && filters.endDate !== undefined) {
        filtersToSend['endDate'] = moment(filters.endDate).format("YYYY-MM-DD")
    }
    if (filters.rate !== '' && filters.rate !== undefined) {
        filtersToSend['rate'] = filters.rate
        filtersToSend['rateSign'] = filters.rateSign
    }
    if (filters.maxPeople !== '' && filters.maxPeople !== undefined) {
        filtersToSend['maxPeople'] = filters.maxPeople
        filtersToSend['maxPeopleSign'] = filters.maxPeopleSign
    }
    if (filters.startHour !== undefined) {
        filtersToSend['startHour'] = filters.startHour
    }
    if (filters.endHour !== undefined) {
        filtersToSend['endHour'] = filters.endHour
    }
    if (filters.highlighted !== undefined) {
        filtersToSend['highlighted'] = filters.highlighted
    }

    return filtersToSend
}

export const fetchFilteredEvents = (filters: EventFilters, page: number) => {
    const filtersToSend = computeFilterQueryString(filters)
    const pageToSend = computePage(page)
    const limitToSend = computeLimit()

    const url = new URL(serverEventsURL)
    url.search = new URLSearchParams(filtersToSend).toString();
    url.search += "&"
    url.search += new URLSearchParams(pageToSend).toString();
    url.search += "&"
    url.search += new URLSearchParams(limitToSend).toString();

    return fetchWrapper(`${url}`, { headers: headersAuth })
        .then((response) => response.json())
        .then((json) => {
            return json;
        });
}

export const fetchSortedEvents = (sort: EventSort, filters: EventFilters, page: number) => {
    const filtersToSend = computeFilterQueryString(filters)
    const sortToSend = computeSortQueryString(sort)
    const limitToSend = computeLimit()
    const pageToSend = computePage(page)

    const url = new URL(serverEventsURL)
    if (filtersToSend.length !== undefined) {
        url.search = new URLSearchParams(filtersToSend).toString();
        url.search += "&"
    } else if (sortToSend.length !== undefined) {
        url.search += new URLSearchParams(sortToSend).toString();
        url.search += "&"
    }

    url.search += new URLSearchParams(limitToSend).toString();
    url.search += "&"
    url.search += new URLSearchParams(pageToSend).toString();

    return fetchWrapper(`${url}`, { headers: headersAuth })
        .then((response) => response.json())
        .then((json) => {
            return json;
        });
}

export const fetchEvents = () => {
    return fetchWrapper(`${serverURL}/events?limit=2&pageNumber=1`, { headers: headersAuth })
        .then(response => response.json())
        .then(json => {
            return json;
        })
}

export const changePage = (filters: EventFilters, sort: EventSort, page: number) => {
    const filtersToSend = computeFilterQueryString(filters)
    const sortToSend = computeSortQueryString(sort)
    const limitToSend = computeLimit()
    const pageToSend = computePage(page)

    const url = new URL(serverEventsURL)
    url.search = new URLSearchParams(filtersToSend).toString();
    url.search += "&"
    url.search += new URLSearchParams(sortToSend).toString();
    url.search += "&"
    url.search += new URLSearchParams(limitToSend).toString();
    url.search += "&"
    url.search += new URLSearchParams(pageToSend).toString();

    fetchWrapper(`${url}`, { headers: headersAuth })
        .then((response) => response.json())
        .then((json) => {
            return json;
        });
}

export const getLastNumber = (filters: EventFilters) => {
    const filtersToSend = computeFilterQueryString(filters)
    const limit = computeLimit()

    const url = new URL(serverURL + "/events/lastPage")

    url.search = new URLSearchParams(filtersToSend).toString();
    url.search += "&"
    url.search += new URLSearchParams(limit).toString();

    return fetch(`${url}`, { headers: headersAuth })
        .then((response) => response.json())
        .then((json) => {
            return json
        });
}

// Requests for home events

export const fetchHomeEvents = () => {
    // All home events
    const homeUrl = new URL(serverEventsURL + "/latest/1")

    return fetchWrapper(`${homeUrl}`, { headers: headersAuth })
        .then(response => response.json())
        .then(json => {
            return json;
        })
}

export const fetchPaginatedHomeEvents = (page: number) => {
    // Paginated home events requests
    const paginatedUrl = new URL(serverEventsURL + "/latest/" + page)

    // UNCOMMENT THIS ONLY IF ALL URLS ARE RIGHT
    return fetchWrapper(`${paginatedUrl}`, { headers: headersAuth })
        .then((response) => response.json())
        .then((json) => {
            return json;
        });
}

export const getLastNumberHome =  () => {
    // Last number from home
    const url = serverURL + "/events/lastPage/"

    /*return fetchWrapper(`${url}`, {headers: headersAuth})
        .then((response) => response.json())
        .then((json) => {
            return json
        });*/

    // Hardcoded
    return 5;
}