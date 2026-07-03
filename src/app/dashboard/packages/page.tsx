'use client';

import React, { useEffect, useState } from 'react';

interface Package {
  id: string;
  name: string;
  price: string;
  features: string;
  imageUrl: string | null;
  status: boolean;
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [features, setFeatures] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState(true);
  const [error, setError] = useState('');

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/packages');
      if (res.ok) {
        const data = await res.json();
        setPackages(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const openCreateModal = () => {
    setEditingPackage(null);
    setName('');
    setPrice('');
    setFeatures('');
    setImageUrl('');
    setStatus(true);
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (pkg: Package) => {
    setEditingPackage(pkg);
    setName(pkg.name);
    setPrice(pkg.price);
    setFeatures(pkg.features);
    setImageUrl(pkg.imageUrl || '');
    setStatus(pkg.status);
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const payload = {
      name,
      price,
      features,
      imageUrl,
      status,
    };

    try {
      let res;
      if (editingPackage) {
        res = await fetch(`/api/packages/${editingPackage.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/packages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save package');
      }

      setModalOpen(false);
      fetchPackages();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa gói cước này không?')) return;

    try {
      const res = await fetch(`/api/packages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchPackages();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete package');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Quản lý Gói Cước</h1>
          <p className="text-slate-400 text-sm mt-1">Cấu hình các gói dịch vụ bán hàng trên website</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-4 py-2.5 rounded-xl transition duration-200 text-sm self-start shadow-md shadow-violet-950/20"
        >
          + Thêm Gói Cước mới
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-violet-400"></div>
        </div>
      ) : packages.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
          <p className="text-slate-400 text-sm">Chưa có gói cước nào. Hãy tạo gói cước đầu tiên!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    pkg.status
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-slate-800 text-slate-500 border-slate-700'
                  }`}>
                    {pkg.status ? 'Mở bán' : 'Ngưng'}
                  </span>
                </div>

                <div className="mb-4">
                  <span className="text-2xl font-black text-violet-400">{pkg.price}</span>
                  <span className="text-slate-500 text-xs ml-1">/ tháng</span>
                </div>

                <div className="border-t border-slate-800/80 pt-4 mb-6">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Tính năng:</p>
                  <ul className="text-slate-300 text-xs space-y-2">
                    {pkg.features.split('\n').filter(f => f.trim()).map((feat, idx) => (
                      <li key={idx} className="flex items-center">
                        <svg className="w-3.5 h-3.5 text-violet-400 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-end border-t border-slate-800/80 pt-4 space-x-3 mt-auto">
                <button
                  onClick={() => openEditModal(pkg)}
                  className="bg-slate-800 hover:bg-slate-750 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(pkg.id)}
                  className="bg-red-950/20 hover:bg-red-900/20 text-red-400 px-3 py-1.5 rounded-lg text-xs font-semibold transition border border-red-900/30"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-850 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            <h3 className="text-xl font-bold text-white mb-6">
              {editingPackage ? 'Cập nhật Gói Cước' : 'Tạo Gói Cước mới'}
            </h3>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 text-xs font-semibold mb-1">Tên gói</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Pro"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-3 py-2 text-white outline-none transition text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-xs font-semibold mb-1">Giá bán</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: 199.000đ"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-3 py-2 text-white outline-none transition text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-semibold mb-1">
                  Tính năng (Mỗi dòng một tính năng)
                </label>
                <textarea
                  required
                  placeholder="Băng thông không giới hạn&#10;Hỗ trợ 24/7&#10;IP riêng biệt"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-3 py-2 text-white outline-none transition text-sm h-32 resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-semibold mb-1">Ảnh đại diện (Không bắt buộc)</label>
                <input
                  type="text"
                  placeholder="/uploads/package-image.png"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-3 py-2 text-white outline-none transition text-sm"
                />
              </div>

              <div className="flex items-center pt-2">
                <input
                  type="checkbox"
                  id="status"
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                  className="w-4 h-4 text-violet-600 bg-slate-950 border-slate-800 rounded focus:ring-violet-500"
                />
                <label htmlFor="status" className="ml-2 text-slate-300 text-sm font-semibold select-none">
                  Mở bán gói cước này
                </label>
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
