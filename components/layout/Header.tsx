'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShoppingCart, User } from 'lucide-react';
import { translations } from '@/lib/translations';
import { Language } from '@/types';
import { Button } from '@/components/ui/button';

export function Header() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const langParam = searchParams.get('lang');

    // Determine language, defaulting to 'ko'
    const currentLang: Language =
        (langParam && ['ko', 'en', 'ja'].includes(langParam))
            ? (langParam as Language)
            : 'ko';

    const t = translations[currentLang];
    const [cart] = useState<any[]>([]); // Mock cart state for now
    const [activeTab, setActiveTab] = useState('home');

    const handleLanguageChange = (lang: Language) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('lang', lang);
        router.push(`/?${params.toString()}`);
    };

    return (
        <header className="fixed top-0 w-full bg-black/95 backdrop-blur-md border-b border-purple-500/20 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-xl text-white">
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
                        {Object.entries(t.nav).map(([key, value]) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`text-sm font-medium transition-colors ${activeTab === key ? 'text-purple-400' : 'text-gray-300 hover:text-white'
                                    }`}
                            >
                                {value}
                            </button>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-purple-500/10 rounded-full p-1">
                            {(['ko', 'en', 'ja'] as Language[]).map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => handleLanguageChange(lang)}
                                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${currentLang === lang
                                        ? 'bg-purple-500 text-white'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {lang.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        <Button variant="ghost" size="icon" className="relative hover:text-purple-400 transition-colors">
                            <ShoppingCart size={20} />
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 w-5 h-5 bg-pink-500 rounded-full text-xs flex items-center justify-center text-white">
                                    {cart.length}
                                </span>
                            )}
                        </Button>

                        <Button variant="ghost" size="icon" className="hover:text-purple-400 transition-colors">
                            <User size={20} />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
