import { EventFilters } from "../model/EventFilters";
import { EventSort } from "../model/EventSort";
import moment from 'moment'
const serverURL = 'http://ec2-54-154-96-2.eu-west-1.compute.amazonaws.com:8080'


const headersAuth = {
    'Authorization': 'Bearer eyJraWQiOiJGQmJURFl2dldtZzlkM3pHRW1xMmZWS29oRDBuVzdUZFwveEZRTzVCR3BEdz0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiRWVBeHI1Rko1cnNNaVBJYkpDSjd1dyIsInN1YiI6IjllNjljNGU2LWY0MGEtNDNkNS1iNWI2LTA2MGQ0ODVlNDdkZCIsImNvZ25pdG86Z3JvdXBzIjpbIlJPTEVfQURNSU4iXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX3AzMEFTbzh1QyIsImNvZ25pdG86dXNlcm5hbWUiOiJzdGVmYW5fYWRtaW4iLCJnaXZlbl9uYW1lIjoiYmIiLCJhdWQiOiIyanFjNDYxb2xhaXFkMmUxMTFzcmlyNHRrMyIsImV2ZW50X2lkIjoiOTA4OTIyMjgtZjI0OS00ZGVkLWFmMzItZTNhOTllMTUzMjg1IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1OTc3NDUxODcsImV4cCI6MTU5Nzc0ODc4NywiaWF0IjoxNTk3NzQ1MTg3LCJmYW1pbHlfbmFtZSI6ImJiIiwiZW1haWwiOiJyYWR1c3RlZmFuMTEyMzU4QGdtYWlsLmNvbSJ9.oETZ4Iiam-wxfmoebzbhFi02N9fmY8Vrs7ue645XmwASEl0A0yZG4jNgPLDeBlTCO-_LnKsfjZbmWY8iBXIvEdoj72T8gHSfr4F9WVjLTW6kxtOr-dOAsz64GYEDzeachS129iUxpBkWr5sFQh1Ac5WgsEpUNLCD5abUqcIpT-A36ga7tS3NAJQlpKNz6T1Ba56gT9d7tZI65XMkpb3840nk_iZIvYwBF8PuVf3vcerueX5ljb9XR5NUaZDSAiV2nB1Gk62NWeuMzd3VrWbcQZFCbmhzpGI_zuWm7wRxuOeaWieMMss-GLWHQGYXyHPFfoT8fyH7lc76vxUDzD56fA'
}

const computeSortQueryString = (sort: EventSort) => {
    let sortToSend: any = {}

    sortToSend['sortCriteria'] = sort.criteria === "occRate" ? "OCCUPANCY_RATE" : sort.criteria.toUpperCase();
    sortToSend['sortType'] = sort.type === "asc" ? 1 : 0;

    return sortToSend;
}

const computeFilterQueryString = (filters: EventFilters) => {
    let filtersToSend: any = {}

    if (filters.title !== '') {
        filtersToSend['title'] = filters.title
    }
    if (filters.subtitle !== '') {
        filtersToSend['subtitle'] = filters.subtitle
    }
    if (filters.status !== 'none') {
        filtersToSend['status'] = filters.status
    }
    if (filters.location !== '') {
        filtersToSend['location'] = filters.location
    }
    if (filters.startDate !== null) {
        filtersToSend['startDate'] = moment(filters.startDate).format("YYYY-MM-DD")
    }
    if (filters.endDate !== null) {
        filtersToSend['endDate'] = moment(filters.endDate).format("YYYY-MM-DD")
    }
    if (filters.rate !== '') {
        filtersToSend['rate'] = filters.rate
        filtersToSend['rateSign'] = filters.rateSign
    }
    if (filters.maxPeople !== '') {
        filtersToSend['maxPeople'] = filters.maxPeople
        filtersToSend['maxPeopleSign'] = filters.maxPeopleSign
    }
    filtersToSend['startHour'] = filters.startHour
    filtersToSend['endHour'] = filters.endHour
    filtersToSend['highlighted'] = filters.highlighted

    return filtersToSend
}

export const fetchFilteredEvents = (filters: EventFilters, page: number) => {
    const filtersToSend = computeFilterQueryString(filters)
    const url = new URL(serverURL + "/events/filter/" + page + "?")

    url.search = new URLSearchParams(filtersToSend).toString();

    console.log("Sending data to: " + url.toString())
    console.log('se trimite', url)
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
    const sortToSend = computeSortQueryString(sort)
    const url = new URL(serverURL + "/events/filter/sort/" + page + "?")

    url.search = new URLSearchParams(filtersToSend).toString();
    url.search += new URLSearchParams(sortToSend).toString();

    console.log("Sending data to: " + url.toString())

    // UNCOMMENT THIS ONLY IF ALL URLS ARE RIGHT
    fetch(`${url}`, { headers: headersAuth })
        .then((response) => response.json())
        .then((json) => {
            return json;
        });
}

export const fetchEvents = () => {
    return fetch(`${serverURL}/events/filter/1`, { headers: headersAuth })
        .then(response => response.json())
        .then(json => {
            console.log('jsonul', json)
            return json;
        });
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
            console.log('helo', json)
            return json;
        });
}