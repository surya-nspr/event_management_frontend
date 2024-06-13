import React, { useEffect, useState } from 'react'
import EventService from '../Services/EventService'
import { Link, useNavigate } from 'react-router-dom'

const ListEvents = () => {
  const [eventArray, setEventArray] = useState([])
  const navigate = useNavigate()
  // const [status, setstatus] = false
  const deleteEvent = (id) => {
    console.log('Delete employee handler fired. id value received: ', id)
    EventService.deleteEvent(id).then((response) => {
      console.log('Response received from delete api.....' + JSON.stringify(response.data))
      fetchAllEvents()
      // setstatus(!status)
    })
      .catch(error => { console.log('error received from delete api....', error) })
  }
  const fetchAllEvents = () => {
    console.log('Fetch all Events Fired...')
    EventService.getAllEvents().then((response) => {
      setEventArray(response.data)
      console.log('Response received from API', response.data)
    })
  }
  useEffect(() => {
    fetchAllEvents()
  }, [])
  return (
    <div className='container'>
    {console.log('Application has rendered....')}
      <h2 className='text-center'>Event Data</h2>
      <Link to='/addEvent' className='btn btn-primary'>Add Event</Link>
      <table className="table table-bordered table-info r table-striped">
        <thead>
        <tr className='table-warning'>
          <th>id</th>
          <th>Title</th>
          <th>Description</th>
          <th>Update</th>
          <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            eventArray.map((data, key) => <tr key={key}>
              <td>{data.id}</td>
              <td>{data.title}</td>
              <td>{data.description}</td>
              <td><Link to={`/update/${data.id}`} className='btn btn-success'>Update</Link></td>
              <td><button className='btn btn-danger' onClick={() => deleteEvent(data.id)}>Delete</button></td>
            </tr>)
          }
        </tbody>
      </table>
      </div>
  )
}

export default ListEvents
