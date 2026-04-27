import React, { useEffect, useState } from 'react';
import api from "./services/api";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/notes");
        setIsAuth(true);
      } catch (err) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };
      checkAuth();
    }, []);

    //--------- LOGGING OUT----------------
  const handleLogout = async () => {
    await api.post("/auth/logout");
    setIsAuth(false);
  };

    if (loading) return <p>Loading...</p>

    if (!isAuth) {
      return <Login onLoginSuccess={() => setIsAuth(true)} />;
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

      <SignUp />
      <Dashboard />
    </div>
  )
}

export default App
