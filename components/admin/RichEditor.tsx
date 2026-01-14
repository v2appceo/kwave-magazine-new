'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link'; // 이름 충돌 방지
import Youtube from '@tiptap/extension-youtube';
import { useState, useEffect, useMemo } from 'react'; // useMemo 추가
import { supabase } from '@/lib/supabase';
import { 
  Bold, Italic, List, ListOrdered, 
  Heading2, Image as ImageIcon, Link as LinkIcon,
  Youtube as YoutubeIcon, Upload
} from 'lucide-react';

interface RichEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function RichEditor({ content, onChange }: RichEditorProps) {
  const [isUploading, setIsUploading] = useState(false);

  // ✅ extensions를 useMemo로 감싸서 중복 로딩 방지 (노란색 에러 해결 핵심)
  const extensions = useMemo(() => {
    return [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto my-4 shadow-lg',
        },
      }),
      LinkExtension.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class: 'text-purple-400 underline cursor-pointer hover:text-purple-300',
        },
      }),
      Youtube.configure({
        width: 640,
        height: 360,
        HTMLAttributes: {
          class: 'w-full aspect-video rounded-lg my-4',
        },
      }),
    ];
  }, []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: extensions, // 위에서 만든 extensions 사용
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        // 다크모드 배경색(bg-gray-900) 지정 (흰 글씨 안 보이는 문제 해결)
        class: 'prose prose-invert max-w-none min-h-[400px] p-4 bg-gray-900 text-gray-100 focus:outline-none rounded-b-lg',
      },
    },
  });

  // 초기 데이터 로딩
  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      if (editor.getText().trim() === '') {
        editor.commands.setContent(content);
      }
    }
  }, [content, editor]);

  // ✅ 이미지 업로드 핸들러 (한글 파일명 깨짐 방지 추가됨)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    setIsUploading(true);
    try {
      // 한글 파일명을 숫자로 변환 (에러 방지 핵심)
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error } = await supabase.storage
        .from('article-images')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(fileName);

      editor.chain().focus().setImage({ src: publicUrl }).run();
      
    } catch (error) {
      console.error('Upload error:', error);
      alert('이미지 업로드 실패. Supabase SQL 정책을 확인하세요.');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const addYoutubeVideo = () => {
    const url = prompt('YouTube URL을 입력하세요:');
    if (url && editor) editor.commands.setYoutubeVideo({ src: url });
  };

  const addLink = () => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = prompt('링크 URL을 입력하세요:', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  if (!editor) return null;

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden shadow-lg mb-8">
      {/* 툴바 영역 */}
      <div className="bg-gray-800 p-2 border-b border-gray-700 flex flex-wrap gap-1 items-center">
        {/* 스타일 버튼들 */}
        <div className="flex bg-gray-900/50 rounded-md p-1 gap-1">
            <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded transition-colors ${editor.isActive('bold') ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}><Bold size={18} /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded transition-colors ${editor.isActive('italic') ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}><Italic size={18} /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 rounded transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}><Heading2 size={18} /></button>
        </div>
        <div className="w-px h-6 bg-gray-600 mx-1"></div>
        {/* 리스트 버튼들 */}
        <div className="flex bg-gray-900/50 rounded-md p-1 gap-1">
            <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded transition-colors ${editor.isActive('bulletList') ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}><List size={18} /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 rounded transition-colors ${editor.isActive('orderedList') ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}><ListOrdered size={18} /></button>
        </div>
        <div className="w-px h-6 bg-gray-600 mx-1"></div>
        {/* 미디어 버튼들 */}
        <div className="flex bg-gray-900/50 rounded-md p-1 gap-1">
            <label className="p-2 rounded cursor-pointer text-gray-300 hover:bg-gray-700 transition-colors">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            {isUploading ? <Upload size={18} className="animate-spin text-purple-400" /> : <ImageIcon size={18} />}
            </label>
            <button type="button" onClick={addLink} className={`p-2 rounded transition-colors ${editor.isActive('link') ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}><LinkIcon size={18} /></button>
            <button type="button" onClick={addYoutubeVideo} className="p-2 rounded text-gray-300 hover:bg-gray-700 transition-colors"><YoutubeIcon size={18} /></button>
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}