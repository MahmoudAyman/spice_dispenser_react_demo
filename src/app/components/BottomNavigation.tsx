import { useNavigate } from 'react-router';
import { Home, LibraryBooks, Settings } from '@mui/icons-material';

interface BottomNavigationProps {
  currentPath: string;
}

export function BottomNavigation({ currentPath }: BottomNavigationProps) {
  const navigate = useNavigate();

  const navItems = [
    { path: '/dashboard', label: 'Home', icon: Home },
    { path: '/recipes', label: 'Recipes', icon: LibraryBooks },
    { path: '/containers', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-md mx-auto grid grid-cols-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center py-3 transition-colors ${
                isActive
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className={`text-2xl ${isActive ? 'scale-110' : ''}`} />
              <span className={`text-xs mt-1 font-medium ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
