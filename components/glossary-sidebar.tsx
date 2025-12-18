"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Volume2,
} from "lucide-react";
import { glossaryTerms, getAllCategories } from "@/lib/glossary-data";
import { GlossaryTerm } from "@/lib/types";

export function GlossarySidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["Tempo & Rhythm"]) // Default to first category open
  );
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);

  const categories = getAllCategories();

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const filteredTerms = searchQuery
    ? glossaryTerms.filter(
        (term) =>
          term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
          term.synonyms?.some((syn) =>
            syn.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : glossaryTerms;

  const termsByCategory = categories.reduce((acc, category) => {
    acc[category] = filteredTerms.filter((term) => term.category === category);
    return acc;
  }, {} as Record<string, GlossaryTerm[]>);

  return (
    <div
      className={`bg-white border-l transition-all duration-300 flex-shrink-0 relative h-screen sticky top-0 ${
        isOpen ? "w-96" : "w-12"
      }`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -left-3 top-6 bg-white border shadow-md rounded-full h-8 w-8 z-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      {isOpen && (
        <div className="h-full flex flex-col overflow-hidden">
          <div className="p-4 border-b bg-gradient-to-r from-amber-50 to-orange-50">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-amber-600" />
              <h2 className="text-lg font-bold text-amber-900">Musical Glossary</h2>
            </div>
            <p className="text-xs text-gray-600">
              Browse musical terms and concepts
            </p>
          </div>

          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search terms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {searchQuery ? (
              // Search results view
              <div className="p-4 space-y-2">
                {filteredTerms.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    No terms found
                  </div>
                ) : (
                  filteredTerms.map((term) => (
                    <button
                      key={term.id}
                      onClick={() => setSelectedTerm(term)}
                      className="w-full text-left p-3 rounded-lg border hover:border-amber-300 hover:bg-amber-50 transition-colors"
                    >
                      <div className="font-semibold text-sm text-amber-900">
                        {term.term}
                      </div>
                      <div className="text-xs text-gray-600 line-clamp-2 mt-1">
                        {term.definition}
                      </div>
                      <div className="mt-1.5">
                        <Badge variant="outline" className="text-xs">
                          {term.category}
                        </Badge>
                      </div>
                    </button>
                  ))
                )}
              </div>
            ) : (
              // Category accordion view
              <div className="divide-y">
                {categories.map((category) => {
                  const categoryTerms = termsByCategory[category];
                  const isExpanded = expandedCategories.has(category);

                  if (categoryTerms.length === 0) return null;

                  return (
                    <div key={category}>
                      <button
                        onClick={() => toggleCategory(category)}
                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{category}</span>
                          <Badge variant="secondary" className="text-xs">
                            {categoryTerms.length}
                          </Badge>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-3 space-y-2">
                          {categoryTerms.map((term) => (
                            <button
                              key={term.id}
                              onClick={() => setSelectedTerm(term)}
                              className="w-full text-left p-2 rounded hover:bg-amber-50 transition-colors"
                            >
                              <div className="font-medium text-sm text-amber-900">
                                {term.term}
                              </div>
                              <div className="text-xs text-gray-600 line-clamp-1 mt-0.5">
                                {term.definition}
                              </div>
                              {term.subcategory && (
                                <div className="text-xs text-gray-500 mt-1">
                                  {term.subcategory}
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="p-3 border-t text-xs text-gray-500 bg-gray-50">
            {filteredTerms.length} terms available
          </div>
        </div>
      )}

      {!isOpen && (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="writing-mode-vertical text-xs font-medium text-gray-600">
            Glossary
          </div>
        </div>
      )}

      {/* Term Detail Modal */}
      {selectedTerm && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedTerm(null)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b bg-gradient-to-r from-amber-50 to-orange-50">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-amber-900 mb-1">
                    {selectedTerm.term}
                  </h3>
                  {selectedTerm.synonyms && selectedTerm.synonyms.length > 0 && (
                    <p className="text-sm text-gray-600">
                      Also known as: {selectedTerm.synonyms.join(", ")}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedTerm(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Definition</h4>
                <p className="text-sm text-gray-900">{selectedTerm.definition}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{selectedTerm.category}</Badge>
                {selectedTerm.subcategory && (
                  <Badge variant="outline">{selectedTerm.subcategory}</Badge>
                )}
                {selectedTerm.applies_to.map((tier) => (
                  <Badge key={tier} className="bg-purple-100 text-purple-800">
                    Tier {tier === "global" ? "1" : tier === "instrument" ? "2" : "3"}
                  </Badge>
                ))}
              </div>

              {selectedTerm.examples && selectedTerm.examples.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Examples</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedTerm.examples.map((example, idx) => (
                      <li key={idx} className="text-sm text-gray-700">
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedTerm.related_terms && selectedTerm.related_terms.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Related Terms
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTerm.related_terms.map((relatedTerm) => {
                      const term = glossaryTerms.find((t) => t.term === relatedTerm);
                      return (
                        <button
                          key={relatedTerm}
                          onClick={() => term && setSelectedTerm(term)}
                          className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded hover:bg-amber-200 transition-colors"
                        >
                          {relatedTerm}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {selectedTerm.audio_example_url && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Audio Example
                  </h4>
                  <button className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded hover:bg-amber-200 transition-colors">
                    <Volume2 className="h-4 w-4" />
                    <span className="text-sm">Play Example</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
