//SignUp.jsx
import React from 'react';
import { useState } from 'react';
import api from "../services/api";
import { supabase } from '../supabaseClient';

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
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      await onSignupSuccess();
    } catch (err) {
      setMessage(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className='min-h-screen flex items-center justify-center bg-stone-50'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-lg p-8'>
        {/* HEADER */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-semibold text-stone-800'>Welcome!</h1>
          <p className='text-sm text-stone-500 mt-1'>Sign in to your new account</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSignUp} className='space-y-3'>

          {/* EMAIL */}
          <div>
            <label className='block text-xs font-medium text-stone-600 mb-1'>EMAIL</label>
            <input 
              type="email" 
              placeholder="your@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className='w-full p-2 rounded-lg bg-white border border-stone-200 focus:outline-none focus:border-green-400'
            />
          </div>
          
          {/* PASSWORD */}
          <div>
            <label className='block text-xs font-medium text-stone-600 mb-1'>PASSWORD</label>
            <input 
              type="password" 
              placeholder="******" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
              className="w-full p-2 rounded-lg bg-white border border-stone-200 focus:outline-none focus:border-green-400" 
            />
          </div>
          
          {/* BUTTON */}
          <button 
            type="submit"
            disabled={loading}
            className='w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50'
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {/* MESSAGE */}
          {message && (
            <p className={`text-sm text-center mt-2 ${message.includes("successful") ? "text-green-600" : "text-red-500"}`}>{message}</p>
          )}

          <p className='flex gap-2'>
            Already have an account?
            <button
            type='button'
            onClick={goToLogin}
            className='text-blue-500 underline cursor-pointer'
            > 
              Log in
            </button>
          </p>

        </form>
      </div>
    </div>
    
  );
}

export default SignUp;
