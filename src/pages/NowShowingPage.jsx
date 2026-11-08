import React, { useState } from 'react';
import { Film, Search, Star, Clock, Ticket, Info, Sparkles, Filter } from 'lucide-react';

export default function NowShowingPage({ movies = [], onSelectMovie, onViewDetail, onRequireAuth, isAuthenticated }) {
  const [selectedGenre, setSelectedGenre] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const genres = ['ALL', 'Hành Động', 'Hài', 'Phiêu Lưu', 'Gia Đình', 'Tâm Lý', 'Khoa Học Viễn Tưởng'];

  const filteredMovies = movies.filter((m) => {
    const matchesGenre =
      selectedGenre === 'ALL' ||
      (Array.isArray(m.genres) &&
        m.genres.some((g) => (typeof g === 'object' ? g.name : g).toLowerCase().includes(selectedGenre.toLowerCase())));
    const matchesQuery =
      !searchQuery.trim() ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.actors && m.actors.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesGenre && matchesQuery;
  });

  const handleAction = (action, movie) => {
    if (!isAuthenticated) {
      if (onRequireAuth) onRequireAuth();
      return;
    }
    if (action === 'BOOK') onSelectMovie(movie);
    else onViewDetail(movie);
  };

  const getAgeRatingBadge = (rating) => {
    switch (rating) {
      case 'T18':
      case 'C18':
        return <span className="px-2 py-0.5 rounded text-[11px] font-black bg-red-600 text-white shadow">C18</span>;
      case 'T16':
      case 'C16':
        return <span className="px-2 py-0.5 rounded text-[11px] font-black bg-amber-600 text-white shadow">C16</span>;
      case 'T13':
      case 'C13':
        return <span className="px-2 py-0.5 rounded text-[11px] font-black bg-yellow-500 text-neutral-950 shadow">C13</span>;
      case 'P':
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-black bg-emerald-600 text-white shadow">P</span>;
    }
  };

  return (
    <div className="w-full pb-16 animate-in fade-in duration-300">
      {/* Page Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-950/80 via-neutral-900 to-red-950/80 border border-neutral-800 p-8 sm:p-12 mb-10 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-600 text-white inline-block mb-3 shadow-md shadow-red-950">
            MTK CINEMAS NOW SHOWING
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            PHIM ĐANG CHIẾU TẠI RẠP
          </h1>
          <p className="text-neutral-300 text-sm mt-3 leading-relaxed">
            Thưởng thức những bom tấn điện ảnh hấp dẫn nhất với chất lượng âm thanh vòm Dolby Atmos và màn chiếu cực đại IMAX.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        {/* Genre Chips */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedGenre === g
                  ? 'bg-red-600 text-white shadow-md shadow-red-900/40'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {g === 'ALL' ? 'Tất Cả Thể Loại' : g}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên phim, diễn viên..."
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-all"
          />
        </div>
      </div>

      {/* Movie Grid */}
      {filteredMovies.length === 0 ? (
        <div className="text-center py-20 bg-neutral-900/50 rounded-3xl border border-neutral-800">
          <Sparkles className="w-10 h-10 text-neutral-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-neutral-300">Không tìm thấy phim phù hợp</h3>
          <p className="text-xs text-neutral-500 mt-1">Vui lòng thử chọn thể loại khác hoặc xóa từ khóa tìm kiếm.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="group bg-neutral-900 border border-neutral-800 hover:border-red-600/70 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-red-950/30 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Poster */}
              <div
                className="relative aspect-[3/4] overflow-hidden bg-neutral-950 cursor-pointer"
                onClick={() => handleAction('DETAIL', movie)}
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  {getAgeRatingBadge(movie.ageRating)}
                  {movie.format && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-neutral-900/90 text-amber-300 border border-amber-500/30 shadow backdrop-blur-sm">
                      {movie.format.split('•')[0]}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-300">
                  <span className="flex items-center gap-1 font-bold text-amber-400 bg-neutral-950/80 px-2 py-0.5 rounded-lg border border-neutral-800">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.9
                  </span>
                  <span className="flex items-center gap-1 font-medium bg-neutral-950/80 px-2 py-0.5 rounded-lg border border-neutral-800">
                    <Clock className="w-3.5 h-3.5 text-red-400" />
                    {movie.durationMinutes}p
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => handleAction('DETAIL', movie)}
                    className="font-black text-base text-white group-hover:text-red-400 transition-colors uppercase tracking-tight line-clamp-1 mb-1.5 cursor-pointer"
                  >
                    {movie.title}
                  </h3>

                  <div className="flex flex-wrap gap-1 mb-2.5">
                    {(Array.isArray(movie.genres) ? movie.genres : []).slice(0, 2).map((g, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-neutral-800 text-neutral-300"
                      >
                        {typeof g === 'object' ? g.name : g}
                      </span>
                    ))}
                  </div>

                  <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                    {movie.synopsis}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-neutral-800/80 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleAction('DETAIL', movie)}
                    className="py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-xs flex items-center justify-center gap-1 border border-neutral-700 transition-colors"
                  >
                    <Info className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Chi Tiết</span>
                  </button>

                  <button
                    onClick={() => handleAction('BOOK', movie)}
                    className="py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1 shadow-md shadow-red-950 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Ticket className="w-3.5 h-3.5 fill-white" />
                    <span>Mua Vé</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}