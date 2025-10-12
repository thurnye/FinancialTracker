import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const menuItems: { name: string; path: string }[] = [
  { name: 'Profile', path: '/settings' },
  { name: 'Bank Account', path: 'bank-account' },
  { name: 'Category', path: 'category' },
];

export default function Settings() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathSegments = pathname.split('/').filter(Boolean);
  const currentSegment = pathSegments[pathSegments.length - 1];

  const [activeMenu, setActiveMenu] = useState<string>(
    currentSegment || 'profile'
  );

  useEffect(() => {
    if (currentSegment === 'settings') {
      setActiveMenu('profile');
    } else {
      setActiveMenu(currentSegment);
    }
  }, [currentSegment]);

  return (
    <div className='space-y-4 pb-6'>
      {/* Tabs */}
      <div className='p-3  '>
        <div className='flex gap-2 overflow-x-auto'>
          {menuItems.map((menu) => (
            <button
              key={menu.name}
              onClick={() => {
                setActiveMenu(menu.name.toLowerCase());
                navigate(menu.path);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeMenu === menu.name.toLowerCase()
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {menu.name}
            </button>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
