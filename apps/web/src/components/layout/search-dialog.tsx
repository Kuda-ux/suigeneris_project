'use client';

import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // Mock search results - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockResults = [
        {
          id: '1',
          name: 'MacBook Pro 14" M3',
          category: 'Laptops',
          price: 2199,
          image: '/images/macbook-pro-14-m3-1.jpg',
        },
        {
          id: '2',
          name: 'Dell XPS 13',
          category: 'Laptops',
          price: 1499,
          image: '/images/dell-xps-13-1.jpg',
        },
        {
          id: '3',
          name: 'iPhone 15',
          category: 'Phones',
          price: 799,
          image: '/images/iphone-15-1.jpg',
        },
      ].filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setResults(mockResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
    handleSearch(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for laptops, phones, printers..."
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          {isSearching && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Searching...</span>
            </div>
          )}

          {!isSearching && query && results.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No products found for "{query}"
            </div>
          )}

          {!isSearching && results.length > 0 && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.map((product: any) => (
                <div
                  key={product.id}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted cursor-pointer"
                  onClick={() => {
                    // Navigate to product page
                    window.location.href = `/products/${product.id}`;
                    onOpenChange(false);
                  }}
                >
                  <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!query && (
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">Popular Searches</h4>
              <div className="flex flex-wrap gap-2">
                {['MacBook', 'iPhone', 'Dell XPS', 'Gaming Laptop', 'Wireless Mouse'].map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    onClick={() => handleInputChange(term)}
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
