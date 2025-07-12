import { Link } from 'react-router-dom';

const Header: React.FC = () => {
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
          <Link
            to="/waitlist"
            className="bg-primary-accent text-primary-bg px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors duration-200"
          >
            Join Waitlist
          </Link>
        </nav>
        <div className="md:hidden">
          <Link
            to="/waitlist"
            className="bg-primary-accent text-primary-bg px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors duration-200"
          >
            Join Waitlist
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
