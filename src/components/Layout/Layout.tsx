import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import TopBar from './TopBar';

const Layout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className=" bg-slate-50">
      {/* Desktop View */}
      <div className="hidden md:flex lg:h-[90vh] overflow-hidden">
        {/* Left Sidebar - Navigation Items */}
        <aside className="w-64 bg-white border-r border-slate-200 overflow-y-auto">
          <div className="p-6 border-b border-slate-200">
            <h1 className="text-2xl font-bold text-emerald-600">{""}</h1>
          </div>
          <SideBar />
        </aside>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Sticky Header */}
          <TopBar />

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col h-screen">
        {/* Sticky Header */}
        <TopBar onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />

        {/* Main Content - with padding for bottom nav */}
        <main className="flex-1 overflow-y-auto p-4 pb-20">
          <Outlet />
        </main>

        {/* Bottom Navigation Items */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-30">
          <SideBar />
        </nav>
      </div>
    </div>
  );
};

export default Layout;
