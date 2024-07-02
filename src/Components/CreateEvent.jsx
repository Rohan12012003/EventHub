import React, { useState, useEffect } from 'react';
import { createEvent } from '../lib/appwrite'; // Import the createEvent function from your API
import { useNavigate, useParams } from 'react-router-dom';

const CreateEvent = () => {
  const {userId} = useParams();
  // State variables for form inputs and images
  const navigate= useNavigate();
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventImages, setEventImages] = useState([]);
  const [eventCategory, setEventCategory] = useState('');
  const [eventOrganizer, setEventOrganizer] = useState('');
  const [bigDescription, setBigDescription] = useState('');
  
  // useEffect to handle changes in input values
  useEffect(() => {
    // No need to change for images as it's already an array
  }, [eventImages]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call createEvent function with form data
    try {
      const response = await createEvent({
        name: eventName,
        date: eventDate,
        time: eventTime,
        location: eventLocation,
        description: eventDescription,
        images: eventImages,
        category: eventCategory,
        organizer: eventOrganizer,
        bigDescription:bigDescription
      });
      console.log(response); // Log the response
      navigate(`/home/${userId}`);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <>
    <div className='app'></div>
    <div className="create-container " style={{overflowY:'hidden'}} >
      <form className="createForm-form card box" onSubmit={handleSubmit}>
        <p className="createForm-title">Create New Event</p>
        <label>
          <input className="createForm-input" type="text" placeholder="" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
          <span>Name</span>
        </label>
        <div className="createForm-flex">
          <label>
            <input className="createForm-input" type="text" placeholder="" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
            <span>Date</span>
          </label>
          <label>
            <input className="createForm-input" type="text" placeholder="" value={eventTime} onChange={(e) => setEventTime(e.target.value)} required />
            <span>Time</span>
          </label>
        </div>
        <label>
          <input className="createForm-input" type="text" placeholder="" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} required />
          <span>Location</span>
        </label>
        <label>
          <input className="createForm-input" type="text" placeholder="" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} required />
          <span>Description</span>
        </label>
        <div className="createForm-flex">
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
        <label>
          <input className="createForm-input" type="text" placeholder="" value={eventCategory} onChange={(e) => setEventCategory(e.target.value)} required />
          <span>Category</span>
        </label>
        <label>
          <input className="createForm-input" type="text" placeholder="" value={eventOrganizer} onChange={(e) => setEventOrganizer(e.target.value)} required />
          <span>Organizer</span>
        </label>
        <label>
          <input className="createForm-input" type="text" placeholder="" value={bigDescription} onChange={(e) => setBigDescription(e.target.value)} required />
          <span>Big Description</span>
        </label>
        <button className="createForm-submit" type="submit">Create</button>
      </form>
    </div>
    </>
  );
};

export default CreateEvent;
