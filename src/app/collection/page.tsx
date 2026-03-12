"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { products, categories } from "@/data/products";

export default function CollectionPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState("featured");
    const [showFilters, setShowFilters] = useState(false);

    const filteredProducts = products
        .filter((p) => !selectedCategory || p.category === selectedCategory)
        .sort((a, b) => {
            if (sortBy === "price-low") return a.price - b.price;
            if (sortBy === "price-high") return b.price - a.price;
            if (sortBy === "rating") return b.rating - a.rating;
            return 0;
        });

    return (
        <div className="min-h-screen bg-ivory pb-24">
            {/* Hero Header */}
            <div className="bg-gradient-to-b from-[#5D4037] to-[#2D2A26] py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B5A642]">
                        Sacred Collection
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif text-white mt-3">
                        {selectedCategory || "All Products"}
                    </h1>
                    <p className="text-white/50 mt-3 max-w-lg mx-auto">
                        Each piece is crafted with devotion and authenticated for quality.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Controls */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 text-sm font-medium text-[#5D4037] hover:text-[#FF9933] transition-colors md:hidden"
                    >
                        <SlidersHorizontal size={16} /> Filters
                    </button>
                    <p className="text-sm text-[#5D4037]/50 hidden md:block">
                        Showing {filteredProducts.length} products
                    </p>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="text-sm bg-white/60 border border-[#B5A642]/20 rounded-xl px-4 py-2 text-[#5D4037] focus:outline-none focus:border-[#FF9933]"
                    >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                    </select>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar Filters (Desktop) */}
                    <aside className={`${showFilters ? "fixed inset-0 z-50 bg-ivory p-6 overflow-y-auto" : "hidden"} md:block md:relative md:w-64 md:flex-shrink-0`}>
                        <div className="flex items-center justify-between md:hidden mb-6">
                            <h2 className="text-lg font-serif text-[#5D4037]">Filters</h2>
                            <button onClick={() => setShowFilters(false)}>
                                <X size={20} className="text-[#5D4037]" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-[#B5A642] mb-3">
                                    Categories
                                </h3>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => {
                                            setSelectedCategory(null);
                                            setShowFilters(false);
                                        }}
                                        className={`block w-full text-left text-sm px-3 py-2 rounded-xl transition-colors ${!selectedCategory
                                            ? "bg-[#FF9933]/10 text-[#FF9933] font-semibold"
                                            : "text-[#5D4037]/70 hover:bg-white/60"
                                            }`}
                                    >
                                        All Products
                                    </button>
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.slug}
                                            onClick={() => {
                                                setSelectedCategory(cat.name);
                                                setShowFilters(false);
                                            }}
                                            className={`block w-full text-left text-sm px-3 py-2 rounded-xl transition-colors ${selectedCategory === cat.name
                                                ? "bg-[#FF9933]/10 text-[#FF9933] font-semibold"
                                                : "text-[#5D4037]/70 hover:bg-white/60"
                                                }`}
                                        >
                                            {cat.name}
                                            <span className="text-[#B5A642] ml-1">({cat.count})</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-[#B5A642] mb-3">
                                    Material
                                </h3>
                                <div className="space-y-2">
                                    {["Pure Brass", "Makrana Marble", "Bronze", "Pure Copper", "Tulsi Wood"].map(
                                        (mat) => (
                                            <label
                                                key={mat}
                                                className="flex items-center gap-2 text-sm text-[#5D4037]/70 cursor-pointer hover:text-[#5D4037]"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 rounded border-[#B5A642]/30 text-[#FF9933] focus:ring-[#FF9933]"
                                                />
                                                {mat}
                                            </label>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                            {filteredProducts.map((product, i) => (
                                <ProductCard key={product.id} product={product} index={i} />
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-[#B5A642] text-lg font-serif">
                                    No products found in this category.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
