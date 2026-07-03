'use client';

import React, { useEffect, useState } from 'react';

interface Game {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
}

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');
  const [error, setError] = useState('');

  const fetchGames = async () => {
    try {
      const res = await fetch('/api/games');
      if (res.ok) {
        const data = await res.json();
        setGames(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const openCreateModal = () => {
    setEditingGame(null);
    setName('');
    setSlug('');
    setDescription('');
    setImageUrl('');
    setSeoTitle('');
    setSeoDescription('');
    setSeoKeywords('');
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (game: Game) => {
    setEditingGame(game);
    setName(game.name);
    setSlug(game.slug);
    setDescription(game.description || '');
    setImageUrl(game.imageUrl || '');
    setSeoTitle(game.seoTitle || '');
    setSeoDescription(game.seoDescription || '');
    setSeoKeywords(game.seoKeywords || '');
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const payload = {
      name,
      slug,
      description,
      imageUrl,
      seoTitle,
      seoDescription,
      seoKeywords,
    };

    try {
      let res;
      if (editingGame) {
        res = await fetch(`/api/games/${editingGame.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/games', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save game');
      }

      setModalOpen(false);
      fetchGames();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa game này không?')) return;

    try {
      const res = await fetch(`/api/games/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchGames();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete game');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Quản lý Tựa Games</h1>
          <p className="text-slate-400 text-sm mt-1">Cấu hình các tựa game được hỗ trợ tăng tốc trên website</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-4 py-2.5 rounded-xl transition duration-200 text-sm self-start shadow-md shadow-violet-950/20"
        >
          + Thêm Game mới
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-violet-400"></div>
        </div>
      ) : games.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
          <p className="text-slate-400 text-sm">Chưa có tựa game nào. Hãy thêm tựa game đầu tiên!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <div key={game.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700 transition duration-200 flex flex-col justify-between">
              <div>
                <div className="h-40 bg-slate-950 relative border-b border-slate-850">
                  {game.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={game.imageUrl}
                      alt={game.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600 font-bold">
                      NO IMAGE
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-1">{game.name}</h3>
                  <p className="text-xs text-violet-400 font-medium font-mono">/{game.slug}</p>
                  <p className="text-slate-400 text-xs mt-3 line-clamp-2">{game.description}</p>
                </div>
              </div>

              <div className="p-5 border-t border-slate-800/80 bg-slate-950/30 flex justify-end space-x-2.5">
                <button
                  onClick={() => openEditModal(game)}
                  className="text-violet-400 hover:text-violet-300 text-xs font-semibold"
                >
                  Sửa
                </button>
                <span className="text-slate-700 text-xs">|</span>
                <button
                  onClick={() => handleDelete(game.id)}
                  className="text-red-400 hover:text-red-300 text-xs font-semibold"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-850 rounded-2xl w-full max-w-2xl p-6 shadow-2xl relative my-8">
            <h3 className="text-xl font-bold text-white mb-6">
              {editingGame ? 'Cập nhật Tựa Game' : 'Thêm Tựa Game mới'}
            </h3>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 text-xs font-semibold mb-1">Tên Game</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Valorant"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-3 py-2 text-white outline-none transition text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-xs font-semibold mb-1">
                    Slug (Để trống để tự động tạo)
                  </label>
                  <input
                    type="text"
                    placeholder="valorant"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-3 py-2 text-white outline-none transition text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-semibold mb-1">Mô tả ngắn</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-3 py-2 text-white outline-none transition text-sm h-20 resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-semibold mb-1">Đường dẫn ảnh Cover</label>
                <input
                  type="text"
                  placeholder="/uploads/valorant.png"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-3 py-2 text-white outline-none transition text-sm"
                />
              </div>

              {/* SEO Block */}
              <div className="border-t border-slate-800 pt-4 mt-6">
                <h4 className="text-sm font-bold text-violet-400 mb-3 uppercase tracking-wider">Cấu hình SEO</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-300 text-xs font-semibold mb-1">SEO Title</label>
                    <input
                      type="text"
                      placeholder="Valorant Ping Reducer - Tăng Tốc Game HyperFast"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-3 py-2 text-white outline-none transition text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-xs font-semibold mb-1">SEO Description</label>
                    <textarea
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-3 py-2 text-white outline-none transition text-sm h-16 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-xs font-semibold mb-1">SEO Keywords (Phân cách bởi dấu phẩy)</label>
                    <input
                      type="text"
                      placeholder="valorant, giam ping, hyperfast, tang toc game"
                      value={seoKeywords}
                      onChange={(e) => setSeoKeywords(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-3 py-2 text-white outline-none transition text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-slate-800/80 mt-6">
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
