"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "./components/columns";
import { DataTable } from "@/components/data-table";
import { EmptyState } from "@/components/empty-state";



export const MeetingsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable
                columns={columns}
                data={data.items}
            />
            {data.items.length === 0 && (
                <EmptyState
                    title="No meetings found"
                    description="Create a meeting to get started."
                />
            )}
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