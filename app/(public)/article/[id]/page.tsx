'use client';

import { use, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Article, Language } from '@/types/article';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [language, setLanguage] = useState<Language>('ko');

  useEffect(() => {
    async function fetchArticle() {
      const { data } = await supabase
        .from('articles_multilang')
        .select('*')
        .eq('id', id)
        .single();

      if (data) setArticle(data);
    }

    fetchArticle();
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  const getTitle = () => {
    return language === 'ko' ? article.title_ko : language === 'en' ? article.title_en : article.title_ja;
  };

  const getContent = () => {
    return language === 'ko' ? article.content_ko : language === 'en' ? article.content_en : article.content_ja;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <div className="flex items-center gap-2 mb-4">
          {['ko', 'en', 'ja'].map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang as Language)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                language === lang
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <span className="px-4 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-400 text-sm">
            {article.category}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
          {getTitle()}
        </h1>

        <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
          {getContent()}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-gray-500">
          Published: {new Date(article.created_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}