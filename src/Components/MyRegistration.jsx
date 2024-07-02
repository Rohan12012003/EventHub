import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRegistration, listsEvents } from '../lib/appwrite';
import RegisteredEventCard from './RegisteredEventCard';

const MyRegistration = () => {
    const { userId } = useParams();
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    console.log(filteredEvents)
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch registration data
                const eventsData = await getRegistration();
                // Filter events based on userId
                const filtered = eventsData.filter(event => event.userId === userId);
                setEvents(filtered);
    
                // Fetch all events
                const allEvents = await listsEvents();
    
                // Filter events based on the IDs of filtered events
                const filteredEventsData = allEvents.filter(event => {
                    // Using nested filter to find matching event in events array
                    const matchingEvents = events.filter(filteredEvent => filteredEvent.eventId === event.$id);
                    // If matchingEvents array has at least one element, return true to include the current event
                    return matchingEvents.length > 0;
                });
                
                setFilteredEvents(filteredEventsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [userId]);
    

    return (
        <>
            <h1 style={{marginLeft:'20px'}}>My Registrations</h1>
            <div className='event-grid'>
                {filteredEvents.map(event => (
                    <RegisteredEventCard key={event.$id} event={event}/>
                ))}
            </div>
        </>
    );
    
};

export default MyRegistration;
