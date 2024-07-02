import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventDetails,getUserDetails } from '../lib/appwrite';
 
const Eventpage = () => {
    const { eventId, userId } = useParams(); // Extract the eventId and userId from the URL
    const [event, setEvent] = useState(null);
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const navigate = useNavigate();
    //console.log(eventId, userId);
    const [isadmin,setIsAdmin]=useState(false);
    
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const eventDetails = await getEventDetails(eventId); // Fetch event details using eventId
                setEvent(eventDetails); // Set event details to state
                //console.log('Event Details:', eventDetails);

                if (eventDetails.images && eventDetails.images.length >= 3) {
                    setImage1(eventDetails.images[0]);
                    setImage2(eventDetails.images[1]);
                    setImage3(eventDetails.images[2]);
                    //console.log('Images:', image1, image2, image3);
                } else {
                    //console.error('Error: Not enough images available');
                }
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };

        fetchEventDetails();

        const fetchUserDetails = async () => {
            try {
              const user =await getUserDetails(userId);
              //console.log(user);
              if(user.role=='admin')
                setIsAdmin(true);
              //console.log(isadmin);
            } catch (error) {
              console.error('Error fetching user details:', error);
            }
          };

        fetchUserDetails();
    }, [eventId,userId]);

    function handleClick() {
        navigate(`/registration/${eventId}/${userId}`); // Include userId in the navigation URL
    }

    function handleClick2(){
        navigate(`/manageevent/${eventId}/${userId}`);
    }

    return (
        <div>
            <div className='app'></div>
            <div className="eventpage-card">
                <p style={{ backgroundImage: `url(${image1})` }}></p>
                <p style={{ backgroundImage: `url(${image2})` }}></p>
                <p style={{ backgroundImage: `url(${image3})` }}></p>
            </div>
            {event && (
                <div className="eventpage2-card eventpage2-details">
                    <div className="eventpage2-circle"></div>
                    <div className="eventpage2-circle"></div>
                    <div className="eventpage2-card-inner">
                        <h1>Event Name: {event.name}</h1>
                        <h3>{event.bigDescription}</h3>
                        <div className="eventpage2-details">
                            <div className="">
                                <h3>Date: {event.date}</h3>
                                <h3>Time: {event.time}</h3>
                            </div>
                            <div className="">
                                <h3>Venue: {event.location}</h3>
                                <h3>Category: {event.category}</h3>
                            </div>
                            <div className="">
                                <h3>Organizer: {event.organizer}</h3>
                            </div>                           
                        </div>
                        <button className="btn btn-sm" onClick={handleClick}>Register</button>
                        {isadmin && <button className="btn btn-sm" onClick={handleClick2}>Manage Event</button>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Eventpage;
