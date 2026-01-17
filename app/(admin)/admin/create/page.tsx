'use client';

import ArticleForm from '@/components/admin/ArticleForm';

export default function CreateArticlePage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">새 기사 작성</h1>
                <ArticleForm />
            </div>
        </div>
    );
}
