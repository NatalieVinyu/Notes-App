import React, { useEffect, useState } from 'react';
import api from "./services/api";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/auth/me");
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
    setAuthMode("login");
  };

    if (loading) return <p>Loading...</p>

    // NOT AUTHENTICATED
    if (!isAuth) {
      return authMode === "login" ? ( 
        <Login 
          onLoginSuccess={() => setIsAuth(true)} 
          goToSignup={() => setAuthMode("signup")}
        />
      ) : (
        <SignUp
          onSignupSuccess={() => setIsAuth(true)}
          goToLogin={() => setAuthMode("login")} 
        />
      );
    };

  //AUTHENTICATED
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
