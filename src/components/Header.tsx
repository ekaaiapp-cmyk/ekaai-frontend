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

  // Debug: Show auth state in the header temporarily

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-bg/90 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-headline font-bold text-primary-text-bright hover:text-primary-accent transition-colors duration-200">
            EkaAI
          </Link>
        </div>
        <nav className="flex items-center space-x-4 md:space-x-6">
          <Link
            to="/doubt-clearing"
            className="text-primary-text hover:text-primary-accent transition-colors duration-200 text-sm md:text-base"
          >
            Doubt Clearing
          </Link>
          {loading ? (
            <div className="w-16 md:w-20 h-8 md:h-9 bg-gray-700 animate-pulse rounded-lg"></div>
          ) : user ? (
            <Link
              to="/dashboard"
              className="bg-primary-accent text-primary-bg px-4 md:px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors duration-200 text-sm md:text-base"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-primary-text hover:text-primary-accent transition-colors duration-200 text-sm md:text-base"
              >
                Sign In
              </Link>
              <Link
                to="/waitlist"
                className="bg-primary-accent text-primary-bg px-3 md:px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors duration-200 text-sm md:text-base"
              >
                Join Waitlist
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
