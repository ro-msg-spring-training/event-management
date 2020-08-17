import { EventCrud } from "../model/EventCrud";

export const fetchEventAPI = (id: string) => {
  return fetch(`http://localhost:4000/products/${id}`).then(response => response.json())
}

export const deleteEventAPI = (id: string) => {
  return fetch(`http://localhost:4000/products/${id}`, { method: 'DELETE' })
}

export const addEventAPI = (event: EventCrud) => {
  return fetch('http://localhost:4000/products', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  }).then(response => response.json())
}