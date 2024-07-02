import React from 'react';

const Carousel = ({ events }) => {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" style={{'marginTop':'10px'}}>
      <ol className="carousel-indicators">
        {events.map((event, index) => (
          <li key={index} data-target="#carouselExampleIndicators" data-slide-to={index} className={index === 0 ? "active" : ""}></li>
        ))}
      </ol>
      <div className="carousel-inner">
        {events.map((event, index) => (
          <div key={index} className={"carousel-item" + (index === 0 ? " active" : "")} style={{ height: '300px' }}>
            <img className="d-block w-100" src={event.images[0]} alt={event.name} style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
            <div className="carousel-caption d-none d-md-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px', borderRadius: '5px', color: '#fff' }}>
              <h5>{event.name}</h5>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default Carousel;
