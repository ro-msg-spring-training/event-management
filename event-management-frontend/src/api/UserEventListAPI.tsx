const serverURL = 'http://google.com'

export const fetchEvents = (page: number, limit: number) => {
    const url = `${serverURL}/events/?page=${page}&limit=${limit}`

    console.log('URL', url)

    return fetch(url)
        .then((response) => response.json())
        .then((json) => {
            return json;
        });
}