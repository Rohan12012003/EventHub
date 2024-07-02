import React from 'react';

const AllDayEvents = ({ eventname, date, details, images }) => {
  return (
    <div className="alldayevents-card" >
      <img className="alldayevents-card-image" src={images[2]} alt="Event Background" />
      <img className="alldayevents-overlay-image" src={images[3]} alt="Overlay" />
      <h6 className='alldayevents-label'>{eventname},</h6>
      <h6 className='alldayevents-label' style={{'fontSize':'25px'}}>{date}</h6>
      <b></b>
      <div className="alldayevents-content">
        <p className="alldayevents-title">{details}<br /><span></span></p>
        <div>
          <button className="alldayevents-button">
            Book Tickets Now
          </button>
          <span className="alldayevents-backdrop"></span>
        </div>
      </div>
    </div>
  );
}

export default AllDayEvents;
