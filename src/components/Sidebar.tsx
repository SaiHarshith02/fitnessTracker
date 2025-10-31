import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  LayoutDashboard,
  User,
  Grid,
  Apple,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { COLORS } from '../utils/constants';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/menu', label: 'Menu', icon: Grid },
    { path: '/diet', label: 'Diet', icon: Apple },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary text-secondary hover:bg-opacity-90 transition-all"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 md:w-56 lg:w-64 bg-primary text-secondary transition-all duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ backgroundColor: COLORS.primary }}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo/App Name */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-secondary">FITNESS TRACKER</h1>
            <p className="text-secondary text-opacity-70 text-sm mt-1">
              Your AI Fitness Companion
            </p>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    active
                      ? `bg-secondary text-primary font-semibold`
                      : `text-secondary hover:bg-secondary hover:bg-opacity-10`
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-secondary hover:bg-secondary hover:bg-opacity-10 transition-all duration-300 text-base"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main content offset */}
      <div className="lg:ml-64 md:ml-56 transition-all duration-300" />
    </>
  );
};
