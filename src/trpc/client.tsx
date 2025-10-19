"use client";
// ^-- to make sure we can mount the Provider from a server component
import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCContext } from '@trpc/tanstack-react-query';
import { useState } from 'react';
import { makeQueryClient } from './query-client';
import type { AppRouter } from './routers/_app';
export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();
let browserQueryClient: QueryClient;
/**
 * Provide a React Query client appropriate to the runtime environment.
 *
 * On the server this returns a new client instance; in the browser it returns a persistent singleton.
 *
 * @returns A QueryClient instance — a new client when running on the server, or the cached browser singleton when running in the browser.
 */
function getQueryClient() {
    if (typeof window === 'undefined') {
        // Server: always make a new query client
        return makeQueryClient();
    }
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
}
/**
 * Compute the full TRPC API URL appropriate for the current runtime environment.
 *
 * @returns The TRPC endpoint URL formed by appending `/api/trpc` to the environment base; on the browser this yields `/api/trpc`, on the server the base is taken from `NEXT_PUBLIC_APP_URL`.
 */
function getUrl() {
    const base = (() => {
        if (typeof window !== 'undefined') return '';
        return process.env.NEXT_PUBLIC_APP_URL;
    })();
    return `${base}/api/trpc`;
}
/**
 * Provides TRPC and React Query contexts to its descendant React elements.
 *
 * @param props - Component props containing React children to render inside the providers
 * @returns A JSX element that wraps `props.children` with a React Query `QueryClientProvider` and a TRPC `TRPCProvider`
 */
export function TRPCReactProvider(
    props: Readonly<{
        children: React.ReactNode;
    }>,
) {
    // NOTE: Avoid useState when initializing the query client if you don't
    //       have a suspense boundary between this and the code that may
    //       suspend because React will throw away the client on the initial
    //       render if it suspends and there is no boundary
    const queryClient = getQueryClient();
    const [trpcClient] = useState(() =>
        createTRPCClient<AppRouter>({
            links: [
                httpBatchLink({
                    // transformer: superjson, <-- if you use a data transformer
                    url: getUrl(),
                }),
            ],
        }),
    );
    return (
        <QueryClientProvider client={queryClient}>
            <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
                {props.children}
            </TRPCProvider>
        </QueryClientProvider>
    );
}