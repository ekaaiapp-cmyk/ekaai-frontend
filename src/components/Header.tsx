import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, loading } = useAuth();

  console.log('🎯 Header render:', { 
    hasUser: !!user, 
    userId: user?.id?.substring(0, 8) + '...', 
    userEmail: user?.email,
    loading 
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-bg/90 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-headline font-bold text-primary-text-bright hover:text-primary-accent transition-colors duration-200">
            EkaAI
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/doubt-clearing"
            className="text-primary-text hover:text-primary-accent transition-colors duration-200"
          >
            Doubt Clearing
          </Link>
          {loading ? (
            <div className="w-20 h-9 bg-gray-700 animate-pulse rounded-lg"></div>
          ) : user ? (
            <Link
              to="/dashboard"
              className="bg-primary-accent text-primary-bg px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors duration-200"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-primary-text hover:text-primary-accent transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/waitlist"
                className="bg-primary-accent text-primary-bg px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors duration-200"
              >
                Join Waitlist
              </Link>
            </>
          )}
        </nav>
        <div className="md:hidden">
          {loading ? (
            <div className="w-24 h-9 bg-gray-700 animate-pulse rounded-lg"></div>
          ) : user ? (
            <Link
              to="/dashboard"
              className="bg-primary-accent text-primary-bg px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors duration-200"
            >
              Dashboard
            </Link>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="text-primary-text hover:text-primary-accent transition-colors duration-200 text-sm"
              >
                Sign In
              </Link>
              <Link
                to="/waitlist"
                className="bg-primary-accent text-primary-bg px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors duration-200 text-sm"
              >
                Join Waitlist
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
