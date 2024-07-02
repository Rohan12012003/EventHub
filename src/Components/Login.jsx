import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { account,  } from '../lib/appwrite';
import events from '../Components/events.png'
import { createUserDocument } from '../lib/appwrite';
const Login = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate= useNavigate();

  useEffect(() => {
    if(loggedInUser)
    console.log('loggedInUser:', loggedInUser.$id);
  }, [loggedInUser]);

  async function login(email, password) {
    console.log(email,password);
    await account.createEmailSession(email, password);
    setLoggedInUser(await account.get());
    await account.deleteSession('current')
    //createUserDocument({emailid:email,accountid:`${loggedInUser.$id}`})
   if(loggedInUser!=null)
   navigate(`/home/${loggedInUser.$id}`);
  }

  return (
    <div className="login-card row ">
      <div className="login-card2 col-5">
        <form className="login-form" >
          <p id="login-heading">Welcome to EventHub</p>
          <div className="login-field">
            <input 
              type="email" 
              className="login-input-field" 
              placeholder="Email" 
              value={email} 
              onChange={e=>{setEmail(e.target.value)}}
            />
          </div>
          <div className="login-field">
            <input 
              type="password" 
              className="login-input-field" 
              placeholder="Password" 
              value={password} 
              onChange={e=>{setPassword(e.target.value)}}
            />
          </div>
          <div className="btn">
            <button className="login-button1" onClick={(e) => { e.preventDefault(); login(email, password); }}>Login</button>
          </div>
          <p>Don't have an Accoun ? <Link to={'/signup'}>Signup..</Link> </p>
        </form>
      </div>
      <div className='col-7 login-image' style={{'color':'white'}}>
          <img src={events} alt='events'/>
      </div>
    </div>
  );
};

export default Login;
