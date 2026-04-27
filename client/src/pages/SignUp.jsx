//SignUp.jsx
import React from 'react';
import { useState } from 'react';
import api from "../services/api";

function SignUp({ onSignupSuccess, goToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  //-------------SIGN UP--------------
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // CREATE USER
      await api.post("/auth/signup", {
        email,
        password,
      });

      //AUTO LOGIN
      await api.post("/auth/login", {
        email,
        password,
      });

      onSignupSuccess();

      setMessage("Account created! You can now log in.");
      } catch (err) {
      setMessage(err.response?.data?.error || "Signup failed");
      setLoading(false);
      }
    }; 

  return (
    <form onSubmit={handleSignUp} className='flex flex-col gap-3 max-w-sm'>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
        className='border p-2 rounded'
      />

      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required
        className='border p-2 rounded' 
      />

      <button 
        type="submit"
        disabled={loading}
        className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50'
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>

      {message && <p>{message}</p>}

      <button
        type='button'
        onClick={goToLogin}
        className='text-blue-500 underline'
      >Already have an account? Log in</button>
    </form>
  );
}

export default SignUp;
