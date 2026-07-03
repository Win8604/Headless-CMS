'use client';

import React, { useEffect, useState } from 'react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  status: boolean;
}

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);

  // Form states
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState(true);
  const [error, setError] = useState('');

  const fetchFaqs = async () => {
    try {
      const res = await fetch('/api/faqs');
      if (res.ok) {
        const data = await res.json();
        setFaqs(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const openCreateModal = () => {
    setEditingFaq(null);
    setQuestion('');
    setAnswer('');
    setCategory('');
    setStatus(true);
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (faq: FAQ) => {
    setEditingFaq(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setCategory(faq.category);
    setStatus(faq.status);
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const payload = {
      question,
      answer,
      category,
      status,
    };

    try {
      let res;
      if (editingFaq) {
        res = await fetch(`/api/faqs/${editingFaq.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/faqs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save FAQ');
      }

      setModalOpen(false);
      fetchFaqs();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa câu hỏi này không?')) return;

    try {
      const res = await fetch(`/api/faqs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchFaqs();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete FAQ');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Quản lý Câu Hỏi (FAQs)</h1>
          <p className="text-slate-400 text-sm mt-1">Cấu hình các câu hỏi thường gặp hiển thị hỗ trợ người dùng</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-4 py-2.5 rounded-xl transition duration-200 text-sm self-start shadow-md shadow-violet-950/20"
        >
          + Thêm Câu Hỏi mới
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-violet-400"></div>
        </div>
      ) : faqs.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
          <p className="text-slate-400 text-sm">Chưa có câu hỏi nào được tạo. Hãy tạo câu hỏi đầu tiên!</p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs font-semibold uppercase bg-slate-950/40">
                  <th className="px-6 py-4">Phân mục</th>
                  <th className="px-6 py-4">Câu hỏi</th>
                  <th className="px-6 py-4">Trạng thái</th>
                  <th className="px-6 py-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm text-slate-300">
                {faqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4 font-semibold text-violet-400">{faq.category}</td>
                    <td className="px-6 py-4 max-w-md">
                      <div className="font-semibold text-white mb-1">{faq.question}</div>
                      <p className="text-xs text-slate-400 line-clamp-2">{faq.answer}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        faq.status
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-slate-800 text-slate-500 border-slate-700'
                      }`}>
                        {faq.status ? 'Hiển thị' : 'Ẩn'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2.5">
                      <button
                        onClick={() => openEditModal(faq)}
                        className="text-violet-400 hover:text-violet-300 transition-colors"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
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
              {editingFaq ? 'Cập nhật Câu Hỏi' : 'Tạo Câu Hỏi mới'}
            </h3>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-300 text-xs font-semibold mb-1">Danh mục</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Tài khoản, Thanh toán, Hỗ trợ kỹ thuật"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-3 py-2 text-white outline-none transition text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-semibold mb-1">Câu hỏi</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Làm thế nào để đăng ký tài khoản?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-3 py-2 text-white outline-none transition text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-semibold mb-1">Câu trả lời</label>
                <textarea
                  required
                  placeholder="Điền nội dung giải đáp chi tiết tại đây..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-3 py-2 text-white outline-none transition text-sm h-32 resize-none"
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
                  Hiển thị câu hỏi này công khai
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
