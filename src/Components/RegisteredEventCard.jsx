import React from 'react'

const RegisteredEventCard = ({event}) => {
  return (
    <>
        <div className="myregistration-card">
            <div className="myregistration-img">
                <img src={event.images[1]} />
            </div>
            <div className="myregistration-text">
                <p className="myregistration-h3">{event.name}</p>
                <p className="myregistration-h3"> {event.date}</p>
                <p className="myregistration-h3">{event.time}</p>
            </div>
        </div>
    </>
  )
}

export default RegisteredEventCard