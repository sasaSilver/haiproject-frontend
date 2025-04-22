"use client";

import { Search as SearchIcon, Sparkles } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function Search() {
    const [isAISearch, setAISearch] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const router = useRouter();
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (inputValue.trim() !== "") {
                router.push(`/search?query=${encodeURIComponent(inputValue.trim())}`);
            }
        }
    };
    return (
        <div className="flex relative w-[400px] gap-2">
            <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder={isAISearch ? "Describe what type of movie you're looking for..." : "Search movies..."}
                    className="w-full pl-9 border-border focus-visible:ring-1"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <Button 
                variant={isAISearch ? "secondary" : "ghost"}
                size="icon"
                className="shrink-0"
                onClick={() => setAISearch(!isAISearch)}
            >
                <Sparkles className="h-4 w-4" />
            </Button>
        </div>
    )
}