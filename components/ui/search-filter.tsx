import { Input } from './input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Button } from './button';
import { Search, Filter, X } from 'lucide-react';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters?: {
    label: string;
    value: string;
    options: { label: string; value: string }[];
    onChange: (value: string) => void;
  }[];
  onClearFilters?: () => void;
}

export function SearchFilter({
  searchTerm,
  onSearchChange,
  filters = [],
  onClearFilters,
}: SearchFilterProps) {
  const hasActiveFilters = searchTerm || filters.some((f) => f.value !== 'all');

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700"
          />
        </div>

        {filters.map((filter, index) => (
          <Select key={index} value={filter.value} onValueChange={filter.onChange}>
            <SelectTrigger className="w-full sm:w-48 bg-slate-800 border-slate-700">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <SelectValue placeholder={filter.label} />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {filter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}

        {hasActiveFilters && onClearFilters && (
          <Button
            onClick={onClearFilters}
            variant="outline"
            size="icon"
            className="border-slate-700 shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

export function useSearchFilter<T>(
  items: T[],
  searchFields: (keyof T)[],
  initialFilters?: Record<string, string>
) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filters, setFilters] = React.useState<Record<string, string>>(initialFilters || {});

  const filteredItems = React.useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = searchTerm
        ? searchFields.some((field) => {
            const value = item[field];
            return value && String(value).toLowerCase().includes(searchTerm.toLowerCase());
          })
        : true;

      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (value === 'all') return true;
        return item[key as keyof T] === value;
      });

      return matchesSearch && matchesFilters;
    });
  }, [items, searchTerm, filters, searchFields]);

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters(initialFilters || {});
  };

  return {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    clearFilters,
    filteredItems,
  };
}

import React from 'react';
