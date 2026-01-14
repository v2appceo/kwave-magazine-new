import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import StandardTemplate from '@/components/templates/StandardTemplate';
import CoverStoryTemplate from '@/components/templates/CoverStoryTemplate';
import InterviewTemplate from '@/components/templates/InterviewTemplate';
import PhotoEssayTemplate from '@/components/templates/PhotoEssayTemplate';

// Next.js 15: params는 Promise입니다.
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticleDetail({ params }: PageProps) {
  // 1. params await 처리
  const { id } = await params;

  // 2. 데이터 가져오기 (template 필드 포함)
  const { data: post, error } = await supabase
    .from('articles_multilang')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">기사를 찾을 수 없습니다</h1>
          <Link href="/" className="text-purple-400 hover:text-purple-300">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  // 3. 템플릿에 따라 다른 컴포넌트 렌더링
  const renderTemplate = () => {
    switch (post.template) {
      case 'cover-story':
        return <CoverStoryTemplate post={post} />;
      case 'interview':
        return <InterviewTemplate post={post} />;
      case 'photo-essay':
        return <PhotoEssayTemplate post={post} />;
      case 'standard':
      default:
        return <StandardTemplate post={post} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* 템플릿 렌더링 */}
      {renderTemplate()}

      {/* 하단 네비게이션 (모든 템플릿 공통) */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="pt-8 border-t border-gray-800">
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
      </div>
    </div>
  );
}
