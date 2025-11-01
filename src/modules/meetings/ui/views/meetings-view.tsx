"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";


export const MeetingsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

    return (
        <div>

        </div>
    )
}

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