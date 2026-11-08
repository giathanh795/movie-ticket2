import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Ticket,
  Film,
  Building,
  Star,
  UserPlus,
  Play,
  Calendar,
  Clock,
  Info,
  Sparkles
} from 'lucide-react';

export default function HeroBanner({
  movies = [],
  onBookNow,
  onMovieDetail,
  onNavigate,
  onOpenRegister
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayMovies = movies.length > 0 ? movies.slice(0, 5) : [
    {
      title: 'BÒ SỮA BAY',
      originalTitle: 'Flying Dairy Cow',
      releaseDate: '06 11 2026',
      ageRating: 'P',
      genres: ['Hài', 'Phiêu Lưu', 'Gia Đình'],
      director: 'Nguyễn Phạm Thành Đạt',
      actors: 'Nguyễn Hùng, Ngọc Xuân, Võ Điền Gia Huy, Tiểu Vy, Huy Tít',
      bannerUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&auto=format&fit=crop&q=80',
      synopsis: 'Dự án phim điện ảnh đặc sắc được tuyển chọn APM & DANAFF. Một câu chuyện kỳ thú về chú bò sữa đặc biệt và giấc mơ bay cao của những con người nông thôn.',
    }
  ];

  const current = displayMovies[currentIndex] || displayMovies[0];

  useEffect(() => {
    if (displayMovies.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayMovies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [displayMovies.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + displayMovies.length) % displayMovies.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayMovies.length);
  };

  // Only keep the exact required navigation buttons:
  // 1. Rạp MTK -> Trang giới thiệu rạp
  // 2. Phim đang chiếu -> Section/Trang phim đang chiếu
  // 3. Đặc trưng MTK -> Trang đặc trưng rạp
  // 4. Đăng ký thành viên -> Mở form đăng ký
  const mtkQuickIcons = [
    {
      icon: Building,
      label: 'RẠP MTK',
      sub: 'HỆ THỐNG CỤM RẠP',
      onClick: () => onNavigate('about')
    },
    {
      icon: Film,
      label: 'PHIM ĐANG CHIẾU',
      sub: 'NOW SHOWING',
      onClick: () => onNavigate('now_showing')
    },
    {
      icon: Sparkles,
      label: 'ĐẶC TRƯNG MTK',
      sub: 'CÔNG NGHỆ & ĐẲNG CẤP',
      onClick: () => onNavigate('features')
    },
    {
      icon: UserPlus,
      label: 'ĐĂNG KÝ NGAY',
      sub: 'THÀNH VIÊN MTK',
      onClick: onOpenRegister
    },
  ];

  return (
    <div className="w-full mb-10">
      {/* 1. MTK QUICK ACTION ICONS ROW */}
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl p-4 mb-6 shadow-xl backdrop-blur-sm">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {mtkQuickIcons.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={item.onClick}
                className="group flex flex-col items-center p-3 rounded-2xl hover:bg-neutral-800/80 transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-neutral-800 group-hover:bg-red-600 border border-neutral-700 group-hover:border-red-500 flex items-center justify-center text-neutral-300 group-hover:text-white shadow-md transition-all">
                  <IconComp className="w-6 h-6 transition-transform group-hover:scale-110" />
                </div>
                <span className="text-xs font-black text-neutral-200 mt-2.5 group-hover:text-red-400 uppercase tracking-tight line-clamp-1">
                  {item.label}
                </span>
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block mt-0.5">
                  {item.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. MTK MAIN CAROUSEL HERO */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-neutral-800 group">
        <div className="relative w-full h-[380px] sm:h-[460px] md:h-[500px] overflow-hidden bg-gradient-to-r from-red-950/40 via-neutral-950 to-red-950/40">
          {/* Main Backdrop Image */}
          <img
            src={current.bannerUrl || current.posterUrl}
            alt={current.title}
            className="w-full h-full object-cover object-center filter brightness-[0.45] transition-all duration-700"
          />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/40 to-neutral-950/80" />

          {/* Left / Right Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center transition-all z-20 backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center transition-all z-20 backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Hero Content */}
          <div className="absolute inset-0 p-6 sm:p-12 flex flex-col justify-end max-w-4xl z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-600 text-white shadow-lg shadow-red-950">
                PHIM NỔI BẬT MTK CINEMAS
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-neutral-900/90 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 4.9/5
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-neutral-900/90 text-neutral-300 border border-neutral-700">
                {current.ageRating || 'T13'}
              </span>
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-neutral-900/90 text-red-300 border border-red-500/30">
                {current.format || 'IMAX • 2D Digital'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight drop-shadow-lg mb-2">
              {current.title}
            </h1>

            {current.actors && (
              <p className="text-xs sm:text-sm text-neutral-300 line-clamp-1 mb-2 font-medium">
                <strong className="text-white">Diễn viên:</strong> {current.actors}
              </p>
            )}

            <p className="text-xs sm:text-sm text-neutral-300/90 line-clamp-2 max-w-2xl mb-6">
              {current.synopsis}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onBookNow(current)}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-red-950 hover:scale-105 active:scale-95 transition-all"
              >
                <Ticket className="w-4 h-4 fill-white" />
                <span>MUA VÉ NGAY</span>
              </button>

              <button
                onClick={() => onMovieDetail(current)}
                className="px-5 py-3 rounded-2xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-bold text-sm flex items-center gap-2 backdrop-blur-sm transition-all"
              >
                <Info className="w-4 h-4 text-red-400" />
                <span>Xem Thông Tin Chi Tiết</span>
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {displayMovies.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === idx
                    ? 'w-8 bg-red-600 shadow-md shadow-red-900'
                    : 'w-2 bg-neutral-600 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}