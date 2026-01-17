import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Article, Language } from '@/types';
import { Card } from '@/components/ui/card';
import { stripHtml } from '@/lib/utils';

interface FeaturedStoriesProps {
    articles: Article[];
    currentLang: Language;
}

export function FeaturedStories({ articles, currentLang }: FeaturedStoriesProps) {
    const getTitle = (article: Article) => {
        return currentLang === 'ko' ? article.title_ko : currentLang === 'en' ? article.title_en : article.title_ja;
    };

    const getContent = (article: Article) => {
        const content = currentLang === 'ko' ? article.content_ko : currentLang === 'en' ? article.content_en : article.content_ja;
        const plainText = stripHtml(content || '');
        return plainText ? plainText.substring(0, 100) : '';
    };

    // Fallback data if no articles are present (matching original logic)
    const renderFallback = () => (
        <>
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-6 hover:border-purple-500 transition-all cursor-pointer">
                <div className="text-purple-400 text-sm mb-3">K-POP</div>
                <h3 className="text-2xl font-bold mb-3 text-white">2026 Trends</h3>
                <p className="text-gray-400 mb-4">Exploring the evolution of Korean pop music</p>
                <button className="text-pink-400 flex items-center gap-2">
                    Read More <ChevronRight size={16} />
                </button>
            </div>

            <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 border border-pink-500/30 rounded-2xl p-6 hover:border-pink-500 transition-all cursor-pointer">
                <div className="text-pink-400 text-sm mb-3">K-DRAMA</div>
                <h3 className="text-2xl font-bold mb-3 text-white">Must-Watch</h3>
                <p className="text-gray-400 mb-4">Hottest K-dramas of 2026</p>
                <button className="text-purple-400 flex items-center gap-2">
                    Read More <ChevronRight size={16} />
                </button>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border border-cyan-500/30 rounded-2xl p-6 hover:border-cyan-500 transition-all cursor-pointer">
                <div className="text-cyan-400 text-sm mb-3">K-BEAUTY</div>
                <h3 className="text-2xl font-bold mb-3 text-white">Glass Skin</h3>
                <p className="text-gray-400 mb-4">Latest K-beauty routines revealed</p>
                <button className="text-cyan-400 flex items-center gap-2">
                    Read More <ChevronRight size={16} />
                </button>
            </div>
        </>
    );

    return (
        <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center text-white">Featured Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {articles.length > 0 ? (
                        articles.slice(0, 3).map((article) => (
                            <Link href={`/article/${article.id}`} key={article.id}>
                                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-6 hover:border-purple-500 transition-all cursor-pointer h-full">
                                    <div className="text-purple-400 text-sm mb-3">{article.category}</div>
                                    <h3 className="text-2xl font-bold mb-3 text-white">{getTitle(article)}</h3>
                                    <p className="text-gray-400 mb-4">{getContent(article)}...</p>
                                    <button className="text-pink-400 flex items-center gap-2">
                                        Read More <ChevronRight size={16} />
                                    </button>
                                </div>
                            </Link>
                        ))
                    ) : (
                        renderFallback()
                    )}
                </div>
            </div>
        </section>
    );
}
