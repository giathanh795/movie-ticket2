import React, { useState } from 'react';
import Logo from './Logo';
import {
  Film,
  Ticket,
  User,
  Search,
  ShieldCheck,
  LogIn,
  LogOut,
  Building2,
  Sparkles,
  ChevronDown,
  Phone,
  Info
} from 'lucide-react';
import { logout, getUserRole, isAuthenticated } from '../api';

export default function Navbar({
  onSearch,
  onOpenMyBookings,
  onOpenAuth,
  onOpenProfile,
  onOpenAdmin,
  onOpenStaff,
  onNavigate,
  currentUserProfile,
}) {
  const [keyword, setKeyword] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const isUserLoggedIn = isAuthenticated() && !!currentUserProfile;
  const role = isUserLoggedIn ? currentUserProfile?.role || getUserRole() : null;
  const isAdmin = role === 'ADMIN';
  const isStaff = role === 'STAFF';

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setKeyword(val);
    onSearch(val);
  };

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-40 bg-neutral-900 border-b border-neutral-800 shadow-xl transition-all">
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-neutral-950 border-b border-neutral-800/80 px-4 lg:px-8 py-1.5 text-[11px] text-neutral-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Announcement */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-amber-400 font-semibold">
              <Sparkles className="w-3 h-3" />
              MTK Cinemas: Trải nghiệm điện ảnh đỉnh cao với màn hình IMAX Laser
            </span>
            <span className="hidden md:inline text-neutral-600">|</span>
            <span className="flex items-center gap-1 text-neutral-400">
              <Phone className="w-3 h-3 text-red-500" />
              Hotline CSKH: <strong className="text-neutral-200">1900 6017</strong>
            </span>
          </div>

          {/* Right Links */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('features')}
              className="hover:text-red-400 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-red-500" />
              <span>Đặc Trưng MTK</span>
            </button>

            <button
              onClick={() => {
                if (!isUserLoggedIn) onOpenAuth();
                else onOpenMyBookings();
              }}
              className="hover:text-red-400 transition-colors flex items-center gap-1"
            >
              <Ticket className="w-3 h-3 text-red-500" />
              <span>Vé Của Tôi</span>
            </button>

            {/* Auth status in top bar */}
            {!isUserLoggedIn ? (
              <button
                onClick={onOpenAuth}
                className="font-bold text-red-500 hover:text-red-400 flex items-center gap-1 pl-2 border-l border-neutral-800"
              >
                <LogIn className="w-3 h-3" />
                <span>ĐĂNG NHẬP / ĐĂNG KÝ</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 pl-2 border-l border-neutral-800">
                <span className="text-neutral-300">
                  Xin chào, <strong className="text-white">{currentUserProfile?.fullName || 'Khách'}</strong>
                </span>
                {role && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-black uppercase ${
                      isAdmin
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : isStaff
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                        : 'bg-red-500/20 text-red-400 border border-red-500/40'
                    }`}
                  >
                    {role}
                  </span>
                )}
              </div>
            )}

            <div className="hidden sm:flex items-center gap-1 font-bold text-neutral-500">
              <span className="text-red-500">VN</span>
              <span>/</span>
              <span>EN</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN MTK BRAND NAVIGATION */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* MTK Logo with nested text inside badge */}
        <Logo onClick={() => onNavigate('home')} />

        {/* Navigation Categories */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-bold tracking-tight text-neutral-200">
          <button
            onClick={() => onNavigate('now_showing')}
            className="hover:text-red-500 transition-colors uppercase tracking-wider"
          >
            Phim Đang Chiếu
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="hover:text-red-500 transition-colors uppercase tracking-wider"
          >
            Rạp MTK
          </button>
          <button
            onClick={() => onNavigate('features')}
            className="hover:text-red-500 transition-colors uppercase tracking-wider"
          >
            Đặc Trưng MTK
          </button>
          <button
            onClick={() => {
              if (!isUserLoggedIn) onOpenAuth();
              else onOpenProfile();
            }}
            className="hover:text-red-500 transition-colors uppercase tracking-wider"
          >
            Thành Viên
          </button>
        </nav>

        {/* Search Bar */}
        <div className="hidden sm:flex flex-1 max-w-xs mx-2 relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={keyword}
            onChange={handleSearchChange}
            placeholder="Tìm phim, diễn viên..."
            className="w-full bg-neutral-950 border border-neutral-800 text-xs rounded-full pl-9 pr-3 py-2 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-all"
          />
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Red Ticket CTA Button */}
          <button
            onClick={() => onNavigate('now_showing')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-950/60 hover:scale-105 active:scale-95 transition-all"
          >
            <Ticket className="w-4 h-4 fill-white" />
            <span>MUA VÉ NGAY</span>
          </button>

          {/* ADMIN Portal Button */}
          {isAdmin && (
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-xs font-bold text-amber-300 transition-colors"
              title="Quản trị hệ thống (Admin)"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">Admin</span>
            </button>
          )}

          {/* STAFF Portal Button */}
          {isStaff && (
            <button
              onClick={onOpenStaff}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/50 text-xs font-bold text-blue-300 transition-colors"
              title="Mở quầy nhân viên soát vé"
            >
              <Ticket className="w-4 h-4 text-blue-400" />
              <span className="hidden md:inline">Quầy Soát Vé</span>
            </button>
          )}

          {/* User Menu / Avatar */}
          {isUserLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 p-1.5 pr-2 rounded-full bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all"
              >
                <img
                  src={
                    currentUserProfile?.avatarUrl ||
                    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
                  }
                  alt="Avatar"
                  className="w-7 h-7 rounded-full object-cover border border-red-500/60"
                />
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in duration-150">
                  <div className="px-4 py-2 border-b border-neutral-800">
                    <p className="text-xs font-bold text-white truncate">
                      {currentUserProfile?.fullName || 'Thành Viên MTK'}
                    </p>
                    <p className="text-[10px] text-neutral-400 truncate">
                      {currentUserProfile?.email}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenProfile();
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Hồ Sơ Cá Nhân</span>
                  </button>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenMyBookings();
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white flex items-center gap-2"
                  >
                    <Ticket className="w-3.5 h-3.5 text-red-400" />
                    <span>Vé Của Tôi</span>
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onOpenAdmin();
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-amber-300 hover:bg-amber-950/40 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>Trang Quản Trị Admin</span>
                    </button>
                  )}

                  {isStaff && (
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onOpenStaff();
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-blue-300 hover:bg-blue-950/40 flex items-center gap-2"
                    >
                      <Ticket className="w-3.5 h-3.5 text-blue-400" />
                      <span>Quầy Vận Hành Staff</span>
                    </button>
                  )}

                  <div className="border-t border-neutral-800 my-1" />

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-xs text-red-400 hover:bg-red-950/40 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Đăng Xuất</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3 py-1.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-xs font-bold text-neutral-200 transition-colors"
            >
              Đăng Nhập
            </button>
          )}
        </div>
      </div>
    </header>
  );
}