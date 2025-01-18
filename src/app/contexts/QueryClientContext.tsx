"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';

const queryClient = new QueryClient();

interface QueryClientProviderWrapperProps  {
    children: React.ReactNode
};

const QueryClientProviderWrapper = ({ children }: QueryClientProviderWrapperProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default QueryClientProviderWrapper;
