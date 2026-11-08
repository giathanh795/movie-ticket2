import React from 'react';
import { Award, Sparkles, Ticket, ShieldCheck, MapPin, Users, HeartHandshake, Film } from 'lucide-react';

export default function AboutPage({ onBookNow }) {
  const cinemaLocations = [
    { name: 'MTK Landmark 81', address: 'Tầng B1, TTTM Vincom Landmark 81, 720A Điện Biên Phủ, Bình Thạnh, TP.HCM', screens: '8 Phòng (IMAX Laser & ScreenX)' },
    { name: 'MTK Vincom Đồng Khởi', address: 'Tầng 3, 72 Lê Thánh Tôn & 45A Lý Tự Trọng, Bến Nghé, Quận 1, TP.HCM', screens: '7 Phòng (Dolby Atmos & Gold Class)' },
    { name: 'MTK Royal City', address: 'Tầng B2, 72A Nguyễn Trãi, Thượng Đình, Thanh Xuân, Hà Nội', screens: '10 Phòng (SweetBox & 4DX)' },
    { name: 'MTK Bà Triệu', address: 'Tầng 6, 191 Bà Triệu, Lê Đại Hành, Hai Bà Trưng, Hà Nội', screens: '6 Phòng (Laser Digital)' },
  ];

  return (
    <div className="w-full pb-16 animate-in fade-in duration-300 space-y-12">
      {/* 1. Hero Cover */}
      <div className="relative rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl h-80 sm:h-96 flex items-end p-6 sm:p-12">
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&auto=format&fit=crop&q=80"
          alt="MTK Cinemas Theater"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
        <div className="relative z-10 max-w-2xl">
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-600 text-white inline-block mb-3 shadow-md shadow-red-950">
            VỀ CHÚNG TÔI
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            HỆ THỐNG RẠP MTK CINEMAS
          </h1>
          <p className="text-neutral-300 text-sm mt-3 leading-relaxed">
            Nơi kết nối cảm xúc và nghệ thuật thứ bảy với tiêu chuẩn kỹ thuật nghe nhìn hàng đầu Việt Nam.
          </p>
        </div>
      </div>

      {/* 2. Story & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-neutral-900/60 border border-neutral-800 rounded-3xl p-6 sm:p-10">
        <div className="space-y-4 text-sm text-neutral-300 leading-relaxed">
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">
            SỨ MỆNH NÂNG TẦM TRẢI NGHIỆM ĐIỆN ẢNH
          </h2>
          <p>
            Được ra đời với khát vọng mang đến cho khán giả Việt Nam những chuẩn mực giải trí quốc tế, <strong className="text-red-500 font-bold">MTK Cinemas</strong> không ngừng đổi mới công nghệ, nâng cấp hệ thống phòng chiếu hiện đại và hoàn thiện dịch vụ chăm sóc khách hàng.
          </p>
          <p>
            Chúng tôi tin rằng rạp chiếu phim không chỉ là nơi xem phim, mà là điểm hẹn văn hóa, nơi khán giả chia sẻ cảm xúc bên người thân yêu và tận hưởng trọn vẹn từng khoảnh khắc điện ảnh sống động.
          </p>
          <p>
            Đặc biệt, hệ thống phần mềm quản lý vé trực tuyến của MTK được xây dựng trên nền tảng vi dịch vụ thế hệ mới (Microservices), giúp khách hàng chọn chỗ ngồi chính xác và thanh toán tức thời không lo nghẽn mạng vào các dịp bom tấn công chiếu.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 text-center space-y-1.5">
            <span className="text-3xl font-black text-red-500">30+</span>
            <span className="text-xs text-neutral-400 block font-bold">Cụm rạp toàn quốc</span>
          </div>
          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 text-center space-y-1.5">
            <span className="text-3xl font-black text-amber-500">100%</span>
            <span className="text-xs text-neutral-400 block font-bold">Phòng chiếu Laser</span>
          </div>
          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 text-center space-y-1.5">
            <span className="text-3xl font-black text-emerald-500">5M+</span>
            <span className="text-xs text-neutral-400 block font-bold">Khán giả hài lòng</span>
          </div>
          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 text-center space-y-1.5">
            <span className="text-3xl font-black text-blue-500">24/7</span>
            <span className="text-xs text-neutral-400 block font-bold">Hỗ trợ trực tuyến</span>
          </div>
        </div>
      </div>

      {/* 3. Core Values */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-black text-white text-lg">Chất Lượng Đỉnh Cao</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Cam kết hệ thống máy chiếu, dàn loa và kích thước màn hình luôn được bảo trì và cân chỉnh định kỳ theo tiêu chuẩn Hollywood.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-500">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="font-black text-white text-lg">Tận Tâm Phục Vụ</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Đội ngũ nhân viên chuyên nghiệp, thân thiện, chu đáo trong từng khâu phục vụ bắp nước và đón tiếp khán giả.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-500">
            <Ticket className="w-6 h-6" />
          </div>
          <h3 className="font-black text-white text-lg">Tiện Lợi Số Hóa</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Đặt vé và chọn ghế thông minh trong vài cú chạm, check-in mã QR không chạm ngay tại cửa phòng chiếu.
          </p>
        </div>
      </div>

      {/* 4. Representative Locations */}
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" />
              CÁC CỤM RẠP TIÊU BIỂU
            </h3>
            <p className="text-xs text-neutral-400 mt-1">Các trung tâm chiếu phim công nghệ cao của MTK Cinemas</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cinemaLocations.map((loc, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
              <h4 className="font-black text-white text-sm flex items-center justify-between">
                <span>{loc.name}</span>
                <span className="text-[10px] font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800">
                  {loc.screens}
                </span>
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {loc.address}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}