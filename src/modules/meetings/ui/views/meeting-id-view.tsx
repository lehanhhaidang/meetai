
"use client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { MeetingIdViewHeader } from "./components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/modules/agents/hooks/use-confirm";
import { useState } from "react";
import { UpdateMeetingDialog } from "./components/update-meeting-dialog";
import { UpcomingState } from "./components/upcoming-state";
import { ActiveState } from "./components/active-state";
import { CanceledState } from "./components/canceled-state";
import { ProcessingState } from "./components/processing-state";

interface Props {
    meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {

    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();

    const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

    const [RemoveConfirmation, confirmRemove] = useConfirm(
        "Are you sure?",
        "The following action will remove this meeting",
    );

    const { data } = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId })
    );

    const removeMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
                router.push("/meetings");
            },
            // onError: (error) => {
            //     toast.error(error.message);
            // }
        })
    )

    const handleRemoveMeeting = async () => {
        const ok = await confirmRemove();

        if (!ok)
            return;

        await removeMeeting.mutateAsync({ id: meetingId });
    }

    const isActive = data.status === "active";
    const isUpcoming = data.status === "upcoming";
    const isCanceled = data.status === "canceled";
    const isCompleted = data.status === "completed";
    const isProcessing = data.status === "processing";


    return (
        <>
            <RemoveConfirmation />
            <UpdateMeetingDialog
                open={updateMeetingDialogOpen}
                onOpenChange={setUpdateMeetingDialogOpen}
                initialValues={data}
            />
            <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <MeetingIdViewHeader
                    meetingId={data.id}
                    meetingName={data.name}
                    onEdit={() => setUpdateMeetingDialogOpen(true)}
                    onRemove={handleRemoveMeeting}
                />
                {isCanceled && (
                    <CanceledState />
                )}

                {isCompleted && <div> Completed</div>}

                {isProcessing && (
                    <ProcessingState />
                )}
                {isActive && (
                    <ActiveState
                        meetingId={data.id}
                    />
                )}
                {isUpcoming && (
                    <UpcomingState
                        meetingId={data.id}
                        onCancelMeeting={() => { }}
                        isCancelling={false}
                    />
                )}
            </div>
        </>
    )
}

export const MeetingsIdViewLoading = () => {
    return <LoadingState
        title="Loading meeting"
        description="Please wait while we load the meeting for you."
    />;
}

export const MeetingsIdViewError = () => {
    return <ErrorState
        title="Failed to load meeting"
        description="There was an error while loading the meeting. Please try again later."
    />;
}