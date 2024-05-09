import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { Blocks, Italic, Bold } from "lucide-react"; // Import Lucid Icons
interface TiptapProps {
  onChange: (content: string) => void;
  value: string;
}
const Tiptap: React.FC<TiptapProps> = ({ onChange, value }) => {
  const [content, setContent] = useState(value);
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
      onChange(editor.getHTML());
    },
  });

  // Ensure editor is not null before using it
  if (!editor) return null;

  return (
    <div>
      <div className="toolbar">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <Bold /> {/* Lucid Icon for Bold */}
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <Italic /> {/* Lucid Icon for Italic */}
        </button>
        {/* Add more buttons for other formatting options as needed */}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
