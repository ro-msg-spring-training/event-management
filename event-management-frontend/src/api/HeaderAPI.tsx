interface IProductBase{
  name: string,
  category: string,
  image: string,
  description: string,
}

export interface IProductDetailsReady extends IProductBase{
  id: number,
  price: number
}

export const fetchEventAPI = (id: string) => {
  return fetch(`http://localhost:4000/products/${id}`).then(response => response.json())
}

export const deleteEventAPI = (id: string) => {
  console.log("DELETED");
  return fetch(`http://localhost:4000/products/${id}`, { method: 'DELETE' })
}

export const addEventAPI = (event: IProductDetailsReady) => {
  console.log("addEventAPI");
  return fetch('http://localhost:4000/products', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  }).then(response => response.json())
}