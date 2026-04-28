//NAVBAR.JSX
import { FiLogOut } from "react-icons/fi";

function Navbar({ user, onLogout }) {

  const handleLogout = async () => {
    await onLogout();
  };

  return (
    <nav className="w-full bg-white border-b border-stone-200 px-6 py-4 h-14 flex items-center shadow-sm">
      <div className="w-full max-w-4xl mx-auto flex items-center justify-between gap-3">

        {/* BRAND */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs">📝</span>
          </div>
          <span className="font-medium text-stone-800 hidden sm:block">Notes</span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          {user?.email && (
            <span className="hidden sm:block text-xs text-stone-500 bg-stone-100 border border-stone-200 rounded-full px-3 py-1 max-w-[180px]">
              {user.email}
            </span>
          )}
          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 font-bold bg-red-500 text-white text-sm px-3 py-2 rounded-lg
            hover:bg-red-700 transition cursor-pointer"
          >
            <FiLogOut size={13} /> Log out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;