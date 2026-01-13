export interface Article {
  id: number;
  created_at: string;
  title_ko: string;
  title_en: string;
  title_ja: string;
  content_ko: string;
  content_en: string;
  content_ja: string;
  category: 'K-POP' | 'K-DRAMA' | 'K-BEAUTY' | 'K-FOOD' | 'K-CULTURE';
  published: boolean;
}

export type Language = 'ko' | 'en' | 'ja';