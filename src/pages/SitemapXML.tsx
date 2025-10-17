import { useEffect } from "react";
import { generateSitemapXML } from "@/data/sitemap";

export default function SitemapXML() {
  useEffect(() => {
    // Set the content type to XML
    const meta = document.querySelector('meta[http-equiv="Content-Type"]');
    if (!meta) {
      const newMeta = document.createElement('meta');
      newMeta.setAttribute('http-equiv', 'Content-Type');
      newMeta.setAttribute('content', 'application/xml; charset=utf-8');
      document.head.appendChild(newMeta);
    }
  }, []);

  const xml = generateSitemapXML();

  return (
    <pre style={{ 
      fontFamily: 'monospace', 
      fontSize: '12px',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      padding: '20px',
      backgroundColor: '#f5f5f5'
    }}>
      {xml}
    </pre>
  );
}
