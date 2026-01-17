import Link from 'next/link';

interface TemplateProps {
  post: {
    title_ko: string;
    title_en: string;
    title_ja: string;
    content_ko: string;
    category: string;
    created_at: string;
  };
}

export default function InterviewTemplate({ post }: TemplateProps) {
  return (
    <article className="max-w-5xl mx-auto px-4 py-12 text-white">
      {/* 상단 네비게이션 */}
      <div className="mb-8">
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

      {/* 인터뷰 헤더 */}
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-2 bg-purple-900/50 text-purple-200 rounded-full text-sm font-semibold mb-6">
          🎤 {post.category} Interview
        </span>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {post.title_ko}
        </h1>

        <time className="text-gray-400">
          {new Date(post.created_at).toLocaleDateString('ko-KR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </time>

        <div className="mt-12 flex justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-5xl shadow-2xl">
            👤
          </div>
        </div>
      </div>

      <div 
        className="prose prose-invert prose-lg max-w-none
                   [&>p]:text-lg [&>p]:leading-relaxed
                   [&>p>strong]:block [&>p>strong]:text-2xl [&>p>strong]:font-bold 
                   [&>p>strong]:text-purple-400 [&>p>strong]:mb-4 [&>p>strong]:mt-8
                   [&>p>strong]:before:content-['Q:'] [&>p>strong]:before:mr-2
                   [&>blockquote]:bg-gradient-to-r [&>blockquote]:from-purple-900/20 [&>blockquote]:to-transparent
                   [&>blockquote]:border-l-4 [&>blockquote]:border-purple-500
                   [&>blockquote]:p-6 [&>blockquote]:my-8 [&>blockquote]:rounded-r-xl
                   [&>blockquote]:text-xl [&>blockquote]:italic [&>blockquote]:font-light
                   [&>img]:rounded-xl [&>img]:shadow-2xl [&>img]:my-12"
        dangerouslySetInnerHTML={{ __html: post.content_ko }}
      />

      <div className="mt-16 pt-8 border-t border-gray-800 text-center">
        <p className="text-gray-500 text-sm">End of Interview</p>
      </div>
    </article>
  );
}
