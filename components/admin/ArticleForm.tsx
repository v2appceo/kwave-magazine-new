'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import RichEditor from '@/components/admin/RichEditor';
import { stripHtml } from '@/lib/utils';

interface ArticleFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function ArticleForm({ initialData, isEdit = false }: ArticleFormProps) {
    const router = useRouter();
    const [title, setTitle] = useState(initialData?.title_ko || '');
    const [content, setContent] = useState(initialData?.content_ko || '');
    const [category, setCategory] = useState(initialData?.category || 'K-POP');
    const [template, setTemplate] = useState(initialData?.template || 'standard');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title_ko);
            setContent(initialData.content_ko);
            setCategory(initialData.category);
            setTemplate(initialData.template);
        }
    }, [initialData]);

    const translateText = async (text: string, targetLang: string) => {
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!apiKey) throw new Error("API Key is missing");

        console.log(`🤖 Translating to ${targetLang}...`);

        const endpoints = [
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
        ];

        const prompt = `Translate the following text to ${targetLang === 'en' ? 'English' : 'Japanese'}. Only return the translated text, no explanations.

Text: ${text}`;

        for (const url of endpoints) {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }]
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
                } else {
                    console.warn(`⚠️ Endpoint failed: ${url}`, await response.json());
                }
            } catch (error) {
                console.error(`❌ Network error with ${url}`, error);
            }
        }
        return "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const plainText = stripHtml(content);

            console.log("📝 Plain text:", plainText.substring(0, 50) + "...");

            if (!plainText) {
                alert("내용을 입력해주세요.");
                setIsSubmitting(false);
                return;
            }

            // Only re-translate if new or explicitly requested?
            // For simplicity, we re-translate on every save for now to ensure consistency.
            const [titleEn, titleJa, contentEn, contentJa] = await Promise.all([
                translateText(title, 'en'),
                translateText(title, 'ja'),
                translateText(plainText, 'en'),
                translateText(plainText, 'ja')
            ]);

            const articleData = {
                title_ko: title,
                title_en: titleEn || title,
                title_ja: titleJa || title,
                content_ko: content,
                content_en: contentEn || plainText,
                content_ja: contentJa || plainText,
                category,
                template,
                published: true
            };

            if (isEdit && initialData?.id) {
                const { error } = await supabase
                    .from('articles_multilang')
                    .update(articleData)
                    .eq('id', initialData.id);
                if (error) throw error;
                alert('✅ 기사가 수정되었습니다!');
            } else {
                const { error } = await supabase.from('articles_multilang').insert([articleData]);
                if (error) throw error;
                alert('✅ 기사가 등록되었습니다!');
            }

            router.push('/admin');

        } catch (error) {
            console.error('Error:', error);
            alert('❌ 오류가 발생했습니다. 콘솔을 확인하세요.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-2">제목 (한국어)</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                    placeholder="기사 제목을 입력하세요"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">카테고리</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                >
                    <option value="K-POP">K-POP</option>
                    <option value="K-DRAMA">K-DRAMA</option>
                    <option value="K-BEAUTY">K-BEAUTY</option>
                    <option value="K-FOOD">K-FOOD</option>
                    <option value="K-CULTURE">K-CULTURE</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">
                    📐 레이아웃 템플릿 선택
                </label>
                <select
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                >
                    <option value="standard">📄 Standard - 일반 기사</option>
                    <option value="cover-story">🎬 Cover Story - 대형 히어로 이미지</option>
                    <option value="interview">🎤 Interview - 인터뷰 Q&A 스타일</option>
                    <option value="photo-essay">📸 Photo Essay - 사진 중심 레이아웃</option>
                </select>

                <div className="mt-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    {template === 'standard' && (
                        <p className="text-sm text-gray-400">
                            📄 <strong>Standard</strong>: 일반적인 매거진 스타일. 제목 → 본문 → 이미지 순서로 표시됩니다.
                        </p>
                    )}
                    {template === 'cover-story' && (
                        <p className="text-sm text-gray-400">
                            🎬 <strong>Cover Story</strong>: 전체 화면 히어로 이미지가 상단에 표시되고, 제목이 이미지 위에 오버레이됩니다. 2단 레이아웃으로 본문이 표시됩니다.
                        </p>
                    )}
                    {template === 'interview' && (
                        <p className="text-sm text-gray-400">
                            🎤 <strong>Interview</strong>: Q&A 스타일. 질문과 답변이 구분되어 표시되며, 인터뷰 대상의 프로필이 강조됩니다.
                        </p>
                    )}
                    {template === 'photo-essay' && (
                        <p className="text-sm text-gray-400">
                            📸 <strong>Photo Essay</strong>: 사진 중심. 큰 이미지들이 캡션과 함께 표시되는 비주얼 중심 레이아웃입니다.
                        </p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">내용 (한국어)</label>
                <RichEditor content={content} onChange={setContent} />
                <p className="text-sm text-gray-400 mt-2">
                    💡 리치 에디터로 이미지, 동영상, 링크를 추가할 수 있습니다!
                </p>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'AI가 번역 및 저장 중...' : (isEdit ? '기사 수정' : '기사 등록')}
            </button>
        </form>
    );
}
