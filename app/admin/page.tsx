'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('K-POP');
  const [isTranslating, setIsTranslating] = useState(false);
  const [message, setMessage] = useState('');

  const translateText = async (text: string, targetLang: string) => {
    const targetLanguage = targetLang === 'en' ? 'English' : 'Japanese';

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('NEXT_PUBLIC_GEMINI_API_KEY가 설정되어 있지 않습니다. (.env.local 확인)');
    }

    // ✅ 최신 무료 버전 우선 + 폴백
    const endpoints = [
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
    ];

    const payload = {
      contents: [
        {
          parts: [
            {
              text: `Translate the following Korean text to ${targetLanguage}. Only provide the translation, no explanations:\n\n${text}`,
            },
          ],
        },
      ],
    };

    let lastErrorText = '';

    for (const url of endpoints) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errText = await response.text().catch(() => '');
          lastErrorText = `Gemini API 오류: ${response.status} ${response.statusText}\n${errText}`;
          continue;
        }

        const data = await response.json();
        const translated = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!translated) {
          lastErrorText = `Gemini 응답 파싱 실패: ${JSON.stringify(data)}`;
          continue;
        }

        return translated;
      } catch (err: any) {
        lastErrorText = err?.message || '네트워크 오류';
        continue;
      }
    }

    throw new Error(lastErrorText || 'Gemini 호출 실패(원인 불명)');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTranslating(true);
    setMessage('번역 중...');

    try {
      if (!title.trim() || !content.trim()) {
        throw new Error('제목/내용을 입력해주세요.');
      }

      const titleEn = await translateText(title, 'en');
      const titleJa = await translateText(title, 'ja');
      const contentEn = await translateText(content, 'en');
      const contentJa = await translateText(content, 'ja');

      setMessage('데이터베이스에 저장 중...');

      const { error } = await supabase.from('articles_multilang').insert([
        {
          title_ko: title,
          title_en: titleEn,
          title_ja: titleJa,
          content_ko: content,
          content_en: contentEn,
          content_ja: contentJa,
          category,
          published: true,
        },
      ]);

      if (error) throw error;

      setMessage('✅ 기사가 성공적으로 등록되었습니다!');
      setTitle('');
      setContent('');
      setCategory('K-POP');

      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      console.error('Error:', error);
      setMessage(`❌ 오류가 발생했습니다.\n${error?.message ?? ''}`.trim());
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8"
        >
          <ArrowLeft size={20} />
          홈으로 돌아가기
        </Link>

        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          관리자 페이지
        </h1>
        <p className="text-gray-400 mb-8">
          새 기사를 작성하면 자동으로 영어와 일본어로 번역됩니다.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">제목 (한국어)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-900 border border-purple-500/30 rounded-lg focus:border-purple-500 focus:outline-none"
              placeholder="기사 제목을 입력하세요"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">내용 (한국어)</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={8}
              className="w-full px-4 py-3 bg-gray-900 border border-purple-500/30 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
              placeholder="기사 내용을 입력하세요"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">카테고리</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-purple-500/30 rounded-lg focus:border-purple-500 focus:outline-none"
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
            className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isTranslating ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                번역 및 저장 중...
              </>
            ) : (
              '기사 등록'
            )}
          </button>
        </form>

        {message && (
          <div
            className={`mt-6 p-4 rounded-lg whitespace-pre-line ${
              message.includes('✅')
                ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                : message.includes('❌')
                ? 'bg-red-500/20 border border-red-500/50 text-red-400'
                : 'bg-purple-500/20 border border-purple-500/50 text-purple-400'
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}