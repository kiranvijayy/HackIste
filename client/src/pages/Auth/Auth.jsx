import React, { useState } from 'react';
import './auth.css';
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle login form submission (without backend interaction)
  function handleAuth(e) {
    e.preventDefault();

    // Simple front-end validation
    if (!username || !password) {
      setError('Please enter both username and password');
    } else {
      setError(''); // Clear the error if both fields are provided
      alert('Login successful!'); // Mock successful login
    }
  }

  // Clear the error message when the close icon is clicked
  function handleMsg() {
    setError('');
  }

  return (
    <div className="login">
      <div className="maindiv">
        <div className="leftdiv">
          <h1>Login</h1>

          {/* Username Input */}
          <div className="inp">
            <CiUser className="user" />
            <input
              type="text"
              placeholder="Username"
              className="inp11"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="inp">
            <RiLockPasswordLine className="user" />
            <input
              type="password"
              placeholder="Password"
              className="inp11"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button className="btns" onClick={handleAuth}>Login Now</button>
        </div>

        {/* Right Div for the Image */}
        <div className="rightdiv"></div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="errordiv">
          <p>{error}</p>
          <RxCross2 className="cross" onClick={handleMsg} />
        </div>
      )}
    </div>
  );
}

export default Auth;
