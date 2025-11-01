import { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommandEmpty, CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from "./ui/command";

interface Props {
    options: Array<{
        id: string;
        value: string;
        children?: ReactNode;
    }>

    onSelect: (value: string) => void;
    onSearch: (value: string) => void;

    value: string;
    placeholder?: string;
    isSearchable?: boolean;
    className?: string;
}

export const CommandSelect = ({
    options,
    onSelect,
    onSearch,
    value,
    placeholder = "Select an option...",
    className,
}: Props) => {
    const [open, setOpen] = useState(false);
    const selectedOption = options.find((option) => option.value === value);

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                variant="outline"
                className={cn(" h-9 justify-between font-normal px-2", !selectedOption && "text-muted-foreground", className)}
            >
                <div>
                    {selectedOption?.children ?? placeholder}
                </div>
                <ChevronDownIcon />
            </Button >
            <CommandResponsiveDialog
                shouldFilter={!onSearch}
                open={open}
                onOpenChange={setOpen}>
                <CommandInput
                    placeholder="Search..."
                    onValueChange={onSearch}
                />
                <CommandList>
                    <CommandEmpty>
                        <span className="text-muted-foreground text-sm">
                            No options found.
                        </span>
                    </CommandEmpty>
                    {options.map((options) => (
                        <CommandItem
                            key={options.id}
                            onSelect={() => {
                                onSelect(options.value);
                                setOpen(false);
                            }}
                        >
                            {options.children}
                        </CommandItem>
                    ))}
                </CommandList>
            </CommandResponsiveDialog>

        </>
    )
}