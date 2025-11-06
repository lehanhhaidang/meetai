import { Button } from "@/components/ui/button";


interface Props {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const DataPagination = ({ page, totalPages, onPageChange }: Props) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex-1 text-sm text-muted-foreground">
                Page {page} of {totalPages || 1}
            </div>
            <div className="flex items-center justify-end gap-x-2 py-4">
                <Button
                    variant="outline"
                    onClick={() => onPageChange(Math.max(1, page - 1))}
                    disabled={page === 1}
                    size="sm"
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    onClick={() => onPageChange(Math.min(totalPages || 1, page + 1))}
                    disabled={page === totalPages || totalPages === 0}
                    size="sm"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};
