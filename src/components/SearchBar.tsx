import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    allTags: string[];
}

interface Tag {
    id: string;
    name: string;
}

const SearchBar = ({ searchQuery, onSearchChange, allTags }: SearchBarProps) => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestion, setActiveSuggestion] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Update parent with current search state
        const searchString = tags.map(tag => `#${tag.name}`).join(" ") + (inputValue ? ` ${inputValue}` : "");
        onSearchChange(searchString.trim());
    }, [tags, inputValue, onSearchChange]);

    const handleInputChange = (value: string) => {
        setInputValue(value);

        if (value.trim()) {
            const filtered = allTags.filter(tag =>
                tag.toLowerCase().includes(value.toLowerCase()) &&
                !tags.some(existingTag => existingTag.name === tag)
            );
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
        setActiveSuggestion(-1);
    };

    const addTag = (tagName: string) => {
        if (!tags.some(tag => tag.name === tagName)) {
            const newTag = {
                id: Date.now().toString(),
                name: tagName
            };
            setTags([...tags, newTag]);
        }
        setInputValue("");
        setSuggestions([]);
        setShowSuggestions(false);
        setActiveSuggestion(-1);
    };

    const removeTag = (tagId: string) => {
        setTags(tags.filter(tag => tag.id !== tagId));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === " " && inputValue.trim()) {
            e.preventDefault();
            addTag(inputValue.trim());
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveSuggestion(prev =>
                prev < suggestions.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveSuggestion(prev => prev > 0 ? prev - 1 : -1);
        } else if (e.key === "Enter" && activeSuggestion >= 0) {
            e.preventDefault();
            addTag(suggestions[activeSuggestion]);
        } else if (e.key === "Escape") {
            setShowSuggestions(false);
            setActiveSuggestion(-1);
        }
    };

    return (
        <div className="relative w-full">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
                <div className="flex flex-wrap items-center gap-1 pl-10 pr-3 py-2 min-h-[40px] bg-background border border-input rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                    {tags.map(tag => (
                        <div
                            key={tag.id}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-accent text-accent-foreground rounded-md text-sm"
                        >
                            <span>#{tag.name}</span>
                            <button
                                onClick={() => removeTag(tag.id)}
                                className="hover:bg-accent-foreground/20 rounded-full p-0.5"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                    <Input
                        ref={inputRef}
                        type="text"
                        placeholder={tags.length === 0 ? "Поиск по технологиям, языкам, тегам..." : ""}
                        value={inputValue}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => inputValue && setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        className="border-0 p-0 h-auto bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 min-w-[100px]"
                    />
                </div>
            </div>

            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-md z-20 max-h-48 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                        <button
                            key={suggestion}
                            className={cn(
                                "w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground text-sm",
                                activeSuggestion === index && "bg-accent text-accent-foreground"
                            )}
                            onClick={() => addTag(suggestion)}
                        >
                            #{suggestion}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;