import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  DollarSign,
  BarChart3,
  Goal,
  ChartNoAxesCombined,
} from 'lucide-react';
import useBasePathHook from '../../app/hooks/app.useBaseLocationHook';

interface MenuItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const menuItems: MenuItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Wallet', path: '/wallets', icon: DollarSign },
  { name: 'Budgets', path: '/budgets', icon: BarChart3 },
  { name: 'Goals', path: '/goals', icon: Goal },
  { name: 'Analytics', path: '/analytics', icon: ChartNoAxesCombined },
];

const SideBar: React.FC = () => {
  const basePath = useBasePathHook();

  return (
    <>
      {/* Desktop Navigation - Vertical */}
      <nav className='hidden md:flex flex-col gap-2 p-4'>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = basePath === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-emerald-100 text-black shadow-md'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <Icon size={20} />
              <span className='font-medium'>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Navigation - Horizontal Bottom Bar */}
      <nav className='md:hidden flex justify-around items-center px-2 py-3'>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = basePath === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all min-w-[20px] ${
                isActive ? 'text-emerald-100 text-black' : 'text-slate-500'
              }`}
            >
              <Icon
                size={22}
                className={isActive ? 'stroke-2' : 'stroke-1.5'}
              />
              <span className='text-xs font-medium'>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default SideBar;
