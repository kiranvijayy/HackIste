import React, { useState } from 'react';
import './Reg.css';
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdPassword, MdEmail } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

function Reg() {
  const [username, setUsername] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [classi, setClassi] = useState('');
  const [Email, setEmail] = useState('');
  const [ph, setPh] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Handle form submission (without backend interaction)
  function handleReg(e) {
    e.preventDefault();
  
    // Clear previous messages
    setErrorMsg('');
    setSuccessMsg('');
  
    // Simple front-end validation
    if (!Email || !username || !createPassword || !confirmPassword || !classi || !ph) {
      setErrorMsg('Please fill in all fields');
    } else if (createPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match');
    } else {
      // Data to be sent to the backend
      const formData = {
        username,
        email: Email,
        password: createPassword,
        class: classi,
        phone: ph,
      };
  
      // Perform the POST request using fetch
      fetch('https://your-backend-api.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setSuccessMsg('Registration successful!');
          } else {
            setErrorMsg(data.message || 'Registration failed');
          }
        })
        .catch((error) => {
          setErrorMsg('An error occurred. Please try again.');
          console.error('Error:', error);
        });
    }
  }

  // Clear messages when close icon is clicked
  function handleMsg() {
    setErrorMsg('');
    setSuccessMsg('');
  }

  return (
    <div className='outerdiv'>
      <div className='Reg'>
        <div className='maindiv'>
          <div className='leftdiv'>
            <h1 style={{ color: '#1a2a4e' }}>Register</h1>

            {/* Email Input */}
            <div className='inp'>
              <MdEmail className='user' />
              <input type='text' placeholder='Email' className='inp11' onChange={(e) => setEmail(e.target.value)} />
            </div>

            {/* Username Input */}
            <div className='inp'>
              <CiUser className='user' />
              <input type='text' placeholder='Username' className='inp11' value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            {/* Create Password Input */}
            <div className='inp'>
              <RiLockPasswordLine className='user' />
              <input type='password' placeholder='Create Password' className='inp11' value={createPassword} onChange={(e) => setCreatePassword(e.target.value)} />
            </div>

            {/* Confirm Password Input */}
            <div className='inp'>
              <RiLockPasswordLine className='user' />
              <input type='password' placeholder='Confirm Password' className='inp11' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>

            {/* Class Input */}
            <div className='inp'>
              <MdPassword className='user' />
              <input type='text' placeholder='Class' className='inp11' value={classi} onChange={(e) => setClassi(e.target.value)} />
            </div>

            {/* Phone Number Input */}
            <div className='inp'>
              <MdPassword className='user' />
              <input type='text' placeholder='Phone Number' className='inp11' value={ph} onChange={(e) => setPh(e.target.value)} />
            </div>

            {/* Register Button */}
            <button className='btns' onClick={handleReg}>Register Now</button>
          </div>

          {/* Right Div for the Image */}
          <div className='rightdivv'>
            <img className='img1' alt='register' />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className='errordiv'>
          <p style={{ textAlign: 'center' }}>{errorMsg}</p>
          <RxCross2 className='cross' onClick={handleMsg} />
        </div>
      )}

      {/* Success Message */}
      {successMsg && (
        <div className='successdiv'>
          <p style={{ textAlign: 'center' }}>{successMsg}</p>
          <RxCross2 className='cross' onClick={handleMsg} />
        </div>
      )}
    </div>
  );
}

export default Reg;
