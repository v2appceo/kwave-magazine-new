export interface Article {
  id: string;
  created_at: string;
  published: boolean;
  category: string;
  title_ko?: string;
  title_en?: string;
  title_ja?: string;
  content_ko?: string;
  content_en?: string;
  content_ja?: string;
  [key: string]: any; // Allow for other fields from Supabase
}

export type Language = 'ko' | 'en' | 'ja';

export interface NavTranslations {
  home: string;
  magazine: string;
  exclusive: string;
  community: string;
  shop: string;
}

export interface HeroTranslations {
  badge: string;
  title: string;
  desc: string;
  cta: string;
  preview: string;
}

export interface Translation {
  title: string;
  subtitle: string;
  nav: NavTranslations;
  hero: HeroTranslations;
}

export interface Translations {
  ko: Translation;
  en: Translation;
  ja: Translation;
}
