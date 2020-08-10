import { EventFiltersProps } from "../types/EventFiltersProps";

const eventsUrl = 'http://localhost:4000/events';

const computeFilterQueryString = (filters: EventFiltersProps) => {
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
        filtersToSend['startDate'] = filters.startDate 
    }
    if (filters.endDate !== null) {
        filtersToSend['endDate'] = filters.endDate 
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

export const fetchFilteredEvents = (filters: EventFiltersProps) => {
    const filtersToSend = computeFilterQueryString(filters)
    const url = new URL(eventsUrl)
    url.search = new URLSearchParams(filtersToSend).toString();

    return fetch(url.toString())
        .then(response => response.json())
}