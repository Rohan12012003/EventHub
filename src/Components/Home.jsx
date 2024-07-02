import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { listsEvents, getUserDetails } from '../lib/appwrite'; 
import { useParams, useNavigate } from 'react-router-dom';
import AllDayEvents from './AllDayEvents';
import { Parallax } from 'react-parallax';
import home_image from '../Images/home.jpg';
const Home = () => {
  const [events, setEvents] = useState([]);
  const [allDayEvents, setAllDayEvents] = useState([]);
  const [carousel, setCarousel] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await listsEvents();
        const filteredAllDayEvents = eventsData.filter(event => event.category === 'alldayevents');
        const carouselEvents = eventsData.filter(event => event.category === 'Carousel');
        const otherEvents = eventsData.filter(event => event.category !== 'alldayevents' && event.category !== 'Carousel');
        
        setEvents(otherEvents);
        setCarousel(carouselEvents);
        setAllDayEvents(filteredAllDayEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const user = await getUserDetails(userId);
        if (user.role === 'admin') {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchEvents();
    fetchUserDetails();
  }, [userId]);

  const handleClick = () => {
    navigate(`/createevent/${userId}`);
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className='row home'>
      <div
        className='home-home'
        style={{
          backgroundImage: `url(${home_image})`,
          backgroundSize: 'cover', // Ensure the image covers the div
          backgroundPosition: 'center', // Center the image
          backgroundRepeat: 'no-repeat', // Prevent the image from repeating
          height: '100vh', // Set the height to full viewport height
          width: '100%', // Set the width to full viewport width
          zIndex: 2
        }}
      >
      <h1>Get ready to discover unforgettable events!</h1>
      
      </div>

      {/*<Carousel  events={carousel}/>*/}
      <div className=" row col-12 event-grid all-day-events-grid ">
      <h1 className='col-12'>Upcoming Events</h1>
        {allDayEvents.length > 0 ? (
          allDayEvents.map(event => (
            <AllDayEvents
              key={event.$id}
              eventname={event.name}
              date={event.date}
              details={event.description}
              images={event.images}
              eventId={event.$id}
              userId={userId}
              className="all-day-event"
            />
          ))
        ): (
          <p>No all day events found</p>
        )}
        <div className='app col-12'></div>
      </div>
      <div className="row col-12 event-grid grid">
      <h1 className='col-12'>All Events</h1>
        {events.length > 0 ? (
          events.map(event => (
            <EventCard
              key={event.$id}
              eventname={event.name}
              date={event.date}
              details={event.description}
              images={event.images}
              eventId={event.$id}
              userId={userId}
            />
          ))
        ) : (
          <p>No events found</p>
        )}
        <div className='app col-12'></div>
      </div>
      
      {!isAdmin && <button className='btn btn-sm addevent-btn' onClick={handleClick}>ADD EVENT</button>}
    </div>
  );
};

export default Home;
