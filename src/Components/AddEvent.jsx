import React, { useEffect, useState } from 'react'
import EventService from '../Services/EventService'
import { Link, useParams, useNavigate } from 'react-router-dom'

export const AddEvent = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [maxAttendees, setMaxAttendees] = useState('')
  const [registrationFee, setRegistrationFee] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()
  const changeTitle = () => {
    if (id) {
      console.log('returned title update event.Id value from url: ', { id })
      return <h2 className='text-center'>Update Event</h2>
    } else {
      console.log('returned title add event.id value from url: ', { id })
      return <h2 className='text-center'>Add Event</h2>
    }
  }
  useEffect(() => {
    console.log('use Effect triggered....')
    console.log(' id value obtained from url using useParams() ', id)
    if (id) {
      EventService.getEventById(id).then((response) => {
        console.log('Response received from getbyid API', JSON.stringify(response.data))
        setTitle(response.data.title)
        setDescription(response.data.description)
        setLocation(response.data.location)
        setDate(response.data.date)
        setMaxAttendees(response.data.maxAttendees)
        setRegistrationFee(response.data.registrationFee)
        console.log('State variable changed....')
      })
        .catch(error => { console.log('error received from save api....', error) })
    }
  }, [id])
  const saveOrUpdateEvent = (e) => {
    e.preventDefault()
    const event = { title, description, date, location, maxAttendees, registrationFee }
    console.log('Event object received from form', event)
    if (id) {
      EventService.updateEvent(id, event).then((response) => {
        console.log('Response received from update api.....' + JSON.stringify(response.data))
        navigate('/event')
      })
        .catch(error => { console.log('error received from update api....', error) })
    } else {
      EventService.addEvent(event).then((response) => {
        console.log('Response received from save api.....' + JSON.stringify(response.data))
      })
        .catch(error => { console.log('error received from save api....', error) })
    }
  }
  return (
    <div>
    {console.log('Application Rendered...')}
        <div className='container'>
            <div className='card col-md-6 offset-md-3'>
                {changeTitle()}
                <div className='card-body'>
                <form>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Title</label>
                        <input type='text' placeholder='Enter Event Name' name='title'
                        value={title} className='form-control' onChange={(e) => { setTitle(e.target.value) } }/>
                    </div>

                    <div className='form-group mb-2'>
                    <label className='form-label'>Description</label>
                    <textarea
                      placeholder='Enter Event Description'
                      name='description'
                      value={description}
                      className='form-control'
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className='form-group mb-2'>
                    <label className='form-label'>Date</label>
                    <input
                      type='datetime-local'
                      name='date'
                      value={date}
                      className='form-control'
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className='form-group mb-2'>
                    <label className='form-label'>Location</label>
                    <input
                      type='text'
                      placeholder='Enter Event Location'
                      name='location'
                      value={location}
                      className='form-control'
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className='form-group mb-2'>
                    <label className='form-label'>Max Attendees</label>
                    <input
                      type='number'
                      placeholder='Enter Maximum Attendees'
                      name='maxAttendees'
                      value={maxAttendees}
                      className='form-control'
                      onChange={(e) => setMaxAttendees(e.target.value)}
                    />
                  </div>
                  <div className='form-group mb-2'>
                    <label className='form-label'>Registration Fee</label>
                    <input
                      type='number'
                      step='0.01'
                      placeholder='Enter Registration Fee'
                      name='registrationFee'
                      value={registrationFee}
                      className='form-control'
                      onChange={(e) => setRegistrationFee(e.target.value)}
                    />
                  </div>
                  <button onClick={(e) => saveOrUpdateEvent(e)} className='btn btn-success'>Save Event</button>
                  <Link to="/event" className='btn btn-danger'>Cancel</Link>
                </form>
                </div>
            </div>
        </div>
    </div>
  )
}
