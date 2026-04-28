import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import api from "./services/api";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import { BallTriangle } from "react-loader-spinner";

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);
  
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      
      console.log("SESSION:", data.session)

      setUser(data.session?.user || null);
      setIsAuth(!!data.session);
      setLoading(false);
    };

    useEffect(() => {
      checkAuth();

      const { data: listener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (session) {
          setIsAuth(!!session);
        } else {
          setIsAuth(false);
          setUser(null);
        }
        setLoading(false);
     });
 
      return () => {
        listener.subscription.unsubscribe()
      };
    }, []);

    //--------- LOGGING OUT----------------
  const handleLogout = async () => {
    await supabase.auth.signOut();

    setIsAuth(false);
    setUser(null);
    setAuthMode("login");

    localStorage.removeItem("user");
    localStorage.removeItem("auth");
  };

    //REACT-LOADER-SPINNER
    if (loading) {
      return (
        <div className='h-screen flex items-center justify-center'>
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )
    }

    // NOT AUTHENTICATED
    if (!isAuth) {
      if (authMode === "reset") return ( 
        <ResetPassword 
          onResetSuccess={() => setAuthMode("login")}
        />
      );
      if (authMode === "signup") return (
        <SignUp
          onSignupSuccess={checkAuth}
          goToLogin={() => setAuthMode("login")} 
        />
      );
      return (
        <Login
          onLoginSuccess={checkAuth}
          goToSignup={() => setAuthMode("signup")}
          goToReset={() => setAuthMode("reset")}
        />
      )
    };

  //AUTHENTICATED
  return (
    <div className='min-h-screen bg-stone-50'>
      {/* NAVBAR WITH LOGOUT BUTTON */}
      <Navbar user={user} onLogout={handleLogout} />

      {/* DASHBOARD */}
      <div className='max-w-4xl mx-auto px-4 sm:px-6 py-8'>
        <Dashboard />
      </div>
    </div>
  )
}

export default App;
