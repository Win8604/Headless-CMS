'use client';

import React, { useEffect, useState } from 'react';

interface Banner {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  buttonText: string | null;
  buttonUrl: string | null;
  order: number;
  status: boolean;
}

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [buttonUrl, setButtonUrl] = useState('');
  const [order, setOrder] = useState(0);
  const [status, setStatus] = useState(true);
  const [error, setError] = useState('');

  const fetchBanners = async () => {
    try {
      const res = await fetch('/api/banners');
      if (res.ok) {
        const data = await res.json();
        setBanners(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const openCreateModal = () => {
    setEditingBanner(null);
    setTitle('');
    setDescription('');
    setImageUrl('');
    setButtonText('');
    setButtonUrl('');
    setOrder(0);
    setStatus(true);
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (banner: Banner) => {
    setEditingBanner(banner);
    setTitle(banner.title);
    setDescription(banner.description || '');
    setImageUrl(banner.imageUrl);
    setButtonText(banner.buttonText || '');
    setButtonUrl(banner.buttonUrl || '');
    setOrder(banner.order);
    setStatus(banner.status);
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const payload = {
      title,
      description,
      imageUrl,
      buttonText,
      buttonUrl,
      order,
      status,
    };

    try {
      let res;
      if (editingBanner) {
        res = await fetch(`/api/banners/${editingBanner.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/banners', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save banner');
      }

      setModalOpen(false);
      fetchBanners();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa banner này không?')) return;

    try {
      const res = await fetch(`/api/banners/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchBanners();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete banner');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Quản lý Banners</h1>
          <p className="text-slate-400 text-sm mt-1">Cấu hình các banners quảng cáo hiển thị ở trang chủ</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-4 py-2.5 rounded-xl transition duration-200 text-sm self-start shadow-md shadow-violet-950/20"
        >
          + Thêm Banner mới
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-violet-400"></div>
        </div>
      ) : banners.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
          <p className="text-slate-400 text-sm">Chưa có banner nào. Hãy tạo banner đầu tiên của bạn!</p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs font-semibold uppercase bg-slate-950/40">
                  <th className="px-6 py-4">Hình ảnh</th>
                  <th className="px-6 py-4">Tiêu đề</th>
                  <th className="px-6 py-4">Nút bấm</th>
                  <th className="px-6 py-4">Thứ tự</th>
                  <th className="px-6 py-4">Trạng thái</th>
                  <th className="px-6 py-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm text-slate-300">
                {banners.map((banner) => (
                  <tr key={banner.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={banner.imageUrl}
                        alt={banner.title}
                        className="w-24 h-12 object-cover rounded-lg border border-slate-800 bg-slate-950"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{banner.title}</div>
                      <div className="text-xs text-slate-500 max-w-xs truncate">{banner.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      {banner.buttonText ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                          {banner.buttonText}
                        </span>
                      ) : (
                        <span className="text-slate-600">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">{banner.order}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        banner.status
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-slate-800 text-slate-500 border-slate-700'
                      }`}>
                        {banner.status ? 'Hoạt động' : 'Tắt'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(banner)}
                        className="text-violet-400 hover:text-violet-300 transition-colors duration-150"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(banner.id)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-150"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-850 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            <h3 className="text-xl font-bold text-white mb-6">
              {editingBanner ? 'Cập nhật Banner' : 'Tạo Banner mới'}
            </h3>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-300 text-xs font-semibold mb-1">Tiêu đề</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-3 py-2 text-white outline-none transition text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-semibold mb-1">Mô tả (Không bắt buộc)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-3 py-2 text-white outline-none transition text-sm h-20 resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-semibold mb-1">Đường dẫn hình ảnh</label>
                <input
                  type="text"
                  required
                  placeholder="https://example.com/image.jpg hoặc /uploads/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-3 py-2 text-white outline-none transition text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 text-xs font-semibold mb-1">Chữ trên nút bấm</label>
                  <input
                    type="text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-3 py-2 text-white outline-none transition text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-xs font-semibold mb-1">Đường dẫn nút bấm</label>
                  <input
                    type="text"
                    value={buttonUrl}
                    onChange={(e) => setButtonUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-3 py-2 text-white outline-none transition text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 items-center pt-2">
                <div>
                  <label className="block text-slate-300 text-xs font-semibold mb-1">Thứ tự hiển thị</label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-3 py-2 text-white outline-none transition text-sm"
                  />
                </div>
                <div className="flex items-center h-full pt-4">
                  <input
                    type="checkbox"
                    id="status"
                    checked={status}
                    onChange={(e) => setStatus(e.target.checked)}
                    className="w-4 h-4 text-violet-600 bg-slate-950 border-slate-800 rounded focus:ring-violet-500"
                  />
                  <label htmlFor="status" className="ml-2 text-slate-300 text-sm font-semibold select-none">
                    Kích hoạt hoạt động
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-4 py-2 rounded-lg transition text-xs"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-4 py-2 rounded-lg transition text-xs"
                >
                  Lưu lại
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
