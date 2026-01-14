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
      {/* 인터뷰 헤더 */}
      <div className="text-center mb-16">
        {/* 카테고리 */}
        <span className="inline-block px-4 py-2 bg-purple-900/50 text-purple-200 rounded-full text-sm font-semibold mb-6">
          🎤 {post.category} Interview
        </span>

        {/* 제목 */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {post.title_ko}
        </h1>

        {/* 날짜 */}
        <time className="text-gray-400">
          {new Date(post.created_at).toLocaleDateString('ko-KR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </time>

        {/* 인터뷰 프로필 플레이스홀더 */}
        <div className="mt-12 flex justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-5xl shadow-2xl">
            👤
          </div>
        </div>
      </div>

      {/* 번역된 제목들 */}
      <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 p-6 rounded-xl border border-purple-500/30">
          <h3 className="text-xs font-bold text-purple-300 uppercase mb-2">English</h3>
          <h2 className="text-xl font-semibold text-white">{post.title_en}</h2>
        </div>
        <div className="bg-gradient-to-br from-pink-900/30 to-pink-800/30 p-6 rounded-xl border border-pink-500/30">
          <h3 className="text-xs font-bold text-pink-300 uppercase mb-2">日本語</h3>
          <h2 className="text-xl font-semibold text-white">{post.title_ja}</h2>
        </div>
      </div>

      {/* 인터뷰 본문 - Q&A 스타일 */}
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

      {/* 하단 구분선 */}
      <div className="mt-16 pt-8 border-t border-gray-800 text-center">
        <p className="text-gray-500 text-sm">End of Interview</p>
      </div>
    </article>
  );
}
