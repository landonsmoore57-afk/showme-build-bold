import { useEffect, useState } from "react";

interface JobberEmbedProps {
  className?: string;
}

export const JobberEmbed = ({ className = "" }: JobberEmbedProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`w-full h-full ${className}`}>
      {isLoading && (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
      <iframe
        src="https://clienthub.getjobber.com/client_hubs/7a59e132-4f3f-462c-9f9d-0c8db518d170/public/work_request/new?request_form_id=2032964"
        className={`w-full h-full border-0 transition-opacity ${isLoading ? 'opacity-0 absolute' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        title="Schedule Service Form"
        allow="geolocation; microphone; camera"
        sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
};
