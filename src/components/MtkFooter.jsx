import React from 'react';
import Logo from './Logo';
import {
  Sparkles,
  Ticket,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  ChevronRight
} from 'lucide-react';

export default function MtkFooter({ onNavigate, onOpenAuth, isAuthenticated }) {
  // Cinema tech formats
  const formats = [
    { name: 'IMAX', desc: 'Màn Hình Cực Đại Laser' },
    { name: '4DX', desc: 'Trải Nghiệm Đa Giác Quan' },
    { name: 'SCREENX', desc: 'Góc Nhìn 270 Độ 3 Màn Hình' },
    { name: 'GOLD CLASS', desc: 'Phòng Chiếu Thượng Hạng' },
    { name: "L'AMOUR", desc: 'Giường Nằm Êm Ái Cao Cấp' },
    { name: 'SWEETBOX', desc: 'Ghế Đôi Riêng Tư Lãng Mạn' },
    { name: 'STARIUM', desc: 'Công Nghệ Laser Siêu Sáng' },
    { name: 'PREMIUM', desc: 'Đẳng Cấp Điện Ảnh Hiện Đại' },
    { name: 'CINE & FORET', desc: 'Rạp Phim Không Gian Xanh' },
    { name: 'DOLBY ATMOS', desc: 'Âm Thanh Vòm Đa Chiều' },
  ];

  return (
    <div className="w-full space-y-12 mt-12">
      {/* 1. CINEMA FORMATS STRIP */}
      <div className="border-y border-neutral-800/80 bg-neutral-900/40 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black tracking-widest text-neutral-400 uppercase">
              CÔNG NGHỆ PHÒNG CHIẾU ĐẶC BIỆT TẠI MTK CINEMAS
            </span>
            <button
              onClick={() => onNavigate('features')}
              className="text-xs text-red-500 font-bold hover:underline cursor-pointer"
            >
              Xem chi tiết công nghệ &rarr;
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5">
            {formats.map((fmt, i) => (
              <div
                key={i}
                onClick={() => onNavigate('features')}
                className="group p-2.5 rounded-2xl bg-neutral-950/80 border border-neutral-800 hover:border-red-600/60 text-center transition-all hover:-translate-y-1 cursor-pointer"
              >
                <div className="font-black text-sm text-neutral-200 group-hover:text-red-500 tracking-wider">
                  {fmt.name}
                </div>
                <div className="text-[9px] text-neutral-500 line-clamp-1 mt-0.5 font-medium">
                  {fmt.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. PROFESSIONAL MTK CINEMAS FOOTER */}
      <footer className="border-t border-neutral-800 bg-neutral-950 pt-12 pb-8 px-4 lg:px-8 text-neutral-400 text-xs">
        <div className="max-w-7xl mx-auto">
          {/* Top 4 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-800/80">
            {/* Col 1: Rạp MTK */}
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider mb-3">Rạp MTK</h5>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => onNavigate('about')}
                    className="hover:text-red-400 transition-colors text-left"
                  >
                    Giới Thiệu MTK Cinemas
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('features')}
                    className="hover:text-red-400 transition-colors text-left"
                  >
                    Đặc Trưng Rạp MTK
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('now_showing')}
                    className="hover:text-red-400 transition-colors text-left"
                  >
                    Phim Đang Chiếu
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      if (!isAuthenticated) onOpenAuth();
                      else onNavigate('about');
                    }}
                    className="hover:text-red-400 transition-colors text-left"
                  >
                    Thẻ Thành Viên MTK
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 2: Điều Khoản Sử Dụng (Connected to pages) */}
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider mb-3">Điều Khoản Sử Dụng</h5>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => onNavigate('terms_general')}
                    className="hover:text-red-400 transition-colors text-left"
                  >
                    Điều Khoản Chung
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('terms_transaction')}
                    className="hover:text-red-400 transition-colors text-left"
                  >
                    Điều Khoản Giao Dịch
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('terms_payment')}
                    className="hover:text-red-400 transition-colors text-left"
                  >
                    Chính Sách Thanh Toán
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('terms_privacy')}
                    className="hover:text-red-400 transition-colors text-left"
                  >
                    Chính Sách Bảo Mật
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('faq')}
                    className="hover:text-red-400 transition-colors text-left font-medium text-neutral-300 hover:text-white"
                  >
                    Câu Hỏi Thường Gặp (FAQ)
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Social & Compliance */}
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider mb-3">Kết Nối Với Chúng Tôi</h5>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-red-600 text-white flex items-center justify-center font-bold text-xs cursor-pointer transition-colors">
                  f
                </span>
                <span className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-red-600 text-white flex items-center justify-center font-bold text-xs cursor-pointer transition-colors">
                  yt
                </span>
                <span className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-red-600 text-white flex items-center justify-center font-bold text-xs cursor-pointer transition-colors">
                  in
                </span>
                <span className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-blue-600 text-white flex items-center justify-center font-bold text-xs cursor-pointer transition-colors">
                  Zalo
                </span>
              </div>

              {/* Ministry of Industry and Trade Stamp Badge */}
              <div className="inline-flex items-center gap-2 p-2 rounded-xl bg-blue-950/40 border border-blue-800/60 text-blue-300 text-[11px] font-bold">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>ĐÃ THÔNG BÁO BỘ CÔNG THƯƠNG</span>
              </div>
            </div>

            {/* Col 4: Customer Care */}
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider mb-3">Chăm Sóc Khách Hàng</h5>
              <div className="space-y-2">
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-red-500" />
                  Hotline: <strong className="text-white text-sm">1900 6017</strong>
                </p>
                <p className="text-[11px] text-neutral-500">
                  Giờ làm việc: 8:00 - 22:00 (Tất cả các ngày bao gồm Lễ Tết)
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-red-500" />
                  Email hỗ trợ: <span className="text-neutral-300">hotro@mtkcinemas.vn</span>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Legal & Company Info */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <div className="space-y-1 text-center md:text-left">
              <p className="font-bold text-neutral-300 text-xs">
                CÔNG TY CỔ PHẦN ĐIỆN ẢNH MTK VIỆT NAM (MTK CINEMAS)
              </p>
              <p>
                Giấy Chứng nhận ĐKKD số: 0303675393 đăng ký lần đầu ngày 31/7/2008, Sở KH&ĐT TP.HCM.
              </p>
              <p>
                Địa chỉ: Tầng 5, TTTM Landmark 81, Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh
              </p>
              <p>COPYRIGHT 2026 MTK CINEMAS VIETNAM CO., LTD. ALL RIGHTS RESERVED.</p>
            </div>

            <Logo onClick={() => onNavigate('home')} />
          </div>
        </div>
      </footer>
    </div>
  );
}