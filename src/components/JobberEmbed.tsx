import { useEffect, useRef } from "react";

interface JobberEmbedProps {
  className?: string;
}

export const JobberEmbed = ({ className = "" }: JobberEmbedProps) => {
  const embedRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

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

    // Load Jobber script only once
    if (!scriptLoadedRef.current) {
      const existingScript = document.querySelector('script[clienthub_id="7a59e132-4f3f-462c-9f9d-0c8db518d170-2032964"]');
      
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js';
        script.setAttribute('clienthub_id', '7a59e132-4f3f-462c-9f9d-0c8db518d170-2032964');
        script.setAttribute('form_url', 'https://clienthub.getjobber.com/client_hubs/7a59e132-4f3f-462c-9f9d-0c8db518d170/public/work_request/embedded_work_request_form?form_id=2032964');
        script.async = true;
        
        script.onload = () => {
          console.log('Jobber script loaded successfully');
        };
        
        script.onerror = () => {
          console.error('Failed to load Jobber script');
        };
        
        document.body.appendChild(script);
        scriptLoadedRef.current = true;
      }
    }
  }, []);

  return (
    <div className={`jobber-embed-wrapper w-full ${className}`}>
      <style>{`
        .jobber-embed-wrapper a[href*="jobber"],
        .jobber-embed-wrapper [class*="powered"],
        .jobber-embed-wrapper [class*="branding"],
        iframe[src*="jobber"] + *:has(a[href*="jobber"]),
        div:has(> a[href*="getjobber"]) {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
        }
      `}</style>
      <div 
        id="7a59e132-4f3f-462c-9f9d-0c8db518d170-2032964" 
        ref={embedRef}
        className="min-h-[600px] w-full"
      ></div>
    </div>
  );
};
