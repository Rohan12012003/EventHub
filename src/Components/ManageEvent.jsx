import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { getEventDetails, editEvent } from '../lib/appwrite';

const ManageEvent = () => {
    const { eventId,userId } = useParams();
    const navigate = useNavigate();
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventImages, setEventImages] = useState([]);
    const [eventCategory, setEventCategory] = useState('');
    const [eventOrganizer, setEventOrganizer] = useState('');
    const [bigDescription, setBigDescription] = useState('');

    useEffect(() => {
        async function fetchEventDetails() {
            try {
                const eventDetails = await getEventDetails(eventId);
                setEventName(eventDetails.name);
                setEventDate(eventDetails.date);
                setEventTime(eventDetails.time);
                setEventLocation(eventDetails.location);
                setEventDescription(eventDetails.description);
                setEventImages(eventDetails.images);
                setEventCategory(eventDetails.category);
                setEventOrganizer(eventDetails.organizer);
                setBigDescription(eventDetails.bigDescription);
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        }
        fetchEventDetails();
    }, [eventId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await editEvent(eventId, {
                name: eventName,
                date: eventDate,
                time: eventTime,
                location: eventLocation,
                description: eventDescription,
                images: eventImages,
                category: eventCategory,
                organizer: eventOrganizer,
                bigDescription: bigDescription
            });
            console.log(response);
            if(response)
            navigate(`/home/${userId}`)
        } catch (error) {
            console.error('Error editing event:', error);
        }
    };

    return (
        <>
        <div className='app'></div>
        <div className='editevent-card' style={{  overflowY: 'auto',scrollBehavior: 'smooth'}}>
            <h1 style={{color:'white'}}>Edit Event</h1>
            <form className="card createForm-form editevent-form" onSubmit={handleSubmit}>
                <h1></h1>
                <label>
                    <input className="createForm-input" type="text" placeholder="" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
                    <span>Name</span>
                </label>
                {/* Add margin to all sides */}
                <div className="createForm-flex" style={{ margin: '5px' }}>
                    <label>
                        <input className="createForm-input" type="text" placeholder="" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
                        <span>Date</span>
                    </label>
                    <label>
                        <input className="createForm-input" type="text" placeholder="" value={eventTime} onChange={(e) => setEventTime(e.target.value)} required />
                        <span>Time</span>
                    </label>
                </div>
                {/* Add margin to all sides */}
                <label style={{ margin: '5px' }}>
                    <input className="createForm-input" type="text" placeholder="" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} required />
                    <span>Location</span>
                </label>
                {/* Add margin to all sides */}
                <label style={{ margin: '5px' }}>
                    <input className="createForm-input" type="text" placeholder="" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} required />
                    <span>Description</span>
                </label>
                {/* Add margin to all sides */}
                <div className="createForm-flex" style={{ margin: '5px' }}>
                    <label>
                        <input className="createForm-input" type="url" placeholder="" value={eventImages[0]} onChange={(e) => setEventImages([e.target.value, eventImages[1], eventImages[2]])} required />
                        <span>Image1</span>
                    </label>
                    <label>
                        <input className="createForm-input" type="url" placeholder="" value={eventImages[1]} onChange={(e) => setEventImages([eventImages[0], e.target.value, eventImages[2]])} required />
                        <span>Image2</span>
                    </label>
                    <label>
                        <input className="createForm-input" type="url" placeholder="" value={eventImages[2]} onChange={(e) => setEventImages([eventImages[0], eventImages[1], e.target.value])} required />
                        <span>Image3</span>
                    </label>
                </div>
                {/* Add margin to all sides */}
                <label style={{ margin: '5px' }}>
                    <input className="createForm-input" type="text" placeholder="" value={eventCategory} onChange={(e) => setEventCategory(e.target.value)} required />
                    <span>Category</span>
                </label>
                {/* Add margin to all sides */}
                <label style={{ margin: '5px' }}>
                    <input className="createForm-input" type="text" placeholder="" value={eventOrganizer} onChange={(e) => setEventOrganizer(e.target.value)} required />
                    <span>Organizer</span>
                </label>
                {/* Add margin to all sides */}
                <label style={{ margin: '5px' }}>
                    <input className="createForm-input" type="text" placeholder="" value={bigDescription} onChange={(e) => setBigDescription(e.target.value)} required />
                    <span>Big Description</span>
                </label>
                {/* Add margin to all sides */}
                <button className="createForm-submit" type="submit">Edit</button>
            </form>
        </div>
        </>
    );
};

export default ManageEvent;
