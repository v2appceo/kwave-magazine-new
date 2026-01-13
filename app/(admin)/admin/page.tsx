'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('K-POP');
  const [isTranslating, setIsTranslating] = useState(false);
  const [message, setMessage] = useState('');

  const translateText = async (text: string, targetLang: string) => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    const endpoints = [
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
 ];

    const targetLanguage = targetLang === 'en' ? 'English' : 'Japanese';
    const payload = {
      contents: [{
        parts: [{
          text: `Translate the following Korean text to ${targetLanguage}. Return ONLY the translated text without any explanations or additional content:\n\n${text}`
        }]
      }]
    };

    for (const url of endpoints) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const data = await response.json();
          return data?.candidates?.[0]?.content?.parts?.[0]?.text || text;
        }
      } catch (error) {
        console.error(`Failed with endpoint: ${url}`, error);
      }
    }

    throw new Error('All translation endpoints failed');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTranslating(true);
    setMessage('');

    try {
      const titleEn = await translateText(title, 'en');
      const titleJa = await translateText(title, 'ja');
      const contentEn = await translateText(content, 'en');
      const contentJa = await translateText(content, 'ja');

      const { error } = await supabase
        .from('articles_multilang')
        .insert([{
          title_ko: title,
          title_en: titleEn,
          title_ja: titleJa,
          content_ko: content,
          content_en: contentEn,
          content_ja: contentJa,
          category: category,
          published: true
        }]);

      if (error) throw error;

      setMessage('✅ 기사가 성공적으로 등록되었습니다!');
      setTitle('');
      setContent('');
    } catch (error: any) {
      setMessage(`❌ 오류가 발생했습니다. ${error.message}`);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">관리자 페이지 - 기사 등록</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">제목 (한국어)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">내용 (한국어)</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">카테고리</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
            >
              <option value="K-POP">K-POP</option>
              <option value="K-DRAMA">K-DRAMA</option>
              <option value="K-BEAUTY">K-BEAUTY</option>
              <option value="K-FOOD">K-FOOD</option>
              <option value="K-CULTURE">K-CULTURE</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isTranslating}
            className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isTranslating ? '번역 및 등록 중...' : '기사 등록'}
          </button>

          {message && (
            <div className={`p-4 rounded-lg ${message.includes('성공') ? 'bg-green-900/30 border border-green-500' : 'bg-red-900/30 border border-red-500'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}