'use client';

import React, { useEffect, useState } from 'react';

interface Media {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  createdAt: string;
}

export default function MediaPage() {
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/media');
      if (res.ok) {
        const data = await res.json();
        setMediaList(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        fetchMedia();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to upload file');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa file media này không?')) return;

    try {
      const res = await fetch(`/api/media/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchMedia();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete file');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Thư viện Media</h1>
          <p className="text-slate-400 text-sm mt-1">Upload và quản lý hình ảnh sử dụng cho Banners, Packages, Games</p>
        </div>

        <div className="relative">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*"
            disabled={uploading}
            onChange={handleFileUpload}
          />
          <label
            htmlFor="file-upload"
            className={`bg-violet-600 hover:bg-violet-500 text-white font-semibold px-4 py-2.5 rounded-xl transition duration-200 text-sm cursor-pointer inline-flex items-center shadow-md shadow-violet-950/20 ${
              uploading ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            {uploading ? (
              <>
                <svg className="animate-spin h-4 w-4 mr-2 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Đang tải lên...
              </>
            ) : (
              'Tải lên File mới'
            )}
          </label>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-violet-400"></div>
        </div>
      ) : mediaList.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
          <p className="text-slate-400 text-sm">Thư viện media trống. Hãy upload file đầu tiên!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {mediaList.map((media) => {
            const isImage = media.type.startsWith('image/');
            return (
              <div
                key={media.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl group hover:border-slate-700 transition duration-200 relative flex flex-col justify-between"
              >
                <div className="aspect-square bg-slate-950 relative flex items-center justify-center border-b border-slate-850 overflow-hidden">
                  {isImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={media.url}
                      alt={media.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <svg className="w-12 h-12 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}

                  {/* Copy URL trigger overlay */}
                  <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-3 transition-opacity duration-200 p-4">
                    <button
                      onClick={() => copyToClipboard(media.url, media.id)}
                      className="bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition duration-150 w-full"
                    >
                      {copiedId === media.id ? 'Đã sao chép!' : 'Copy URL'}
                    </button>
                    <button
                      onClick={() => handleDelete(media.id)}
                      className="bg-red-950/40 hover:bg-red-900/40 border border-red-900/50 text-red-400 text-xs font-semibold px-3 py-1.5 rounded-lg transition duration-150 w-full"
                    >
                      Xóa File
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-xs font-semibold text-slate-200 truncate" title={media.name}>
                    {media.name}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">{formatSize(media.size)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
