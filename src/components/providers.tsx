"use client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps): React.ReactElement {
  const [queryClient] = React.useState(() => new QueryClient())// Mengambil nilai pertama dari useState

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
