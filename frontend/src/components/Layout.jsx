import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();
  const isAuth = location.pathname !== '/signin' && location.pathname !== '/signup';

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuth && (
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/dashboard" className="text-2xl font-bold text-gray-800">
                  PayTM App
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link to="/send" className="text-gray-600 hover:text-gray-900">
                  Send Money
                </Link>
                <button 
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/signin';
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}