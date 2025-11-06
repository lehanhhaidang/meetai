import { Divide, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMeetingsFilters } from "@/modules/meetings/hooks/use-meetings-filters";

export const MeetingsSearchFilters = () => {
    const [filters, setFilters] = useMeetingsFilters();

    return (
        <div className="relative">
            <Input
                className="h-9 bg-white w-[200px] pl-7"
                placeholder="Filter by name"
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}>
            </Input>
            <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>
    )
}