import axios from 'axios'

const BASE_REST_API_URL = 'http://localhost:8080/api/events/'
class EventService {
  getAllEvents () { // return axios.get(BASE_REST_API_URL + 'eventsList')
    const url = BASE_REST_API_URL + 'eventsList'
    console.log('Fetching events from:', url) // Logging the complete URL
    return axios.get(url)
  }

  addEvent (event) {
    const url = BASE_REST_API_URL + 'create'
    console.log('Adding event at URL:', url)
    return axios.post(url, event)
    // return axios.post(BASE_REST_API_URL + 'create', event)
  }

  getEventById (id) {
    const url = BASE_REST_API_URL + 'get/' + id
    console.log('Adding event at URL:', url)
    return axios.get(url)
  }

  updateEvent (id, event) {
    const url = BASE_REST_API_URL + 'update/' + id
    console.log('Adding event at URL:', url)
    return axios.put(url, event)
  }

  deleteEvent (id, event) {
    const url = BASE_REST_API_URL + 'delete/' + id
    console.log('Adding event at URL:', url)
    return axios.delete(url, event)
  }
}
export default new EventService()
