import { ArrowUpDown, ArrowUp, ArrowDown, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";

export type SortOrder = "desc" | "asc" | "random";

interface SortButtonProps {
    sortOrder: SortOrder;
    onSortChange: (order: SortOrder) => void;
}

const SortButton = ({ sortOrder, onSortChange }: SortButtonProps) => {
    const handleSort = () => {
        const nextOrder: SortOrder =
            sortOrder === "desc" ? "asc" :
                sortOrder === "asc" ? "random" : "desc";
        onSortChange(nextOrder);
    };

    const getIcon = () => {
        switch (sortOrder) {
            case "desc": return <ArrowDown className="h-4 w-4" />;
            case "asc": return <ArrowUp className="h-4 w-4" />;
            case "random": return <Shuffle className="h-4 w-4" />;
        }
    };

    const getLabel = () => {
        switch (sortOrder) {
            case "desc": return "По убыванию звезд";
            case "asc": return "По возрастанию звезд";
            case "random": return "Случайный порядок";
        }
    };

    return (
        <Button
            variant="outline"
            onClick={handleSort}
            className="flex items-center gap-2 h-12 px-4 bg-card hover:bg-card-hover border-border transition-colors"
        >
            {getIcon()}
            <span className="hidden sm:inline text-sm">{getLabel()}</span>
        </Button>
    );
};

export default SortButton;