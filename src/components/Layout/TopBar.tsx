import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Search,
  Menu,
  LogOut,
  User,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks/app.hooks';
import { logoutUser } from '../../features/auth/redux/slice/asyncThunkServices';

interface TopBarProps {
  onMenuClick?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      navigate('/login', { replace: true });
    }
  };

  return (
    <header className='sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm'>
      <div className='flex items-center justify-between px-4 md:px-6 h-16'>
        <div className='flex items-center gap-4'>
          <h1 className='text-xl font-bold text-slate-800'>{""}</h1>
        </div>

        {/* Right Section - Search & Notifications */}
        <div className='flex items-center gap-2 md:gap-4'>
          {/* Search */}
          <div className='hidden md:flex items-center gap-2 bg-slate-100 rounded-lg px-4 py-2'>
            <Search size={18} className='text-slate-400' />
            <input
              type='text'
              placeholder='Search...'
              className='bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400 w-48'
            />
          </div>

          {/* Search Icon for Mobile
          <button className="md:hidden p-2 hover:bg-slate-100 rounded-lg">
            <Search size={20} className="text-slate-600" />
          </button> */}

          {/* Notifications */}
          <button className='relative p-2 hover:bg-slate-100 rounded-lg'>
            <Bell size={20} className='text-slate-600' />
            <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
          </button>

          {/* User Avatar with Dropdown */}
          <div className='relative' ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className='flex items-center gap-2 pl-2 border-l border-slate-200'
            >
              <img
                src='https://i.pravatar.cc/40'
                alt='User'
                className='w-8 h-8 rounded-full border-2 border-emerald-500 cursor-pointer hover:border-emerald-600 transition-colors'
              />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50'>
                <div className='px-4 py-2 border-b border-slate-200'>
                  <p className='text-sm font-semibold text-slate-800'>
                    John Doe
                  </p>
                  <p className='text-xs text-slate-500'>john@example.com</p>
                </div>

                <button
                  onClick={() => {
                    navigate('/profile');
                    setShowDropdown(false);
                  }}
                  className='w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors'
                >
                  <User size={16} />
                  <span>Profile</span>
                </button>

                <button
                  onClick={() => {
                    navigate('/settings');
                    setShowDropdown(false);
                  }}
                  className='w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors'
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </button>

                <button
                  onClick={() => {
                    navigate('/support');
                    setShowDropdown(false);
                  }}
                  className='w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors'
                >
                  <HelpCircle size={16} />
                  <span>Help & Support</span>
                </button>

                <div className='border-t border-slate-200 mt-2 pt-2'>
                  <button
                    onClick={handleLogout}
                    className='w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors'
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
