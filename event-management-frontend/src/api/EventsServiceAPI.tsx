import { EventFilters } from "../model/EventFilters";
import moment from 'moment'
import { EventSort } from "../model/EventSort";
const serverURL = 'http://ec2-54-154-96-2.eu-west-1.compute.amazonaws.com:8080'

const token = 'eyJraWQiOiJGQmJURFl2dldtZzlkM3pHRW1xMmZWS29oRDBuVzdUZFwveEZRTzVCR3BEdz0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiRG1KZnJCeWRHa2Q0dXNDRHVZQlkxdyIsInN1YiI6IjllNjljNGU2LWY0MGEtNDNkNS1iNWI2LTA2MGQ0ODVlNDdkZCIsImNvZ25pdG86Z3JvdXBzIjpbIlJPTEVfQURNSU4iXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX3AzMEFTbzh1QyIsImNvZ25pdG86dXNlcm5hbWUiOiJzdGVmYW5fYWRtaW4iLCJnaXZlbl9uYW1lIjoiYmIiLCJhdWQiOiIyanFjNDYxb2xhaXFkMmUxMTFzcmlyNHRrMyIsImV2ZW50X2lkIjoiMzNmYTYzNjYtYjhiZi00MWJmLWE3OTctY2FhZjNkNzExYWI4IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1OTc3NzcyOTEsImV4cCI6MTU5Nzc4MDg5MSwiaWF0IjoxNTk3Nzc3MjkxLCJmYW1pbHlfbmFtZSI6ImJiIiwiZW1haWwiOiJyYWR1c3RlZmFuMTEyMzU4QGdtYWlsLmNvbSJ9.R-Z5T2kLwNYIO5QVZV0GWCY1t6UgYK0DBi9FHXwOcJSgGlvJjC-PKGSF6Cf8nekRboryid3Gj6eclIF-ZF48SJR0u-cTl5vjBdG269A5lGNoDyfFqVcwbmm0Xvgszsfb2xymTyphWdG25mEGm2VJX8erl1dzgrUhc0f9gUGr70MXte8WLmZPwgmznb4mAV4RtzS70VgCqIfPF0xQ0MyjOFpiL6MyW1bG0TkPw1n0YtNZIn48MbkuVk5kV4aUl-FpX3V1f2mNbXjyF4M7D8GTCSyhvuD8yQYNFcOn0WR7gXXNwt4ClnrjmkNx1y2E5i8iYiFYy51TRTLmU0STo62LlQ'

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

    console.log("Sending data to: " + url.toString())
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

    console.log("Sending data to: " + url)

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
        console.log("Sending data to: " + url.toString())
    } else {
        url.search = new URLSearchParams(filtersToSend).toString();
        url.search += new URLSearchParams(sortToSend).toString();
        console.log("Sending data to: " + url.toString())
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