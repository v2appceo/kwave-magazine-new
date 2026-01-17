'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface RichEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function RichEditor({ content, onChange }: RichEditorProps) {
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg shadow-xl my-8 w-full',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-purple-400 underline',
        },
      }),
      Youtube.configure({
        HTMLAttributes: {
          class: 'w-full aspect-video rounded-lg my-8',
        },
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    setIsUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `article-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('articles')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('articles')
        .getPublicUrl(filePath);

      editor.chain().focus().setImage({ src: data.publicUrl }).run();

      alert('✅ 이미지가 업로드되었습니다!');
    } catch (error) {
      console.error('이미지 업로드 실패, Base64로 전환합니다:', error);

      // Fallback: Convert to Base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result && editor) {
          editor.chain().focus().setImage({ src: result }).run();
          alert('⚠️ 서버 업로드 실패로 인해 이미지가 문서에 직접 포함되었습니다.');
        }
      };
      reader.readAsDataURL(file);

    } finally {
      setIsUploading(false);
    }
  };

  const addImageByUrl = () => {
    const url = prompt('이미지 URL을 입력하세요:');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addYouTube = () => {
    const url = prompt('YouTube URL을 입력하세요:');
    if (url && editor) {
      editor.commands.setYoutubeVideo({ src: url });
    }
  };

  const addLink = () => {
    const url = prompt('링크 URL을 입력하세요:');
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  if (!editor) return null;

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
      <div className="flex flex-wrap gap-2 p-3 bg-gray-900 border-b border-gray-700">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded ${editor.isActive('bold') ? 'bg-purple-600' : 'bg-gray-700'
            } hover:bg-purple-500 transition-colors`}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded ${editor.isActive('italic') ? 'bg-purple-600' : 'bg-gray-700'
            } hover:bg-purple-500 transition-colors`}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-purple-600' : 'bg-gray-700'
            } hover:bg-purple-500 transition-colors`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-purple-600' : 'bg-gray-700'
            } hover:bg-purple-500 transition-colors`}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1 rounded ${editor.isActive('blockquote') ? 'bg-purple-600' : 'bg-gray-700'
            } hover:bg-purple-500 transition-colors`}
        >
          "
        </button>
        <div className="w-px bg-gray-600 mx-1"></div>
        <label className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 cursor-pointer transition-colors">
          {isUploading ? '업로드 중...' : '📤 이미지 업로드'}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={isUploading}
          />
        </label>
        <button
          type="button"
          onClick={addImageByUrl}
          className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          🔗 이미지 URL
        </button>
        <button
          type="button"
          onClick={addYouTube}
          className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 transition-colors"
        >
          🎬 YouTube
        </button>
        <button
          type="button"
          onClick={addLink}
          className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 transition-colors"
        >
          🔗 링크
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="prose prose-invert prose-lg max-w-none p-4 min-h-[400px] focus:outline-none"
      />
    </div>
  );
}
