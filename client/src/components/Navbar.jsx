//NAVBAR.JSX
import { useEffect, useState } from "react";

function Navbar({ onLogout }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const syncUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    }

      syncUser();
      window.addEventListener("storage", syncUser);

      return () => window.removeEventListener("storage", syncUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("auth");
    onLogout?.();
    window.location.href = "/";
  };

  return (
    <nav className="w-full bg-white border-b border-stone-200 px-6 py-4 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* LEFT - WELCOME */}
        <div className="text-lg font-semibold text-stone-800">
          {user ? (
            <span>
              Welcome,{" "}
              <span className="font-medium text-gray-800">
                {user.name || "User"}
              </span>
            </span>
          ) : (
            "Welcome"
          )}
        </div>

        {/* RIGHT - USER INFO + LOGOUT */}
        <div className="flex items-center gap-4">

          {/* EMAIL */}
          {user && (
            <div className="hidden sm:block text-xs text-gray-500">
              {user.email}
            </div>
          )}

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white text-sm px-3 py-2 rounded-lg
            hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;