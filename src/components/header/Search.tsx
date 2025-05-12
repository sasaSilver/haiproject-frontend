"use client";

import { Search as SearchIcon, Sparkles, Filter } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";

const DEFAULT_FILTERS = {
  and: "",
  or: "",
  not: "",
  year: "",
  rating: "",
  skip: "",
  limit: ""
};

type Filters = typeof DEFAULT_FILTERS;

export default function Search() {
  const [isAISearch, setAISearch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchParams = new URLSearchParams();
    searchParams.append("ai", `${isAISearch}`)
    if (inputValue.trim()) searchParams.append("q", inputValue.trim());

    Object.entries(filters).forEach(([key, value]) => {
      const trimmedValue = value.trim();
      if (!trimmedValue) return;

      if (key === "and" || key === "or" || key === "not") {
        trimmedValue.split(",")
          .map(s => s.trim())
          .forEach(v => searchParams.append(key, v));
      } else {
        searchParams.append(key, trimmedValue);
      }
    });

    router.push(`/search?${searchParams.toString()}`);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative w-[400px]">
      <form onSubmit={handleSubmit} className="flex gap-2" aria-label="Search form">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            name="q"
            placeholder={
              isAISearch
                ? "Describe what type of movie you're looking for..."
                : "Search movies..."
            }
            className="w-full pl-9 border-border focus-visible:ring-1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="shrink-0"
          title="Search"
        >
          <SearchIcon className="h-4 w-4" />
        </Button>
        <Button
          variant={isAISearch ? "secondary" : "ghost"}
          size="icon"
          className="shrink-0"
          onClick={() => setAISearch(!isAISearch)}
          type="button"
          title="Toggle AI Search"
        >
          <Sparkles className="h-4 w-4" />
        </Button>
        <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0"
              title="Toggle Filters"
              type="button"
            >
              <Filter />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-4">
            <div className="flex flex-col gap-2">
              {Object.entries(filters).map(([key, value]) => (
                <label key={key} className="flex flex-col text-sm">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  {["and", "or", "not"].includes(key) && " (comma separated genres)"}
                  <Input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleFilterChange}
                  />
                </label>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </form>
    </div>
  );
}