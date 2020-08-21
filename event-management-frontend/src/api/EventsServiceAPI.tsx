import { EventFilters } from "../model/EventFilters";
import moment from 'moment'
import { EventSort } from "../model/EventSort";
const serverURL = 'http://ec2-54-154-96-2.eu-west-1.compute.amazonaws.com:8080'
const productsURL = 'http://localhost:4000/products'

const token = 'eyJraWQiOiJGQmJURFl2dldtZzlkM3pHRW1xMmZWS29oRDBuVzdUZFwveEZRTzVCR3BEdz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5ZTY5YzRlNi1mNDBhLTQzZDUtYjViNi0wNjBkNDg1ZTQ3ZGQiLCJjb2duaXRvOmdyb3VwcyI6WyJST0xFX0FETUlOIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9wMzBBU284dUMiLCJjb2duaXRvOnVzZXJuYW1lIjoic3RlZmFuX2FkbWluIiwiZ2l2ZW5fbmFtZSI6ImJiIiwiYXVkIjoiNDVmYzdsYXJnbzkyZ29xNnR1bDJ2ZGZoYmYiLCJldmVudF9pZCI6IjRiNGE5MzUyLWU3YmYtNDZhNi1hZGM5LTVhZjM0ZDJkNjNkNyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTk3ODIxMjAyLCJleHAiOjE1OTc4MjQ4MDIsImlhdCI6MTU5NzgyMTIwMiwiZmFtaWx5X25hbWUiOiJiYiIsImVtYWlsIjoicmFkdXN0ZWZhbjExMjM1OEBnbWFpbC5jb20ifQ.SBBDBzgTQsSruxcuNi_O_PjUAc6Fqu14P011jCFn1JOC1k0-6A54j1x3G65fj4rWBdNcoReqhNe3E3_QKrwFqTfR4z6cpz5QpCv1eCBzBSp5nvF-uUYTjQ8EK3wYW2jidUwOhFI4DZYG6PiBHj_JFtDdaJ3qQhkTei1ruQCgim4j8ItCntoi20lQZqXOzRWenW0o1q4n-uYlYrbPAa9nEbuRJKTfqnmJc90Ve6GzixdZDR0OcMdbhyBoX5T8e_7VGO-P77dsr11s8GvRQM1jQLwaoc98L72AGOXYRW5tgirEeq7WW515HB7S-_3z0fDfFLniMDTqwwidaepiXg-HRg'

const headersAuth = {
    'Authorization': `Bearer ${token}`
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
    const url = new URL(serverURL + "/events/filter/" + page + "?")

    url.search = new URLSearchParams(filtersToSend).toString();

    // UNCOMMENT THIS ONLY IF ALL URLS ARE RIGHT
    return fetch(`${url}`,
        {
            headers: headersAuth
        }
    )
        .then((response) => response.json())
        .then((json) => {
            return json;
        });
}


export const fetchSortedEvents = (sort: EventSort, filters: EventFilters, page: number) => {
    const filtersToSend = computeFilterQueryString(filters)
    let customUrl = serverURL
    if (sort.criteria === undefined || sort.criteria === "") {
        customUrl += "/events/filter/" + page + "?"
    }
    else{
        customUrl += "/events/filter/sort/" + page + "?"
    }

    const url = new URL(customUrl)

    url.search = new URLSearchParams(filtersToSend).toString();

    if (sort.criteria !== undefined) {
        const sortToSend = computeSortQueryString(sort)
        url.search += "&"
        url.search += new URLSearchParams(sortToSend).toString();
    }

    // UNCOMMENT THIS ONLY IF ALL URLS ARE RIGHT
    return fetch(`${url}`, { headers: headersAuth })
        .then((response) => response.json())
        .then((json) => {
            return json;
        });
}

export const fetchEvents = () => {
    return fetch(`${serverURL}/events/filter/1`, { headers: headersAuth })
        .then(response => response.json())
        .then(json => {
            return json;
        })
}

export const changePage = (filters: EventFilters, sort: EventSort, page: number) => {
    const filtersToSend = computeFilterQueryString(filters)
    const sortToSend = computeSortQueryString(sort)

    const url = new URL(serverURL + "/events/filter/" + page + "?")
    url.search = new URLSearchParams(filtersToSend).toString();

    if (sort.criteria === "") {
        url.search = new URLSearchParams(filtersToSend).toString();
    } else {
        url.search = new URLSearchParams(filtersToSend).toString();
        url.search += new URLSearchParams(sortToSend).toString();
    }

    // UNCOMMENT THIS ONLY IF ALL URLS ARE RIGHT
    fetch(`${url}`, { headers: headersAuth })
        .then((response) => response.json())
        .then((json) => {
            return json;
        });
}

export const getLastNumber =  (filters: EventFilters) => {
    const filtersToSend = computeFilterQueryString(filters)
    const url = new URL(serverURL + "/events/lastPage/")
    url.search = new URLSearchParams(filtersToSend).toString();

    return fetch(`${url}`, { headers: headersAuth })
        .then((response) => response.json())
        .then((json) => {
            return json
        });
}

// Requests for home events

export const fetchHomeEvents = () => {
    // All home events
    return fetch(`${serverURL}/latest/1`, { headers: headersAuth })
        .then(response => response.json())
        .then(json => {
            return json;
        })
}

export const fetchPaginatedHomeEvents = (page: number) => {
    // Paginated home events requests
    let url = serverURL
    url += "/homeEvents/" + page

    // UNCOMMENT THIS ONLY IF ALL URLS ARE RIGHT
    return fetch(`${url}`, { headers: headersAuth })
        .then((response) => response.json())
        .then((json) => {
            return json;
        });
}

export const getLastNumberHome =  () => {
    // Last number from home
    const url = serverURL + "/events/lastPage/"

    /*return fetch(`${url}`, {headers: headersAuth})
        .then((response) => response.json())
        .then((json) => {
            return json
        });*/

    // Hardcoded
    return 5;
}