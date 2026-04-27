//SignUp.jsx
import { useState } from 'react';
import axios from 'axios';
import { supabase } from '../supabaseClient';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Signup successful! Please check your email to confirm.');

      if (data.session) {
        localStorage.setItem("token", data.session.access_token);
      }
    } 

    setLoading(false);
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

      <p className='text-sm text-gray-600'>{message}</p>
    </form>
  );
}

export default SignUp;
