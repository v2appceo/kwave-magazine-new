'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import ArticleForm from '@/components/admin/ArticleForm';
import { useParams } from 'next/navigation';

export default function EditArticlePage() {
    const params = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            if (!params?.id) return;

            const { data, error } = await supabase
                .from('articles_multilang')
                .select('*')
                .eq('id', params.id)
                .single();

            if (!error && data) {
                setArticle(data);
            }
            setLoading(false);
        };

        fetchArticle();
    }, [params.id]);

    if (loading) {
        return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">로딩 중...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">기사 수정</h1>
                {article ? (
                    <ArticleForm initialData={article} isEdit={true} />
                ) : (
                    <div>기사를 찾을 수 없습니다.</div>
                )}
            </div>
        </div>
    );
}
