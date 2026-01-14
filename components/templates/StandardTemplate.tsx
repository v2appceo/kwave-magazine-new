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

export default function StandardTemplate({ post }: TemplateProps) {
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

      {/* 본문 렌더링 */}
      <div 
        className="prose prose-invert prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content_ko }}
      />
    </article>
  );
}
