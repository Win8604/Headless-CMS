'use client';

import React, { useEffect, useState } from 'react';

interface Stats {
  banners: number;
  packages: number;
  games: number;
  faqs: number;
  media: number;
  users: number;
}

export default function DashboardHome() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error('Error fetching stats', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    { name: 'Banners Quảng Cáo', count: stats?.banners ?? 0, color: 'from-pink-500 to-rose-500', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'Gói Cước', count: stats?.packages ?? 0, color: 'from-violet-500 to-indigo-500', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { name: 'Tựa Games Hỗ Trợ', count: stats?.games ?? 0, color: 'from-blue-500 to-cyan-500', icon: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM9 8H15V10H9V8ZM9 12H15V14H9V12ZM9 16H13V18H9V16Z' },
    { name: 'Câu hỏi thường gặp', count: stats?.faqs ?? 0, color: 'from-teal-500 to-emerald-500', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Hình ảnh & Media', count: stats?.media ?? 0, color: 'from-amber-500 to-orange-500', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' },
    { name: 'Tài khoản Quản Trị', count: stats?.users ?? 0, color: 'from-purple-500 to-fuchsia-500', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-violet-400"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">Tổng quan Hệ thống</h1>
        <p className="text-slate-400 text-sm mt-1">Chào mừng bạn quay trở lại trang quản trị của HyperFast.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => (
          <div
            key={card.name}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group shadow-lg"
          >
            {/* Soft decorative background gradient */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-5 group-hover:opacity-10 blur-xl transition-all duration-300`} />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">{card.name}</p>
                <p className="text-3xl font-bold text-white mt-2 tracking-tight">
                  {card.count}
                </p>
              </div>

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-md shadow-violet-950/20`}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info section */}
      <div className="mt-10 bg-slate-900/40 border border-slate-850 rounded-2xl p-6 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-slate-200 mb-2">Hướng dẫn Nhanh</h3>
        <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside">
          <li>Sử dụng menu bên trái để điều hướng và quản lý các phân mục dữ liệu.</li>
          <li>Khi thay đổi dữ liệu, click <strong>Lưu lại</strong> để đồng bộ xuống cơ sở dữ liệu MySQL.</li>
          <li>Truy cập thư viện Media để upload hoặc quản lý các đường dẫn hình ảnh.</li>
        </ul>
      </div>
    </div>
  );
}
