'use client';

import React, { useEffect, useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'seo' | 'footer'>('seo');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // SEO Form states
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');
  const [ogImage, setOgImage] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');

  // Footer Form states
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [hotline, setHotline] = useState('');
  const [socialMedia, setSocialMedia] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      // Load SEO Settings
      const seoRes = await fetch('/api/settings?type=seo&seoType=GLOBAL');
      if (seoRes.ok) {
        const seoData = await seoRes.json();
        setSeoTitle(seoData.title || '');
        setSeoDescription(seoData.description || '');
        setSeoKeywords(seoData.keywords || '');
        setOgImage(seoData.ogImage || '');
        setCanonicalUrl(seoData.canonicalUrl || '');
      }

      // Load Footer Settings
      const footerRes = await fetch('/api/settings?type=footer');
      if (footerRes.ok) {
        const footerData = await footerRes.json();
        setAddress(footerData.address || '');
        setEmail(footerData.email || '');
        setHotline(footerData.hotline || '');
        setSocialMedia(footerData.socialMedia || '');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveSEO = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const payload = {
      action: 'save_seo',
      data: {
        type: 'GLOBAL',
        title: seoTitle,
        description: seoDescription,
        keywords: seoKeywords,
        ogImage,
        canonicalUrl,
      },
    };

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save SEO settings');
      }

      setMessage({ text: 'Lưu cấu hình SEO thành công!', type: 'success' });
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveFooter = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const payload = {
      action: 'save_footer',
      data: {
        address,
        email,
        hotline,
        socialMedia,
      },
    };

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save footer settings');
      }

      setMessage({ text: 'Lưu cấu hình Footer thành công!', type: 'success' });
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">Cấu hình hệ thống</h1>
        <p className="text-slate-400 text-sm mt-1">Cấu hình SEO Global và Footer chung cho website</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 mb-6 gap-6">
        <button
          onClick={() => {
            setActiveTab('seo');
            setMessage(null);
          }}
          className={`pb-4 text-sm font-semibold transition-all duration-150 border-b-2 ${
            activeTab === 'seo'
              ? 'text-violet-400 border-violet-500'
              : 'text-slate-400 hover:text-slate-200 border-transparent'
          }`}
        >
          SEO Global
        </button>
        <button
          onClick={() => {
            setActiveTab('footer');
            setMessage(null);
          }}
          className={`pb-4 text-sm font-semibold transition-all duration-150 border-b-2 ${
            activeTab === 'footer'
              ? 'text-violet-400 border-violet-500'
              : 'text-slate-400 hover:text-slate-200 border-transparent'
          }`}
        >
          Footer & Thông tin liên hệ
        </button>
      </div>

      {message && (
        <div className={`px-4 py-3 rounded-lg mb-6 border text-sm ${
          message.type === 'success'
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-violet-400"></div>
        </div>
      ) : activeTab === 'seo' ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-3xl shadow-xl">
          <form onSubmit={handleSaveSEO} className="space-y-5">
            <div>
              <label className="block text-slate-300 text-xs font-semibold mb-1.5">Meta Title</label>
              <input
                type="text"
                required
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-4 py-2.5 text-white outline-none transition text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-xs font-semibold mb-1.5">Meta Description</label>
              <textarea
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-4 py-2.5 text-white outline-none transition text-sm h-28 resize-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-xs font-semibold mb-1.5">Keywords (Phân cách bởi dấu phẩy)</label>
              <input
                type="text"
                placeholder="giam ping, giam lag, tang toc game"
                value={seoKeywords}
                onChange={(e) => setSeoKeywords(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-4 py-2.5 text-white outline-none transition text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-xs font-semibold mb-1.5">Ảnh OgImage</label>
                <input
                  type="text"
                  placeholder="/uploads/og-image.jpg"
                  value={ogImage}
                  onChange={(e) => setOgImage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-4 py-2.5 text-white outline-none transition text-sm"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-xs font-semibold mb-1.5">Canonical URL</label>
                <input
                  type="text"
                  placeholder="https://hyperfast.vn"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-4 py-2.5 text-white outline-none transition text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-4 py-2 rounded-lg transition duration-150 text-xs shadow-md shadow-violet-950/20 disabled:opacity-50"
            >
              {saving ? 'Đang lưu...' : 'Lưu SEO settings'}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-3xl shadow-xl">
          <form onSubmit={handleSaveFooter} className="space-y-5">
            <div>
              <label className="block text-slate-300 text-xs font-semibold mb-1.5">Địa chỉ</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-4 py-2.5 text-white outline-none transition text-sm h-20 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-xs font-semibold mb-1.5">Email liên hệ</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-4 py-2.5 text-white outline-none transition text-sm"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-xs font-semibold mb-1.5">Hotline</label>
                <input
                  type="text"
                  value={hotline}
                  onChange={(e) => setHotline(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-4 py-2.5 text-white outline-none transition text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-xs font-semibold mb-1.5">
                Mạng xã hội (JSON Format hoặc Text)
              </label>
              <textarea
                placeholder='{"facebook": "url", "youtube": "url"}'
                value={socialMedia}
                onChange={(e) => setSocialMedia(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-4 py-2.5 text-white outline-none transition text-sm font-mono h-24 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-4 py-2 rounded-lg transition duration-150 text-xs shadow-md shadow-violet-950/20 disabled:opacity-50"
            >
              {saving ? 'Đang lưu...' : 'Lưu Footer settings'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
