import React, { useState } from 'react';
import { User, Mail, ShieldCheck, CheckCircle2, AlertCircle, Save } from 'lucide-react';
import { updateUserProfile } from '../api';

export default function ProfilePage({ currentUserProfile, onProfileUpdated }) {
  const [fullName, setFullName] = useState(currentUserProfile?.fullName || 'Khách Hàng MTK');
  const [avatarUrl, setAvatarUrl] = useState(
    currentUserProfile?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
  );
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
  ];

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    setErrorMsg('');

    try {
      const updated = await updateUserProfile(fullName, avatarUrl);
      setMsg('Cập nhật thông tin cá nhân thành công!');
      if (onProfileUpdated) onProfileUpdated(updated);
    } catch (err) {
      setErrorMsg(err.message || 'Cập nhật thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 animate-in fade-in duration-300">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl space-y-6">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-50 text-red-600 inline-block mb-2">
            HỒ SƠ CÁ NHÂN
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
            Thông Tin Tài Khoản
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Quản lý thông tin hồ sơ và tùy chỉnh avatar hiển thị
          </p>
        </div>

        {msg && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{msg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Current Avatar Preview */}
        <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-20 h-20 rounded-2xl object-cover border-2 border-red-500 shadow-md"
          />
          <div>
            <span className="text-xs font-bold text-slate-700 block mb-1">Chọn ảnh đại diện:</span>
            <div className="flex items-center gap-2">
              {sampleAvatars.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setAvatarUrl(url)}
                  className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-all ${
                    avatarUrl === url ? 'border-red-600 scale-110 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt="preset" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Họ và tên</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Địa chỉ Email</label>
            <input
              type="email"
              disabled
              value={currentUserProfile?.email || 'customer@example.com'}
              className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Vai trò hệ thống (Role)</label>
            <span className="inline-block px-3 py-1 rounded-xl bg-red-50 border border-red-200 text-red-700 font-bold text-xs">
              {currentUserProfile?.role || 'CUSTOMER'}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all hover:scale-[1.01]"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Đang lưu...' : 'Lưu Thay Đổi Hồ Sơ'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}