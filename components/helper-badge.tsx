"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Search } from "lucide-react";
import { getTermsByCategory } from "@/lib/term-detection";
import { glossaryTerms } from "@/lib/glossary-data";

interface HelperBadgeProps {
  label: string;
  category: string;
  onInsert: (term: string) => void;
}

export function HelperBadge({ label, category, onInsert }: HelperBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get terms for this category
  const allTerms = glossaryTerms
    .filter(t => t.category === category)
    .map(t => ({ term: t.term, definition: t.definition }))
    .sort((a, b) => a.term.localeCompare(b.term));

  const filteredTerms = searchQuery
    ? allTerms.filter(t =>
        t.term.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allTerms;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (term: string) => {
    onInsert(`[${term}]`);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs h-7"
      >
        {label}
        <ChevronDown className="h-3 w-3 ml-1" />
      </Button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-hidden flex flex-col">
          {/* Search */}
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <Input
                type="text"
                placeholder={`Search ${label.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8 text-sm"
                autoFocus
              />
            </div>
          </div>

          {/* Terms List */}
          <div className="overflow-y-auto flex-1">
            {filteredTerms.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                No terms found
              </div>
            ) : (
              <div className="p-2 space-y-1">
                {filteredTerms.map(({ term, definition }) => (
                  <button
                    key={term}
                    onClick={() => handleSelect(term)}
                    className="w-full text-left p-2 rounded hover:bg-purple-50 transition-colors group"
                  >
                    <div className="flex items-start gap-2">
                      <Badge
                        variant="outline"
                        className="text-xs bg-purple-100 text-purple-800 group-hover:bg-purple-200"
                      >
                        {term}
                      </Badge>
                    </div>
                    {definition && (
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {definition}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-2 border-t bg-gray-50 text-xs text-gray-500 text-center">
            {filteredTerms.length} term{filteredTerms.length !== 1 ? "s" : ""}
          </div>
        </div>
      )}
    </div>
  );
}
