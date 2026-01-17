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

export default function CoverStoryTemplate({ post }: TemplateProps) {
  return (
    <article className="text-white">
      {/* 상단 네비게이션 (히어로 위에 고정) */}
      <div className="fixed top-8 left-8 z-50">
        <Link 
          href="/"
          className="inline-flex items-center text-white/80 hover:text-white transition-colors bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          목록으로
        </Link>
      </div>

      {/* 🎬 전체 화면 히어로 섹션 */}
      <div className="relative h-screen w-full bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.3),transparent_50%)]"></div>
        </div>

        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
          <span className="px-4 py-2 bg-purple-600/80 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-6 shadow-lg">
            {post.category}
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight max-w-5xl bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent animate-fade-in">
            {post.title_ko}
          </h1>

          <div className="flex items-center gap-4 text-gray-300 text-sm">
            <time>{new Date(post.created_at).toLocaleDateString('ko-KR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</time>
            <span>•</span>
            <span>K-Wave Magazine</span>
          </div>

          <div className="absolute bottom-10 animate-bounce">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div 
          className="prose prose-invert prose-lg md:prose-xl max-w-none 
                     md:columns-2 md:gap-12
                     [&>*:first-child]:mt-0
                     [&>p:first-of-type]:text-xl [&>p:first-of-type]:font-medium
                     [&>p:first-of-type]:text-gray-300
                     [&>h2]:col-span-all [&>h2]:text-4xl [&>h2]:font-bold [&>h2]:mb-6
                     [&>blockquote]:col-span-all [&>blockquote]:text-2xl 
                     [&>blockquote]:border-l-4 [&>blockquote]:border-purple-500 
                     [&>blockquote]:pl-6 [&>blockquote]:italic
                     [&>img]:col-span-all [&>img]:w-full [&>img]:rounded-xl"
          dangerouslySetInnerHTML={{ __html: post.content_ko }}
        />
      </div>
    </article>
  );
}
