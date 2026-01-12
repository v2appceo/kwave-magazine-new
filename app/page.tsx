'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Play, ChevronRight, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [language, setLanguage] = useState('ko');
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    async function fetchArticles() {
      const { data } = await supabase
        .from('articles_multilang')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (data) setArticles(data);
    }
    
    fetchArticles();
  }, []);

  const translations: any = {
    ko: {
      title: "K-WAVE 매거진",
      subtitle: "글로벌 K-Pop 및 인플루언서 라이프스타일",
      nav: {
        home: "홈",
        magazine: "매거진",
        exclusive: "독점 콘텐츠",
        community: "커뮤니티",
        shop: "스토어"
      },
      hero: {
        badge: "최신호 발행",
        title: "K-컬처 아이콘을 만나보세요",
        desc: "당신이 사랑하는 K-Pop 아이돌과 글로벌 인플루언서의 독점 인터뷰, 비하인드 콘텐츠, 라이프스타일 큐레이션",
        cta: "지금 구독하기",
        preview: "미리보기"
      }
    },
    en: {
      title: "K-WAVE MAGAZINE",
      subtitle: "Global K-Pop & Influencer Lifestyle",
      nav: {
        home: "Home",
        magazine: "Magazine",
        exclusive: "Exclusive",
        community: "Community",
        shop: "Shop"
      },
      hero: {
        badge: "NEW ISSUE OUT NOW",
        title: "Meet the Icons of K-Culture",
        desc: "Exclusive interviews, behind-the-scenes content, and lifestyle curation with your favorite K-Pop idols",
        cta: "Subscribe Now",
        preview: "Preview Issue"
      }
    },
    ja: {
      title: "K-WAVEマガジン",
      subtitle: "グローバルK-Popとインフルエンサーライフスタイル",
      nav: {
        home: "ホーム",
        magazine: "マガジン",
        exclusive: "限定コンテンツ",
        community: "コミュニティ",
        shop: "ショップ"
      },
      hero: {
        badge: "最新号発売中",
        title: "K-カルチャーのアイコンに会おう",
        desc: "お気に入りのK-Popアイドルとグローバルインフルエンサーの独占インタビュー",
        cta: "今すぐ購読",
        preview: "プレビュー"
      }
    }
  };

  const t = translations[language];

  // 언어별로 제목/내용 가져오기
  const getTitle = (article: any) => {
    return language === 'ko' ? article.title_ko : language === 'en' ? article.title_en : article.title_ja;
  };

  const getContent = (article: any) => {
    const content = language === 'ko' ? article.content_ko : language === 'en' ? article.content_en : article.content_ja;
    return content ? content.substring(0, 100) : '';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 w-full bg-black/95 backdrop-blur-md border-b border-purple-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-xl">
                K
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {t.title}
                </h1>
                <p className="text-xs text-gray-400">{t.subtitle}</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {Object.entries(t.nav).map(([key, value]: any) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === key ? 'text-purple-400' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {value}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-purple-500/10 rounded-full p-1">
                {['ko', 'en', 'ja'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      language === lang
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>

              <button className="relative hover:text-purple-400 transition-colors">
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-pink-500 rounded-full text-xs flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              <button className="hover:text-purple-400 transition-colors">
                <User size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="px-4 py-1 bg-pink-500/20 border border-pink-500/50 rounded-full text-pink-400 text-sm font-medium flex items-center gap-2">
              <Sparkles size={14} />
              {t.hero.badge}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
            {t.hero.title}
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            {t.hero.desc}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2">
              {t.hero.cta}
              <ChevronRight size={20} />
            </button>
            <button className="px-8 py-4 border border-purple-500/50 rounded-full font-semibold hover:bg-purple-500/10 transition-all flex items-center gap-2">
              <Play size={20} />
              {t.hero.preview}
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.length > 0 ? (
              articles.slice(0, 3).map((article) => (
                <div 
                  key={article.id}
                  className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-6 hover:border-purple-500 transition-all cursor-pointer"
                >
                  <div className="text-purple-400 text-sm mb-3">{article.category}</div>
                  <h3 className="text-2xl font-bold mb-3">{getTitle(article)}</h3>
                  <p className="text-gray-400 mb-4">{getContent(article)}...</p>
                  <button className="text-pink-400 flex items-center gap-2">
                    Read More <ChevronRight size={16} />
                  </button>
                </div>
              ))
            ) : (
              <>
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-6 hover:border-purple-500 transition-all cursor-pointer">
                  <div className="text-purple-400 text-sm mb-3">K-POP</div>
                  <h3 className="text-2xl font-bold mb-3">2026 Trends</h3>
                  <p className="text-gray-400 mb-4">Exploring the evolution of Korean pop music</p>
                  <button className="text-pink-400 flex items-center gap-2">
                    Read More <ChevronRight size={16} />
                  </button>
                </div>

                <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 border border-pink-500/30 rounded-2xl p-6 hover:border-pink-500 transition-all cursor-pointer">
                  <div className="text-pink-400 text-sm mb-3">K-DRAMA</div>
                  <h3 className="text-2xl font-bold mb-3">Must-Watch</h3>
                  <p className="text-gray-400 mb-4">Hottest K-dramas of 2026</p>
                  <button className="text-purple-400 flex items-center gap-2">
                    Read More <ChevronRight size={16} />
                  </button>
                </div>

                <div className="bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border border-cyan-500/30 rounded-2xl p-6 hover:border-cyan-500 transition-all cursor-pointer">
                  <div className="text-cyan-400 text-sm mb-3">K-BEAUTY</div>
                  <h3 className="text-2xl font-bold mb-3">Glass Skin</h3>
                  <p className="text-gray-400 mb-4">Latest K-beauty routines revealed</p>
                  <button className="text-cyan-400 flex items-center gap-2">
                    Read More <ChevronRight size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}