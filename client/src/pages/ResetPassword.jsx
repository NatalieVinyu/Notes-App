//RESETPASSWORD.JSX
import React from 'react';
import { useState } from 'react';
import { supabase } from '../supabaseClient';

function ResetPassword({ onResetSuccess }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  //--------- RESET PASSWORD EMAIL ----------------
  const handleResetRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

     try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:5173/reset-password",
      });

      if (error) throw error;
      setMessage("Check your email for a reset link.");
      setTimeout(() => onResetSuccess?.(), 3000);

      } catch (err) {
      setMessage(err.message || "Something went wrong. Please try again.");
      } finally {
      setLoading(false);
      }

    setLoading(false);
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-stone-50'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-lg p-8'>

        {/* HEADER */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-semibold text-stone-800'>
            Reset Password
          </h1>
          <p className='text-sm text-stone-500 mt-1'>
            Enter your email to receive a reset link
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleResetRequest} className='space-y-3'>

          {/* EMAIL */}
          <div>
            <label className='block text-xs font-medium text-stone-600 mb-1'>
              EMAIL
            </label>

            <input 
              type="email"
              placeholder='your@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full p-2 rounded-lg bg-white border border-stone-200 focus:outline-none focus:border-green-400'
            />
          </div>

          {/* BUTTON */}
          <button
            type='submit'
            disabled={loading}
            className='w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:opacity-50'
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          {/* MESSAGE */}
          {message && (
            <p className={`text-sm text-center mt-2 ${
              message.includes("Check") ? "text-green-600" : "text-red-500"
            }`}>
              {message}
            </p>
          )}

        </form>

        {/* BACK TO LOGIN */}
        <p className='text-center mt-4 text-sm'>
          Remember your password?{" "}
          <button
            onClick={onResetSuccess}
            className='text-blue-500 underline cursor-pointer'
          >
            Back to Login
          </button>
        </p>

      </div>
    </div>

  )
}

export default ResetPassword;
