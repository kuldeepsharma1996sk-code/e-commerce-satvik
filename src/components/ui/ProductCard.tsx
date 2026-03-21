"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
    product: Product;
    index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const { addItem } = useCart();
    const [imageError, setImageError] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-white rounded-3xl overflow-hidden border border-[#B5A642]/10 hover:border-[#B5A642]/30 hover:shadow-xl transition-all duration-500"
        >
            {/* Badge */}
            {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                    <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${product.badge === "Bestseller"
                                ? "bg-[#FF9933] text-white"
                                : product.badge === "New"
                                    ? "bg-[#5D4037] text-white"
                                    : "bg-[#C41E3A] text-white"
                            }`}
                    >
                        {product.badge}
                    </span>
                </div>
            )}

            {/* Image SECTION with Fallback */}
            <Link href={`/collection/${product.slug}`}>
                <div className="relative h-56 md:h-64 bg-stone-100 flex items-center justify-center overflow-hidden">
                    {product.mainImage && !imageError ? (
                        <img 
                            src={product.mainImage} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="text-center p-4">
                            <span className="text-[#FF9933] text-[10px] uppercase tracking-[0.3em] font-black">Satvik Home</span>
                            <p className="text-slate-400 text-[10px] mt-2 italic font-serif">Sacred Image Arriving Soon</p>
                        </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />
                </div>
            </Link>

            {/* Info */}
            <div className="p-4 md:p-5">
                <p className="text-[10px] uppercase tracking-widest text-[#B5A642] font-semibold mb-1">
                    {product.category}
                </p>
                <Link href={`/collection/${product.slug}`}>
                    <h3 className="font-serif text-lg text-[#5D4037] group-hover:text-[#FF9933] transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                </Link>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                    <Star size={12} className="text-[#FF9933] fill-[#FF9933]" />
                    <span className="text-xs font-medium text-[#5D4037]">
                        {product.rating}
                    </span>
                    <span className="text-xs text-[#5D4037]/40">
                        ({product.reviewCount})
                    </span>
                </div>

                {/* Price + Add to Cart */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#B5A642]/10">
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-[#FF9933]">
                            ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        {product.originalPrice && (
                            <span className="text-xs line-through text-[#B5A642]">
                                ₹{product.originalPrice.toLocaleString("en-IN")}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => addItem(product)}
                        className="p-2.5 rounded-xl bg-[#FF9933]/10 text-[#FF9933] hover:bg-[#FF9933] hover:text-white transition-all duration-300 shadow-sm"
                    >
                        <ShoppingBag size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
