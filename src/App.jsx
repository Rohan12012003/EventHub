import React, { useState } from 'react';
import { account, ID } from './lib/appwrite';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './Components/Login.jsx';
import Home from './Components/Home.jsx';
import Registration from './Components/Registration.jsx';
import Eventpage from './Components/Eventpage.jsx';
import CreateEvent from './Components/CreateEvent.jsx';
import ManageEvent from './Components/ManageEvent.jsx';
import Signup from './Components/Signup.jsx';
import Navbar from './Components/Navbar.jsx';
import MyRegistration from './Components/MyRegistration.jsx';
const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  async function login(email, password) {
    await account.createEmailSession(email, password);
    setLoggedInUser(await account.get());
  }

  async function Register(){
    await account.create(ID.unique(), email, password, name);
    login(email, password);
  };

  async function Logout(){
    await account.deleteSession('current');
    setLoggedInUser(null);
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/signup' element={<Signup />} />
        <Route path='/home/:userId' element={<Home />}/>
        <Route exact path="/events/:eventId/:userId" element={<Eventpage />} />
        <Route path='/registration/:eventId/:userId' element={<Registration/>}/>
        <Route path='/createevent/:userId' element={<CreateEvent />}/>
        <Route path='/manageevent/:eventId/:userId' element={<ManageEvent />}/>
        <Route path='/registrations/:userId' element={<MyRegistration />} />
      </Routes>
    </Router>
  );
};

export default App;
