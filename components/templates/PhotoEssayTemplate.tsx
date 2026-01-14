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

export default function PhotoEssayTemplate({ post }: TemplateProps) {
  return (
    <article className="text-white">
      {/* 타이틀 섹션 - 미니멀 */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <span className="inline-block px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-semibold mb-6">
          📸 {post.category} Photo Essay
        </span>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {post.title_ko}
        </h1>
        
        <time className="text-gray-400 text-sm">
          {new Date(post.created_at).toLocaleDateString('ko-KR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </time>
      </div>

      {/* 번역된 제목 - 컴팩트 */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <div className="flex flex-col md:flex-row gap-4 text-center md:text-left">
          <div className="flex-1 bg-gray-900/50 p-4 rounded-lg border border-gray-800">
            <span className="text-xs text-gray-500 uppercase block mb-1">EN</span>
            <p className="text-base text-gray-300">{post.title_en}</p>
          </div>
          <div className="flex-1 bg-gray-900/50 p-4 rounded-lg border border-gray-800">
            <span className="text-xs text-gray-500 uppercase block mb-1">JA</span>
            <p className="text-base text-gray-300">{post.title_ja}</p>
          </div>
        </div>
      </div>

      {/* 본문 - 사진 중심 레이아웃 */}
      <div className="max-w-7xl mx-auto px-4">
        <div 
          className="prose prose-invert prose-lg max-w-none
                     [&>p]:text-base [&>p]:max-w-3xl [&>p]:mx-auto [&>p]:text-center
                     [&>p]:text-gray-400 [&>p]:mb-4
                     
                     [&>img]:w-full [&>img]:rounded-none [&>img]:my-16
                     [&>img]:shadow-2xl
                     [&>img:first-of-type]:h-[80vh] [&>img:first-of-type]:object-cover
                     [&>img:first-of-type]:rounded-xl
                     
                     [&>img:nth-of-type(2n)]:max-w-4xl [&>img:nth-of-type(2n)]:mx-auto
                     [&>img:nth-of-type(2n+1)]:max-w-5xl [&>img:nth-of-type(2n+1)]:mx-auto
                     
                     [&>blockquote]:max-w-2xl [&>blockquote]:mx-auto 
                     [&>blockquote]:text-center [&>blockquote]:border-0
                     [&>blockquote]:text-xl [&>blockquote]:italic 
                     [&>blockquote]:text-gray-300 [&>blockquote]:my-12
                     
                     [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-center 
                     [&>h2]:max-w-3xl [&>h2]:mx-auto [&>h2]:my-16"
          dangerouslySetInnerHTML={{ __html: post.content_ko }}
        />
      </div>

      {/* 하단 여백 */}
      <div className="h-32"></div>
    </article>
  );
}
