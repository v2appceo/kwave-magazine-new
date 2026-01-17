import Link from 'next/link';

interface TemplateProps {
  post: {
    title_ko: string;
    content_ko: string;
    category: string;
    created_at: string;
  };
}

export default function PhotoEssayTemplate({ post }: TemplateProps) {
  return (
    <article className="max-w-6xl mx-auto px-4 pt-32 pb-12 text-white">
      {/* Top Navigation */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-purple-400 transition-colors text-sm font-medium"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          목록으로 돌아가기
        </Link>
      </div>

      <header className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="px-4 py-1.5 bg-purple-500/10 text-purple-400 rounded-full text-xs font-bold uppercase tracking-wider border border-purple-500/20">
            📸 {post.category} Photo Essay
          </span>
          <span className="text-gray-500 text-sm font-medium">
            {post.created_at.split('T')[0]}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {post.title_ko}
        </h1>
      </header>

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

      {/* Bottom Navigation */}
      <div className="mt-16 pt-8 border-t border-gray-800">
        <Link
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-purple-400 transition-colors text-sm font-medium"
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
