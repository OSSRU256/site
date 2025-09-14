import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

const SearchBar = ({ searchQuery, onSearchChange }: SearchBarProps) => {
    return (
        <div className="relative max-w-2xl mx-auto">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    type="text"
                    placeholder="Поиск по технологиям, языкам, тегам..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 h-12 text-base bg-card border-border focus:ring-2 focus:ring-accent/50 transition-all"
                />
            </div>
            <div className="text-xs text-muted-foreground mt-2 text-center">
                Поиск работает только по тегам, языкам и технологиям
            </div>
        </div>
    );
};

export default SearchBar;