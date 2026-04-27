import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import type { Session } from '@supabase/supabase-js';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Logout error:', error.message)
    } else {
      console.log('User logged out')
      setSession(null);
    }
  };

  if (!session) {
    return <Login />
  }

  return (
    <div className='m-10'>
      <h1 className='text-3xl'>Notes App</h1>
      <button
        onClick={handleLogout}
        className='text-red-500 hover:undeline pb-4'
      >
        Logout
      </button>

      <Dashboard />
    </div>
  )
}

export default App
