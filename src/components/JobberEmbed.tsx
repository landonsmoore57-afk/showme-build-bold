import { useEffect, useState } from "react";

interface JobberEmbedProps {
  className?: string;
}

export const JobberEmbed = ({ className = "" }: JobberEmbedProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [scriptKey, setScriptKey] = useState(0);

  useEffect(() => {
    // Load Jobber CSS
    if (!document.querySelector('link[href*="work_request_embed.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css';
      link.media = 'screen';
      document.head.appendChild(link);
    }

    // Remove any existing Jobber script to force reload
    const existingScript = document.querySelector('script[clienthub_id="7a59e132-4f3f-462c-9f9d-0c8db518d170-2032964"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Clear the container
    const container = document.getElementById('7a59e132-4f3f-462c-9f9d-0c8db518d170-2032964');
    if (container) {
      container.innerHTML = '';
    }

    // Add a fresh script element
    const script = document.createElement('script');
    script.src = 'https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js';
    script.setAttribute('clienthub_id', '7a59e132-4f3f-462c-9f9d-0c8db518d170-2032964');
    script.setAttribute('form_url', 'https://clienthub.getjobber.com/client_hubs/7a59e132-4f3f-462c-9f9d-0c8db518d170/public/work_request/embedded_work_request_form?form_id=2032964');
    
    script.onload = () => {
      console.log('Jobber script reloaded');
      setTimeout(() => setIsLoading(false), 1000);
    };

    script.onerror = () => {
      console.error('Failed to load Jobber script');
      setIsLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      script.remove();
    };
  }, [scriptKey]);

  return (
    <div className={`w-full ${className}`}>
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
      <div 
        id="7a59e132-4f3f-462c-9f9d-0c8db518d170-2032964"
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0 h-0' : 'opacity-100'}`}
      />
    </div>
  );
};
