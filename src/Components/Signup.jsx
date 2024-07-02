import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { account, createUserDocument } from '../lib/appwrite';
import events from '../Components/events.png'
const Signup = () => {

     const [loggedInUser, setLoggedInUser] = useState(null);
     const [userName,setUserName]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate= useNavigate();

  useEffect(() => {
    if(loggedInUser)
    console.log('loggedInUser:', loggedInUser.$id);
  }, [loggedInUser]);

  async function signup(email, password,userName) {
    console.log(email,password,userName);
    await account.createEmailSession(email, password);
    
    setLoggedInUser(await account.get());
    console.log(loggedInUser);
    await createUserDocument({emailid:email,username:userName,accountid:loggedInUser.$id}); 
    //createUserDocument({emailid:email,accountid:`${loggedInUser.$id}`})
   if(loggedInUser!=null)
   navigate(`/`);
  }


  return (
    <div className="login-card row">
    <div className='col-7 login-image signup-image' style={{'color':'white'}}>
          <img src={events} alt='events'/>
      </div>
      <div className="login-card2 col-5">
        <form className="login-form" >
          <p id="login-heading">Welcome to EventHub</p>
          <div className="login-field">
            <input 
              type="email" 
              className="login-input-field" 
              placeholder="Username" 
              value={userName} 
              onChange={e=>{setUserName(e.target.value)}}
            />
          </div>
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
            <button className="login-button1" onClick={(e) => { e.preventDefault(); signup(email, password,userName); }}>SignUp</button>
          </div>
          <p style={{color:'black'}}>Allready have an Accoun ? <Link to={'/'} style={{color:'black'}}>Login..</Link> </p>
        </form>
      </div>
    </div>
  )
}

export default Signup