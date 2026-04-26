import React from 'react';
import { useState } from 'react';
import { supabase } from '../supabaseClient';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/reset-password",
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Check your email for rest link.")
    }

    setLoading(false);
  }
  return (
    <form onSubmit={handleResetRequest} className='flex flex-col gap-3 max-w-sm'>
      <div>
        <h3>Forgot password?</h3>

        <input 
        type="email"
        placeholder='Enter email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className='border p-2 rounded w-full mb-2' 
        />

        <button
        type='submit'
        disabled={loading}
        className='bg-yellow-500 text-white px-3 py-1 rounded'
        >
          {loading? "Sending..." : "Send Reset Link"}
        </button>

        <p className='text-sm mt-2'>{message}</p>
      </div>
    </form>
  )
}

export default ResetPassword;
