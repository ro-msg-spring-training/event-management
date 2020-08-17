import {EventFilters} from "../model/EventFilters";
import {EventSort} from "../model/EventSort";
import moment from 'moment'
const eventsUrl = 'http://localhost:8080/events/filter';
const mockUrlProducts = 'http://localhost:4000/products';
const serverURL = ''


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
        filtersToSend['startDate'] = moment(filters.startDate ).format("YYYY-MM-DD") 
    }
    if (filters.endDate !== null) {
        filtersToSend['endDate'] = moment(filters.endDate ).format("YYYY-MM-DD") 
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
    const url = new URL(eventsUrl + "/" + page + "?")

    url.search = new URLSearchParams(filtersToSend).toString();

    console.log("Sending data to: " + url.toString())

    // UNCOMMENT THIS ONLY IF ALL URLS ARE RIGHT
    /* return fetch(url.toString())
        .then(response => response.json(), )*/
}


export const fetchSortedEvents = (sort: EventSort, filters: EventFilters, page: number) => {
    const filtersToSend = computeFilterQueryString(filters)
    const sortToSend = computeSortQueryString(sort)
    const url = new URL(eventsUrl + "/sort/" + page + "?")

    url.search = new URLSearchParams(filtersToSend).toString();
    url.search += new URLSearchParams(sortToSend).toString();

    console.log("Sending data to: " + url.toString())

    // UNCOMMENT THIS ONLY IF ALL URLS ARE RIGHT
    /*fetch(url.toString())
        .then(response => response.json())*/
}

export const fetchEvents = () => {
    return fetch(mockUrlProducts)
        .then(response => response.json());
}

export const changePage = (filters: EventFilters, sort: EventSort, page: number) => {
    const filtersToSend = computeFilterQueryString(filters)
    const sortToSend = computeSortQueryString(sort)

    if (sort.criteria === "") {
        const url = new URL(eventsUrl + "/" + page + "?")

        url.search = new URLSearchParams(filtersToSend).toString();

        console.log("Sending data to: " + url.toString())
    } else {
        const url = new URL(eventsUrl + "/sort/" + page + "?")

        url.search = new URLSearchParams(filtersToSend).toString();
        url.search += new URLSearchParams(sortToSend).toString();

        console.log("Sending data to: " + url.toString())
    }

    // UNCOMMENT THIS ONLY IF ALL URLS ARE RIGHT
    /*fetch(url.toString())
        .then(response => response.json())*/
}