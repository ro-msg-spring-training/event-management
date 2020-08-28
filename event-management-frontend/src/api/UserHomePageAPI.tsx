import { serverURL, headersAuth } from "./Api";
import { fetchWrapper } from "./FetchWrapper";

export const fetchBookings = () => {
    let url = `${serverURL}/bookings`
    const urlOptions = { headers: headersAuth };

    return fetchWrapper(url, urlOptions)
        .then((response) => response.json())
        .then((json) => {
            return convertToBooking(json);
        });
}

export const fetchPastEvents = (page: number, limit: number) => {
    let url = `${serverURL}/events/user/past?page=${page}&size=${limit}`
    const urlOptions = { headers: headersAuth };

    return fetchWrapper(url, urlOptions)
        .then((response) => response.json())
        .then((json) => {
            return json;
        });
}

export const fetchUpcomingEvents = (page: number, limit: number) => {
    let url = `${serverURL}/events/user/past?page=${page}&size=${limit}`
    const urlOptions = { headers: headersAuth };

    return fetchWrapper(url, urlOptions)
        .then((response) => response.json())
        .then((json) => {
            return json;
        });
}

const convertToBooking = (bookings_from_server: any) => {
    let bookings: any[] = [];
    bookings_from_server.forEach((booking: any) => {
        const result = booking.list.map((date: string) => {
            return {
                id: booking.id,
                date: date,
                title: booking.title
            }
        })
        bookings = bookings.concat(result)
    })
    return bookings
}