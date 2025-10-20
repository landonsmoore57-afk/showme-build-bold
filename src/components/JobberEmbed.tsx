import { useEffect } from "react";

interface JobberEmbedProps {
  className?: string;
}

export const JobberEmbed = ({ className = "" }: JobberEmbedProps) => {
  useEffect(() => {
    // Load Jobber CSS if not already loaded
    const cssLink = document.querySelector('link[href*="work_request_embed.css"]');
    if (!cssLink) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css';
      link.media = 'screen';
      document.head.appendChild(link);
    }

    // Load Jobber script if not already loaded
    const existingScript = document.querySelector('script[src*="work_request_embed_snippet.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js';
      script.setAttribute('clienthub_id', '7a59e132-4f3f-462c-9f9d-0c8db518d170-2032964');
      script.setAttribute('form_url', 'https://clienthub.getjobber.com/client_hubs/7a59e132-4f3f-462c-9f9d-0c8db518d170/public/work_request/embedded_work_request_form?form_id=2032964');
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className={`jobber-embed-wrapper ${className}`}>
      <div id="7a59e132-4f3f-462c-9f9d-0c8db518d170-2032964"></div>
    </div>
  );
};
