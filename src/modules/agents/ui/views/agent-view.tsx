"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";

export const AgentView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

    return (
        <div>
            {JSON.stringify(data, null, 2)}
        </div>
    );
};


export const AgentViewLoading = () => {
    return <LoadingState
        title="Loading agents"
        description="Please wait while we load the agents for you."
    />;
}

export const AgentViewError = () => {
    return <ErrorState
        title="Failed to load agents"
        description="There was an error while loading the agents. Please try again later."
    />;
}
