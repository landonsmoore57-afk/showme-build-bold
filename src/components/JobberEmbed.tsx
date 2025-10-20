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
          // Wait for elements to be added to DOM then hide branding
          setTimeout(hideBranding, 1000);
          setTimeout(hideBranding, 2000);
          setTimeout(hideBranding, 3000);
        };
        
        script.onerror = () => {
          console.error('Failed to load Jobber script');
        };
        
        document.body.appendChild(script);
        scriptLoadedRef.current = true;
      }
    }

    // Function to hide branding elements
    const hideBranding = () => {
      if (embedRef.current) {
        // Hide any links or text containing "jobber" or "powered by"
        const container = embedRef.current;
        const allElements = container.querySelectorAll('*');
        
        allElements.forEach((el) => {
          const text = el.textContent?.toLowerCase() || '';
          const href = el.getAttribute('href')?.toLowerCase() || '';
          
          if (text.includes('powered by') || text.includes('jobber') || href.includes('jobber')) {
            (el as HTMLElement).style.display = 'none';
            (el as HTMLElement).style.visibility = 'hidden';
            (el as HTMLElement).style.opacity = '0';
            (el as HTMLElement).style.height = '0';
            (el as HTMLElement).style.overflow = 'hidden';
          }
        });
      }
    };

    // Set up mutation observer to catch dynamically added branding
    const observer = new MutationObserver(hideBranding);
    
    if (embedRef.current) {
      observer.observe(embedRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer.disconnect();
    };
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
