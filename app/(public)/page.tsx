import React from 'react';
import { fetchArticles } from '@/lib/api';
import { translations } from '@/lib/translations';
import { Language } from '@/types';

import { Hero } from '@/components/home/Hero';
import { FeaturedStories } from '@/components/home/FeaturedStories';

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const resolvedSearchParams = await searchParams;
  const langParam = resolvedSearchParams.lang;

  // Determine language, defaulting to 'ko'
  const lang: Language =
    (typeof langParam === 'string' && ['ko', 'en', 'ja'].includes(langParam))
      ? (langParam as Language)
      : 'ko';

  const t = translations[lang];
  const articles = await fetchArticles();

  // Header is now in layout.tsx
  return (
    <div>
      <main>
        <Hero data={t.hero} />
        <FeaturedStories articles={articles} currentLang={lang} />
      </main>
    </div>
  );
}