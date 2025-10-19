import {
    defaultShouldDehydrateQuery,
    QueryClient,
} from '@tanstack/react-query';
/**
 * Creates a QueryClient with application-default configuration for caching and de/rehydration.
 *
 * @returns A configured QueryClient instance whose queries have a 30-second staleTime and whose dehydrate policy includes pending queries in addition to the default dehydrate behavior.
 */
export function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 30 * 1000,
            },
            dehydrate: {
                // serializeData: superjson.serialize,
                shouldDehydrateQuery: (query) =>
                    defaultShouldDehydrateQuery(query) ||
                    query.state.status === 'pending',
            },
            hydrate: {
                // deserializeData: superjson.deserialize,
            },
        },
    });
}