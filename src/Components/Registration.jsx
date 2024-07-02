import React,{useEffect, useState} from 'react';
import { useLocation,useParams,useNavigate } from 'react-router-dom';
import { createRegistration,getEventDetails } from '../lib/appwrite';

const RegistrationForm = () => {
  const location = useLocation();
  const {eventId,userId} = useParams();
  const [event, setEvent] = useState(null);
  const [image2, setImage2] = useState('');
  console.log(eventId,userId);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchEventDetails = async () => {
        try {
            const eventDetails = await getEventDetails(eventId); // Fetch event details using eventId
            setEvent(eventDetails); // Set event details to state
            console.log('Event Details:', eventDetails);
            if (eventDetails.images && eventDetails.images.length >= 3) {
                setImage2(eventDetails.images[1]);
                console.log('Images:',  image2);
            } else {
                //console.error('Error: Not enough images available');
            }
        } catch (error) {
            console.error('Error fetching event details:', error);
        }
    };
    fetchEventDetails();
}, [eventId]);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    birthDate: '',
    gender: 'male',
    address: '',
    city: '',
    specialRequirements: '',
    userId:`${userId}`,
    eventId:`${eventId}`
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform any necessary actions with the form data, such as submitting it to a server
    try {
      // Create the registration
      createRegistration(formData, eventId);
      // Display registration confirmation alert
      alert('Registration successful!');
      // Redirect to the home page
      navigate(`/home/${userId}`);
    } catch (error) {
      console.error('Error registering:', error);
    }
  };
  return (
    <>
    <div className='app'></div>
    <div className='registration '>
    <section className="registration-container card ">
      <header>Registration Form</header>
      <form className="registration-form " action="#" onSubmit={handleSubmit}>
        <div className="registration-input-box">
          <label>Full Name</label>
          <input 
          required 
          placeholder="Enter full name" 
          type="text" 
          name='fullName'
          value={formData.fullName}
          onChange={handleInputChange}
          />
        </div>
        <div className="registration-column">
          <div className="registration-input-box">
            <label>Phone Number</label>
            <input 
            required 
            placeholder="Enter phone number" 
            type="tel" 
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleInputChange}
            />
          </div>
          <div className="registration-input-box">
            <label>Birth Date</label>
            <input 
            required 
            placeholder="Enter birth date" 
            type="date" 
            name='birthDate'
            value={formData.birthDate}
            onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="registration-gender-box">
          <label>Gender</label>
          <div className="registration-gender-option">
          <div className="registration-gender">
  <input
    name="gender"
    id="check-male"
    type="radio"
    value="male"
    checked={formData.gender === 'male'}
    onChange={handleInputChange}
  />
  <label htmlFor="check-male">Male</label>
</div>
<div className="registration-gender">
  <input
    name="gender"
    id="check-female"
    type="radio"
    value="female"
    checked={formData.gender === 'female'}
    onChange={handleInputChange}
  />
  <label htmlFor="check-female">Female</label>
</div>
<div className="registration-gender">
  <input
    name="gender"
    id="check-other"
    type="radio"
    value="preferNotToSay"
    checked={formData.gender === 'preferNotToSay'}
    onChange={handleInputChange}
  />
  <label htmlFor="check-other">Prefer not to say</label>
</div>

          </div>
        </div>
        <div className="registration-input-box registration-address">
          <label>Address</label>
          <input 
          required 
          placeholder="Enter street address" 
          type="text" 
          name='address'
          value={formData.address}
          onChange={handleInputChange}
          />
          <div className="registration-column">
            <input 
            required 
            placeholder="Enter your city" 
            type="text" 
            name='city'
            value={formData.city}
            onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="registration-input-box">
          <label>Special Requirements</label>
          <input 
          required 
          placeholder="Enter Special Requirements (if any)" 
          type="text" 
          name='specialRequirements'
          value={formData.specialRequirements}
          onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
    <div className="event-details-container" style={{ backgroundImage: `url(${image2})` }}>
        <div className="event-details-overlay">
          {event && (
            <div className="registration-event-details">
              <h1>{event.name}</h1>
              <h3>{event.description}</h3>
              <h3>Date: {event.date}</h3>
              <h3>Time: {event.time}</h3>
              <h3>Venue: {event.location}</h3>
              {/* Add other event details */}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default RegistrationForm;
