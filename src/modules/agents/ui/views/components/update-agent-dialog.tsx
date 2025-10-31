import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentsForm } from "./agents-form";
import { AgentGetOne } from "@/modules/agents/type";

interface UpdateAgentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues: AgentGetOne;
}

export const UpdateAgentDialog = (
    {
        open,
        onOpenChange,
        initialValues
    }: UpdateAgentDialogProps) => {
    return (
        <ResponsiveDialog
            title="Update Agent"
            description="Edit agent details"
            open={open}
            onOpenChange={onOpenChange}
        >
            <AgentsForm
                initialValues={initialValues}
                onSuccess={() => {
                    onOpenChange(false);
                }}
                onCancel={() => {
                    onOpenChange(false);
                }}
            />
        </ResponsiveDialog>
    )
};