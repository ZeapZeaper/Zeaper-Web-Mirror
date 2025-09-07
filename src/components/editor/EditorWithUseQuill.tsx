"use client";
import { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
// import BlotFormatter from "quill-blot-formatter";
import "quill/dist/quill.snow.css";

// import './styles.css';

interface EditorProps {
  value: string;
  placeholder: string;
  onChange: (html: string) => void;
  refresh?: boolean;
}

const Editor = ({ value, placeholder, onChange, refresh }: EditorProps) => {
  const [docEnv, setDocEnv] = useState(false);
  const { quill, quillRef,  } = useQuill({
    modules: { 
      // ...(docEnv ? { blotFormatter: {} } : {}),
    },
    placeholder,
  });

  // if (Quill && !quill && docEnv) {
  //   Quill.register("modules/blotFormatter", BlotFormatter);
  // }

  useEffect(() => {
    if (typeof document !== "undefined") {
        setDocEnv(true);
    }
}, []);
  useEffect(() => {
    if (quill && docEnv) {
      quill.on("text-change", () => {
        const html = quill.root.innerHTML;
        onChange(html);
        //maintain cursor position
        // quill.focus();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quill]);

  useEffect(() => {
    if (value && quill && docEnv) {
      //   quill.clipboard.dangerouslyPasteHTML(value);
      (quill.container.firstChild as HTMLElement).innerHTML = value;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quill, refresh]);

  return (
    <div
      className="editor"
      // style={{ width: 500, height: 300 }}
    >
      <div ref={quillRef} />
    </div>
  );
};

export default Editor;
