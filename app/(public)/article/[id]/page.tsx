import { supabase } from '@/lib/supabase';
import Link from 'next/link';

// Next.js 15: params는 Promise입니다.
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticleDetail({ params }: PageProps) {
  // 1. params await 처리
  const { id } = await params;

  // 2. 데이터 가져오기 (쿼리 수정 없음)
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !post) {
    return <div className="text-center py-20 text-white">기사를 찾을 수 없습니다.</div>;
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12 text-white">
      {/* 카테고리 & 날짜 */}
      <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
        <span className="px-3 py-1 bg-purple-900/50 text-purple-200 rounded-full border border-purple-700">
          {post.category}
        </span>
        <time>{new Date(post.created_at).toLocaleDateString()}</time>
      </div>

      {/* 제목 영역 */}
      <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
        {post.title_ko}
      </h1>

      {/* 번역된 제목들 (카드 스타일) */}
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        <div className="bg-gray-800/40 p-5 rounded-xl border border-gray-700">
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">English Title</h3>
          <h2 className="text-lg font-medium text-gray-200">{post.title_en}</h2>
        </div>
        <div className="bg-gray-800/40 p-5 rounded-xl border border-gray-700">
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Japanese Title</h3>
          <h2 className="text-lg font-medium text-gray-200">{post.title_ja}</h2>
        </div>
      </div>

      {/* ⚠️ 본문 렌더링 (HTML 태그 해석) */}
      <div 
        className="prose prose-invert prose-lg max-w-none ProseMirror"
        dangerouslySetInnerHTML={{ __html: post.content_ko }}
      />
      
      {/* 스타일 설명:
         - prose-invert: 다크모드에 맞춰 글자색 반전 (흰색 계열로)
         - ProseMirror: 에디터에서 작성한 스타일(이미지 크기 등) 유지
         - dangerouslySetInnerHTML: HTML 태그를 해석해서 보여줌
      */}

      {/* 하단 네비게이션 */}
      <div className="mt-16 pt-8 border-t border-gray-800">
        <Link 
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          목록으로 돌아가기
        </Link>
      </div>
    </article>
  );
}