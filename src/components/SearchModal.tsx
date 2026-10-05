import React, { useState } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    setSelectedProduct,
    products,
  } = useShop();

  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const quickSearches = ['Diamond', 'Rose Gold', 'Clutch', 'Silk', 'Lipstick', 'Necklace'];

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.materials.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 md:p-12 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#fce7f3] overflow-hidden mt-8">
        {/* Search Bar Input */}
        <div className="p-4 sm:p-6 border-b border-[#fce7f3] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C8728D] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jewelry, bags, silk scarves, beauty..."
            className="w-full text-sm sm:text-base text-[#121212] placeholder-[#a3a3a3] focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#a3a3a3] hover:text-[#121212] px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
            className="p-2 rounded-full text-[#4A4A4A] hover:bg-[#FFF0F5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-6 py-3 bg-[#FFFBFD] border-b border-[#fce7f3]/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] uppercase tracking-wider text-[#737373] whitespace-nowrap">
            Popular:
          </span>
          {quickSearches.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-3 py-1 rounded-full text-xs bg-white border border-[#fce7f3] text-[#4A4A4A] hover:text-[#C8728D] hover:border-[#C8728D] transition-colors whitespace-nowrap"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {query.trim() === '' ? (
            <div className="text-center py-10">
              <Sparkles className="w-8 h-8 text-[#fbcfe8] mx-auto mb-2" />
              <p className="text-xs text-[#737373] font-light">
                Type above to discover timeless creations from the FLORA LUXE catalog.
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm font-serif text-[#121212] mb-1">
                No matching creations found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-[#737373]">
                Try searching for &lsquo;Jewelry&rsquo;, &lsquo;Clutch&rsquo;, or &lsquo;Beauty&rsquo;.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <span className="text-[10px] tracking-wider uppercase text-[#737373] block mb-2">
                {results.length} Creations Found
              </span>
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsSearchOpen(false);
                  }}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-white hover:bg-[#FFF5F7] border border-[#fce7f3] cursor-pointer transition-colors"
                >
                  <div className="w-14 h-16 rounded-xl overflow-hidden bg-[#FFF0F5] shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#C8728D] font-medium block">
                      {product.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-serif font-medium text-[#121212]">
                      {product.name}
                    </h4>
                    <span className="text-xs text-[#737373] font-light line-clamp-1">
                      {product.tagline}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs sm:text-sm font-semibold text-[#121212] tabular-nums block">
                      Rs. {product.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#9f1239] font-medium flex items-center gap-0.5 justify-end">
                      View <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
