import { createClient } from '@supabase/supabase-js';
import { Article } from '@/types';

// Initialize Supabase Client
// Note: In a real production app, use environment variables. 
// For this refactor, we are using the client creation as was likely present in '@/lib/supabase' 
// but we'll import it from there if it exists, or recreate it.
// Let's assume '@/lib/supabase' exists and exports 'supabase'.
import { supabase } from '@/lib/supabase';

export async function fetchArticles(): Promise<Article[]> {
    const { data, error } = await supabase
        .from('articles_multilang')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching articles:', error);
        return [];
    }

    return data as Article[];
}
