import React from 'react';
import { Link, useParams } from 'react-router-dom';

const EventCard = ({eventId, eventname, date, details, images ,userId}) => {
  //console.log(userId);
  return (
    <Link to={`/events/${eventId}/${userId}`} className="eventcard-card">
      <div className="eventcard-card-image" style={{ backgroundImage: `url(${images[0]})` }}></div>
      <p className="eventcard-card-title">{eventname}</p>
      <p style={{'fontSize':'10px','marginLeft':'10px'}}>Event ID:{eventId}</p>
      <p className="eventcard-card-body">{details}</p>
      <p className="eventcard-footer">
        <span className="eventcard-date">{date}</span>
      </p>
    </Link>
  );
};

export default EventCard;
