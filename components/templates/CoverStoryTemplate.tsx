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
      {/* 🎬 전체 화면 히어로 섹션 */}
      <div className="relative h-screen w-full bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.3),transparent_50%)]"></div>
        </div>

        {/* 중앙 컨텐츠 */}
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
          {/* 카테고리 배지 */}
          <span className="px-4 py-2 bg-purple-600/80 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-6 shadow-lg">
            {post.category}
          </span>

          {/* 대형 제목 */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight max-w-5xl bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent animate-fade-in">
            {post.title_ko}
          </h1>

          {/* 날짜 & 저자 정보 */}
          <div className="flex items-center gap-4 text-gray-300 text-sm">
            <time>{new Date(post.created_at).toLocaleDateString('ko-KR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</time>
            <span>•</span>
            <span>K-Wave Magazine</span>
          </div>

          {/* 스크롤 인디케이터 */}
          <div className="absolute bottom-10 animate-bounce">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* 번역된 제목들 - 풀 블리드 스타일 */}
      <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/30 hover:border-purple-500/60 transition-all">
              <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-3">English</h3>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">{post.title_en}</h2>
            </div>
            <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-pink-500/30 hover:border-pink-500/60 transition-all">
              <h3 className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-3">日本語</h3>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">{post.title_ja}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* 본문 - 2단 레이아웃 */}
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
