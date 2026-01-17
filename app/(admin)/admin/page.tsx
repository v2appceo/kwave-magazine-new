'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function AdminPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles_multilang')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase
        .from('articles_multilang')
        .delete()
        .eq('id', id);

      if (error) throw error;
      alert('삭제되었습니다.');
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">관리자 대시보드</h1>
          <Link
            href="/admin/create"
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
          >
            + 새 기사 작성
          </Link>
        </div>

        <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
          <table className="w-full text-left">
            <thead className="bg-gray-900/50 text-gray-400">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">제목 (KO)</th>
                <th className="p-4">카테고리</th>
                <th className="p-4">작성일</th>
                <th className="p-4 text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">로딩 중...</td>
                </tr>
              ) : articles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">등록된 기사가 없습니다.</td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-700/50 transition-colors">
                    <td className="p-4 text-gray-500">#{article.id}</td>
                    <td className="p-4 font-medium">{article.title_ko}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                        {article.category}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400 text-sm">
                      {new Date(article.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link
                        href={`/admin/${article.id}`}
                        className="px-3 py-1 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded text-sm transition-colors"
                      >
                        수정
                      </Link>
                      <button
                        onClick={() => deleteArticle(article.id)}
                        className="px-3 py-1 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded text-sm transition-colors"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
