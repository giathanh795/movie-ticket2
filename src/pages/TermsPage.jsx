import React, { useState } from 'react';
import {
  FileText,
  CreditCard,
  Lock,
  ShieldCheck,
  HelpCircle,
  ChevronRight,
  ArrowRight,
  Ticket
} from 'lucide-react';

export default function TermsPage({ activeTab = 'general', onTabChange, onBookNow }) {
  const tabs = [
    { key: 'general', label: 'Điều Khoản Chung', icon: FileText },
    { key: 'transaction', label: 'Điều Khoản Giao Dịch', icon: Ticket },
    { key: 'payment', label: 'Chính Sách Thanh Toán', icon: CreditCard },
    { key: 'privacy', label: 'Chính Sách Bảo Mật', icon: Lock },
    { key: 'faq', label: 'Câu Hỏi Thường Gặp (FAQ)', icon: HelpCircle },
  ];

  return (
    <div className="w-full pb-16 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-950/80 via-neutral-900 to-red-950/80 border border-neutral-800 p-8 sm:p-12 mb-10 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-600 text-white inline-block mb-3 shadow-md shadow-red-950">
            MTK LEGAL & POLICIES
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            CHÍNH SÁCH & ĐIỀU KHOẢN
          </h1>
          <p className="text-neutral-300 text-sm mt-3 leading-relaxed">
            Quy định quyền lợi, nghĩa vụ và hướng dẫn giao dịch an toàn tại hệ thống rạp MTK Cinemas.
          </p>
        </div>
      </div>

      {/* Main Grid: Sidebar & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-neutral-900 border border-neutral-800 rounded-3xl p-4 shadow-xl space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 px-3 py-2 block">
              MỤC LỤC CHÍNH SÁCH
            </span>
            {tabs.map((t) => {
              const IconComp = t.icon;
              const isActive = activeTab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => onTabChange(t.key)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md shadow-red-900/50'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComp className="w-4 h-4" />
                    <span>{t.label}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'rotate-90' : ''}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content Panel */}
        <div className="lg:col-span-3">
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 text-sm text-neutral-300 leading-relaxed">
            {activeTab === 'general' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-neutral-800 pb-4">
                  <span className="text-xs font-black text-red-500 uppercase tracking-widest block mb-1">
                    ĐIỀU KHOẢN CHUNG
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
                    QUY ĐỊNH SỬ DỤNG DỊCH VỤ RẠP MTK
                  </h2>
                </div>

                <section className="space-y-3">
                  <h3 className="font-bold text-white text-base">1. Chấp thuận điều khoản</h3>
                  <p>
                    Khi quý khách sử dụng trang web đặt vé hoặc tới các cụm rạp MTK Cinemas, quý khách mặc nhiên đồng ý tuân thủ toàn bộ các quy định tại văn bản này. Mọi hành vi vi phạm có thể dẫn đến việc từ chối phục vụ hoặc hủy vé mà không cần bồi thường.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="font-bold text-white text-base">2. Phân loại độ tuổi xem phim theo Luật Điện Ảnh</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800">
                      <span className="px-2 py-0.5 rounded text-[11px] font-black bg-emerald-600 text-white inline-block mb-1">P</span>
                      <p className="text-xs text-neutral-300 font-bold">Phim phổ biến rộng rãi cho mọi đối tượng khán giả.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800">
                      <span className="px-2 py-0.5 rounded text-[11px] font-black bg-yellow-500 text-neutral-950 inline-block mb-1">C13</span>
                      <p className="text-xs text-neutral-300 font-bold">Cấm khán giả dưới 13 tuổi (13+).</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800">
                      <span className="px-2 py-0.5 rounded text-[11px] font-black bg-amber-600 text-white inline-block mb-1">C16</span>
                      <p className="text-xs text-neutral-300 font-bold">Cấm khán giả dưới 16 tuổi (16+).</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800">
                      <span className="px-2 py-0.5 rounded text-[11px] font-black bg-red-600 text-white inline-block mb-1">C18</span>
                      <p className="text-xs text-neutral-300 font-bold">Cấm khán giả dưới 18 tuổi (18+). Khán giả cần xuất trình CCCD.</p>
                    </div>
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="font-bold text-white text-base">3. Văn hóa phòng chiếu</h3>
                  <p>
                    Nghiêm cấm quay phim, chụp ảnh, livestream hoặc ghi âm nội dung phim dưới mọi hình thức. Quý khách vui lòng để điện thoại chế độ rung, giữ trật tự và không mang thức ăn có mùi nồng từ bên ngoài vào rạp.
                  </p>
                </section>
              </div>
            )}

            {activeTab === 'transaction' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-neutral-800 pb-4">
                  <span className="text-xs font-black text-red-500 uppercase tracking-widest block mb-1">
                    GIAO DỊCH TRỰC TUYẾN
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
                    ĐIỀU KHOẢN ĐẶT VÉ TRỰC TUYẾN
                  </h2>
                </div>

                <section className="space-y-3">
                  <h3 className="font-bold text-white text-base">1. Cơ chế giữ chỗ tạm thời (Seat Hold)</h3>
                  <p>
                    Khi chọn ghế, hệ thống sẽ tạm giữ chỗ ghế đó cho quý khách trong thời gian <strong className="text-red-400">10 phút</strong>. Quý khách cần hoàn tất thanh toán trước khi đồng hồ đếm ngược kết thúc để xác nhận quyền sở hữu vé.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="font-bold text-white text-base">2. Chính sách Không hoàn / Không đổi</h3>
                  <p>
                    Vé xem phim đã được thanh toán thành công là vé cuối cùng và không áp dụng chính sách đổi trả hoặc hoàn tiền. Khán giả vui lòng kiểm tra chính xác tên phim, cụm rạp, suất chiếu và số ghế trước khi xác nhận thanh toán.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="font-bold text-white text-base">3. Xử lý sự cố kỹ thuật</h3>
                  <p>
                    Trong trường hợp suất chiếu bị gián đoạn do sự cố bất khả kháng (mất điện, sự cố máy chiếu Laser), MTK Cinemas cam kết hoàn tiền 100% hoặc cấp vé xem suất chiếu tương đương tùy nhu cầu của khách hàng.
                  </p>
                </section>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-neutral-800 pb-4">
                  <span className="text-xs font-black text-red-500 uppercase tracking-widest block mb-1">
                    CỔNG THANH TOÁN
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
                    CHÍNH SÁCH THANH TOÁN AN TOÀN
                  </h2>
                </div>

                <section className="space-y-3">
                  <h3 className="font-bold text-white text-base">1. Phương thức thanh toán được chấp nhận</h3>
                  <p>
                    MTK Cinemas tích hợp cổng thanh toán trực tiếp qua <strong>PayOS / VietQR</strong> (quét mã QR tức thời từ mọi ngân hàng và ví điện tử) cùng thẻ quốc tế Visa, MasterCard, JCB.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="font-bold text-white text-base">2. Bảo mật thông tin thẻ</h3>
                  <p>
                    Chúng tôi tuân thủ nghiêm ngặt chuẩn bảo mật PCI-DSS. Toàn bộ thông tin tài khoản và giao dịch đều được mã hóa SSL/TLS 256-bit qua cổng thanh toán trung gian, MTK Cinemas hoàn toàn không lưu giữ thông tin thẻ của khách hàng.
                  </p>
                </section>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-neutral-800 pb-4">
                  <span className="text-xs font-black text-red-500 uppercase tracking-widest block mb-1">
                    BẢO VỆ DỮ LIỆU
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
                    CHÍNH SÁCH BẢO MẬT THÔNG TIN
                  </h2>
                </div>

                <section className="space-y-3">
                  <h3 className="font-bold text-white text-base">1. Phạm vi thu thập</h3>
                  <p>
                    Thông tin thu thập bao gồm: Họ và tên, số điện thoại, địa chỉ email, và lịch sử giao dịch. Thông tin được thu thập nhằm mục đích cấp vé điện tử và hỗ trợ khách hàng tại rạp.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="font-bold text-white text-base">2. Cam kết bảo mật</h3>
                  <p>
                    MTK Cinemas cam kết không bán hoặc chia sẻ thông tin cá nhân của người dùng cho bất kỳ bên thứ ba nào vì mục đích quảng cáo khi chưa nhận được sự đồng thuận từ phía khách hàng.
                  </p>
                </section>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-neutral-800 pb-4">
                  <span className="text-xs font-black text-red-500 uppercase tracking-widest block mb-1">
                    GIẢI ĐÁP THẮC MẮC
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
                    CÂU HỎI THƯỜNG GẶP (FAQ)
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                    <h4 className="font-bold text-white flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-red-500" />
                      Tôi có cần in vé giấy khi đến rạp không?
                    </h4>
                    <p className="text-xs text-neutral-400">
                      Không cần. Bạn chỉ cần mở ứng dụng vào mục "Vé Của Tôi", đưa mã QR hoặc mã vé cho nhân viên soát vé quét là có thể vào phòng chiếu ngay.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                    <h4 className="font-bold text-white flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-red-500" />
                      Nếu tôi đến muộn sau khi phim đã bắt đầu thì sao?
                    </h4>
                    <p className="text-xs text-neutral-400">
                      Bạn vẫn được phép vào phòng chiếu trong suốt thời gian phim diễn ra. Tuy nhiên hãy di chuyển nhẹ nhàng để tránh làm ảnh hưởng đến các khán giả khác.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                    <h4 className="font-bold text-white flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-red-500" />
                      Tôi có thể thanh toán vé bằng tài khoản ngân hàng nào?
                    </h4>
                    <p className="text-xs text-neutral-400">
                      Mọi ngân hàng tại Việt Nam (Vietcombank, Techcombank, MB Bank, VPBank,...) và các ví điện tử đều quét được mã VietQR PayOS của hệ thống.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom CTA */}
            <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-xs text-neutral-400">Cần thêm hỗ trợ? Hotline: 1900 6017</span>
              <button
                onClick={onBookNow}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-red-950 transition-all hover:scale-105 active:scale-95"
              >
                <Ticket className="w-4 h-4" />
                <span>Đặt Vé Ngay</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}