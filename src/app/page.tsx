"use client";

import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
export default function Home() {
  const [markdown, setMarkdown] = useState("");
  const renderedRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    if (renderedRef.current) {
      navigator.clipboard.writeText(renderedRef.current.innerText);
      alert("Copied to clipboard!");
    }
  };

  const handleExport = async () => {
    if (renderedRef.current) {
      const html2pdf = (await import("html2pdf.js")).default;
      html2pdf().from(renderedRef.current).save("markdown-export.pdf");
    }
  };

  return (
    <div className="flex h-screen">
      <textarea
        className="w-1/2 p-4 border-r resize-none"
        placeholder="Write markdown here..."
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />
      <div className="w-1/2 p-4">
        <div className="flex justify-end space-x-2 mb-2">
          <button
            onClick={handleCopy}
            className="bg-blue-500 px-3 py-1 text-white rounded"
          >
            Copy
          </button>
          <button
            onClick={handleExport}
            className="bg-green-500 px-3 py-1 text-white rounded"
          >
            Export
          </button>
        </div>
        <div
          ref={renderedRef}
          className="prose max-w-none border p-3 rounded overflow-auto h-[90%]"
        >
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
