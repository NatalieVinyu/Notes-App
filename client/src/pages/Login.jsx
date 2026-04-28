// LOGIN.JSX
import { useState } from 'react';
import api from '../services/api'
import { supabase } from '../supabaseClient';

function Login({ onLoginSuccess, goToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      setMessage("Login successful");
      await onLoginSuccess();

    } catch (err) {
      setMessage(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-stone-50'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-lg p-8'>
        {/* HEADER */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-semibold text-stone-800'>Welcome back!</h1>
          <p className='text-sm text-stone-500 mt-1'>Log in to your account</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-3">

          {/* EMAIL */}
          <div>
            <label className='block text-xs font-medium text-stone-600 mb-1'>EMAIL</label>
            <input
              type="email"
              placeholder="your@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 rounded-lg bg-white border border-stone-200 focus:outline-none focus:border-green-400"
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
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* MESSAGE */}
          {message && (
            <p className={`text-sm text-center mt-2 ${message.includes("successful") ? "text-green-600" : "text-red-500"}`}>{message}</p>
          )}

          <span className='flex gap-2'>
            Don't have an account?
            <button
            type='button'
            onClick={goToSignup}
            className='text-blue-500 underline cursor-pointer'
            > 
              Sign in
            </button>
          </span>

        </form>   
      </div>
    
    </div>

  )
}

export default Login;
