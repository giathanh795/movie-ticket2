import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import MovieList from './components/MovieList';
import MtkFooter from './components/MtkFooter';
import StaffPortal from './components/StaffPortal';
import NowShowingPage from './pages/NowShowingPage';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';
import TermsPage from './pages/TermsPage';

import MovieDetailModal from './components/MovieDetailModal';
import SeatMatrixModal from './components/SeatMatrixModal';
import PaymentModal from './components/PaymentModal';
import MyBookingsModal from './components/MyBookingsModal';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import AdminPanelModal from './components/AdminPanelModal';

import {
  getMovies,
  searchMovies,
  getCurrentUserProfile,
  isAuthenticated,
  getUserRole,
  logout
} from './api';
import { Film, Eye, Ticket, ArrowLeft } from 'lucide-react';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [staffPreviewMode, setStaffPreviewMode] = useState(false);

  // Current standalone page view:
  // 'home' | 'now_showing' | 'about' | 'features' | 'terms_general' | 'terms_transaction' | 'terms_payment' | 'terms_privacy' | 'faq'
  const [currentView, setCurrentView] = useState('home');

  // Modals state
  const [selectedMovieForDetail, setSelectedMovieForDetail] = useState(null);
  const [activeShowtimeSession, setActiveShowtimeSession] = useState(null);
  const [activePaymentSession, setActivePaymentSession] = useState(null);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState('login');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Check login status on mount
  useEffect(() => {
    loadMovies();
    if (isAuthenticated()) {
      loadUserProfile();
    } else {
      setCurrentUserProfile(null);
    }
  }, []);

  const loadUserProfile = async () => {
    try {
      const p = await getCurrentUserProfile();
      setCurrentUserProfile(p);
    } catch (e) {
      console.log('Error fetch profile:', e);
      setCurrentUserProfile(null);
    }
  };

  const loadMovies = async () => {
    setLoading(true);
    try {
      const data = await getMovies('NOW_SHOWING');
      const list = Array.isArray(data) ? data : data?.content || [];
      setMovies(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (keyword) => {
    if (!keyword.trim()) {
      loadMovies();
      return;
    }
    try {
      const data = await searchMovies(keyword);
      const list = Array.isArray(data) ? data : data?.content || [];
      setMovies(list);
      setCurrentView('now_showing');
    } catch (e) {
      console.error(e);
    }
  };

  // Auth requirement handler
  const requireAuth = (callbackAction) => {
    if (!isAuthenticated() || !currentUserProfile) {
      setAuthInitialTab('login');
      setIsAuthOpen(true);
      return false;
    }
    if (callbackAction) callbackAction();
    return true;
  };

  // Flow handlers
  const handleSelectMovieForDetail = (movie) => {
    requireAuth(() => {
      setSelectedMovieForDetail(movie);
    });
  };

  const handleBookNowFromCard = (movie) => {
    requireAuth(() => {
      setSelectedMovieForDetail(movie);
    });
  };

  const handleSelectShowtime = (showtime, movie) => {
    setSelectedMovieForDetail(null);
    setActiveShowtimeSession({ showtime, movie });
  };

  const handleBookingSuccess = (booking, selectedSeats, showtime, movie) => {
    setActiveShowtimeSession(null);
    setActivePaymentSession({ booking, selectedSeats, showtime, movie });
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Role detection
  const userRole = currentUserProfile?.role || getUserRole();
  const isStaffUser = userRole === 'STAFF';

  // If user is logged in as STAFF and has NOT toggled preview mode, render dedicated StaffPortal
  if (isStaffUser && !staffPreviewMode) {
    return (
      <StaffPortal
        currentUserProfile={currentUserProfile}
        onSwitchToCustomerView={() => setStaffPreviewMode(true)}
      />
    );
  }

  // Determine active term tab if on terms pages
  const getTermsTab = () => {
    if (currentView === 'terms_transaction') return 'transaction';
    if (currentView === 'terms_payment') return 'payment';
    if (currentView === 'terms_privacy') return 'privacy';
    if (currentView === 'faq') return 'faq';
    return 'general';
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-red-600 selection:text-white relative">
      {/* Staff Preview Floating Banner */}
      {isStaffUser && staffPreviewMode && (
        <div className="sticky top-0 z-50 bg-blue-600 text-white px-4 py-2 text-xs font-bold flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>Bạn đang xem trước giao diện Khách Hàng (Tài khoản Nhân Viên Staff)</span>
          </div>
          <button
            onClick={() => setStaffPreviewMode(false)}
            className="px-3 py-1 bg-neutral-950 hover:bg-neutral-900 rounded-lg text-white font-mono flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Trở Lại Quầy Soát Vé Staff</span>
          </button>
        </div>
      )}

      {/* 1. MTK Main Navigation */}
      <Navbar
        onSearch={handleSearch}
        onOpenMyBookings={() => requireAuth(() => setIsMyBookingsOpen(true))}
        onOpenAuth={() => {
          setAuthInitialTab('login');
          setIsAuthOpen(true);
        }}
        onOpenProfile={() => requireAuth(() => setIsProfileOpen(true))}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenStaff={() => setStaffPreviewMode(false)}
        onNavigate={handleNavigate}
        currentUserProfile={currentUserProfile}
      />

      {/* 2. Main Page Layout with Skyscraper Banners on Home */}
      <div className="relative w-full flex-1 flex justify-center">
        {currentView === 'home' && (
          <aside className="hidden 2xl:block absolute left-4 top-6 w-32 shrink-0">
            <div className="sticky top-24 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 text-center">
              <img
                src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=300&auto=format&fit=crop&q=80"
                alt="Thiên Đường Tăm Tối"
                className="w-full h-80 object-cover filter brightness-[0.75]"
              />
              <div className="p-2.5">
                <span className="text-[10px] font-black text-red-500 uppercase block">KHỞI CHIẾU 06.11</span>
                <p className="text-xs font-black text-white mt-0.5 leading-tight">THIÊN ĐƯỜNG TĂM TỐI</p>
                <button
                  onClick={() => handleBookNowFromCard(movies[1] || movies[0])}
                  className="mt-2 w-full py-1.5 rounded-lg bg-red-600 text-white font-black text-[10px] uppercase tracking-wider hover:bg-red-500 transition-colors"
                >
                  ĐẶT VÉ
                </button>
              </div>
            </div>
          </aside>
        )}

        {/* Center Main Content Container */}
        <main className="w-full max-w-7xl px-4 lg:px-8 py-6">
          {/* STANDALONE PAGE ROUTING */}
          {currentView === 'home' && (
            <>
              <HeroBanner
                movies={movies}
                onBookNow={handleBookNowFromCard}
                onMovieDetail={handleSelectMovieForDetail}
                onNavigate={handleNavigate}
                onOpenRegister={() => {
                  setAuthInitialTab('register');
                  setIsAuthOpen(true);
                }}
              />

              {loading ? (
                <div className="text-center py-20 text-neutral-400">
                  <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <span>Đang tải danh sách phim MTK Cinemas...</span>
                </div>
              ) : (
                <MovieList
                  movies={movies}
                  onSelectMovie={handleBookNowFromCard}
                  onViewDetail={handleSelectMovieForDetail}
                  isAuthenticated={isAuthenticated() && !!currentUserProfile}
                  onRequireAuth={() => {
                    setAuthInitialTab('login');
                    setIsAuthOpen(true);
                  }}
                />
              )}
            </>
          )}

          {/* PAGE: PHIM ĐANG CHIẾU */}
          {currentView === 'now_showing' && (
            <NowShowingPage
              movies={movies}
              onSelectMovie={handleBookNowFromCard}
              onViewDetail={handleSelectMovieForDetail}
              isAuthenticated={isAuthenticated() && !!currentUserProfile}
              onRequireAuth={() => {
                setAuthInitialTab('login');
                setIsAuthOpen(true);
              }}
            />
          )}

          {/* PAGE: GIỚI THIỆU RẠP MTK */}
          {currentView === 'about' && (
            <AboutPage onBookNow={() => handleNavigate('now_showing')} />
          )}

          {/* PAGE: ĐẶC TRƯNG MTK */}
          {currentView === 'features' && (
            <FeaturesPage onBookNow={() => handleNavigate('now_showing')} />
          )}

          {/* PAGE: ĐIỀU KHOẢN & FAQ */}
          {(currentView === 'terms_general' ||
            currentView === 'terms_transaction' ||
            currentView === 'terms_payment' ||
            currentView === 'terms_privacy' ||
            currentView === 'faq') && (
            <TermsPage
              activeTab={getTermsTab()}
              onTabChange={(tabKey) => {
                if (tabKey === 'general') handleNavigate('terms_general');
                else if (tabKey === 'transaction') handleNavigate('terms_transaction');
                else if (tabKey === 'payment') handleNavigate('terms_payment');
                else if (tabKey === 'privacy') handleNavigate('terms_privacy');
                else if (tabKey === 'faq') handleNavigate('faq');
              }}
              onBookNow={() => handleNavigate('now_showing')}
            />
          )}

          {/* MTK Cinema Formats & Footer (Common across pages) */}
          <MtkFooter
            onNavigate={handleNavigate}
            isAuthenticated={isAuthenticated() && !!currentUserProfile}
            onOpenAuth={() => {
              setAuthInitialTab('login');
              setIsAuthOpen(true);
            }}
          />
        </main>

        {currentView === 'home' && (
          <aside className="hidden 2xl:block absolute right-4 top-6 w-32 shrink-0">
            <div className="sticky top-24 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 text-center">
              <img
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=300&auto=format&fit=crop&q=80"
                alt="Bò Sữa Bay"
                className="w-full h-80 object-cover filter brightness-[0.75]"
              />
              <div className="p-2.5">
                <span className="text-[10px] font-black text-amber-400 uppercase block">DỰ KIẾN 06.11</span>
                <p className="text-xs font-black text-white mt-0.5 leading-tight">BÒ SỮA BAY</p>
                <button
                  onClick={() => handleBookNowFromCard(movies[0])}
                  className="mt-2 w-full py-1.5 rounded-lg bg-red-600 text-white font-black text-[10px] uppercase tracking-wider hover:bg-red-500 transition-colors"
                >
                  ĐẶT VÉ
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* MODALS */}
      {/* 1. Auth Modal */}
      {isAuthOpen && (
        <AuthModal
          initialTab={authInitialTab}
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={async () => {
            await loadUserProfile();
            setIsAuthOpen(false);
          }}
        />
      )}

      {/* 2. Movie Details & Showtime Picker Modal */}
      {selectedMovieForDetail && (
        <MovieDetailModal
          movie={selectedMovieForDetail}
          onClose={() => setSelectedMovieForDetail(null)}
          onSelectShowtime={handleSelectShowtime}
        />
      )}

      {/* 3. Seat Matrix Selector Modal */}
      {activeShowtimeSession && (
        <SeatMatrixModal
          showtime={activeShowtimeSession.showtime}
          movie={activeShowtimeSession.movie}
          onClose={() => setActiveShowtimeSession(null)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* 4. Payment Modal & E-Ticket with Mock PayOS */}
      {activePaymentSession && (
        <PaymentModal
          session={activePaymentSession}
          onClose={() => setActivePaymentSession(null)}
        />
      )}

      {/* 5. My Bookings History Modal */}
      {isMyBookingsOpen && (
        <MyBookingsModal onClose={() => setIsMyBookingsOpen(false)} />
      )}

      {/* 6. User Profile Editor Modal */}
      {isProfileOpen && (
        <ProfileModal
          currentUserProfile={currentUserProfile}
          onClose={() => setIsProfileOpen(false)}
          onProfileUpdated={(updated) => setCurrentUserProfile(updated)}
        />
      )}

      {/* 7. Admin Dashboard Modal */}
      {isAdminOpen && (
        <AdminPanelModal onClose={() => setIsAdminOpen(false)} />
      )}
    </div>
  );
}