import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppRoutes } from './App';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';

export function render(url: string) {
  const helmetContext = {};
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <StaticRouter location={url}>
              <AppRoutes />
            </StaticRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
  
  // @ts-ignore - helmet context has this property
  const { helmet } = helmetContext;
  
  return { html, helmet };
}
