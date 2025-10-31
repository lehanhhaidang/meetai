import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { MeetingsView } from "@/modules/meetings/server/ui/views/meetings-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = () => {
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.meetings.getMany.queryOptions({})
    )
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<MeetingsViewLoading />}>
                <ErrorBoundary
                    fallback={<MeetingsViewError />}
                >

                </ErrorBoundary>
                <MeetingsView />
            </Suspense>
        </HydrationBoundary>
    );
}

export default Page;

export const MeetingsViewLoading = () => {
    return <LoadingState
        title="Loading agents"
        description="Please wait while we load the agents for you."
    />;
}

export const MeetingsViewError = () => {
    return <ErrorState
        title="Failed to load agents"
        description="There was an error while loading the agents. Please try again later."
    />;
}