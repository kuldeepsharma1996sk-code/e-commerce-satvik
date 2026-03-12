"use client";

import Script from "next/script";
import { useState } from "react";
import { motion } from "framer-motion";
import { Info, Maximize, ShoppingCart, Star, ChevronRight, Shield, Truck, RotateCcw, Heart } from "lucide-react";
import Link from "next/link";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import SubscriptionToggle from "@/components/ui/SubscriptionToggle";
import ProductCard from "@/components/ui/ProductCard";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const product = products.find((p) => p.slug === slug) || products[0];
    const { addItem } = useCart();

    const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
    const [isSubscription] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const handleAddToCart = () => {
        addItem(product, selectedVariants, product.isSubscribable && isSubscription);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#F9F6F0] pb-24">
            {/* Model Viewer Script */}
            {product.model3dUrl && (
                <Script
                    type="module"
                    src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"
                />
            )}

            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center gap-2 text-xs text-[#B5A642]">
                    <Link href="/" className="hover:text-[#FF9933]">Home</Link>
                    <ChevronRight size={12} />
                    <Link href="/collection" className="hover:text-[#FF9933]">Collection</Link>
                    <ChevronRight size={12} />
                    <span className="text-[#5D4037]">{product.name}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pt-4 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Left: Image / 3D Viewer */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative"
                >
                    <div className="relative h-[400px] md:h-[600px] bg-white/50 rounded-3xl overflow-hidden border border-[#B5A642]/20">
                        {product.model3dUrl ? (
                            <>
                                {/* @ts-expect-error model-viewer is a web component */}
                                <model-viewer
                                    src={product.model3dUrl}
                                    ios-src={product.modelUsdzUrl}
                                    alt={`A 3D model of ${product.name}`}
                                    ar
                                    ar-modes="webxr scene-viewer quick-look"
                                    camera-controls
                                    shadow-intensity="1"
                                    auto-rotate
                                    style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
                                >
                                    <button
                                        slot="ar-button"
                                        className="absolute bottom-4 right-4 bg-[#5D4037] text-white px-4 py-2 rounded-full text-xs flex items-center gap-2 hover:bg-[#FF9933] transition-colors"
                                    >
                                        <Maximize size={14} /> Place in your Mandir
                                    </button>
                                    {/* @ts-expect-error model-viewer is a web component */}
                                </model-viewer>
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#F9F6F0] to-[#E8E2D6]">
                                <div className="w-48 h-48 bg-[#C2B280]/20 rounded-full flex items-center justify-center">
                                    <span className="text-7xl font-serif text-[#C2B280]/50">
                                        {product.name.charAt(0)}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Badge */}
                    {product.badge && (
                        <span className="absolute top-6 left-6 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FF9933] text-white">
                            {product.badge}
                        </span>
                    )}
                </motion.div>

                {/* Right: Product Info */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col"
                >
                    <span className="text-[#B5A642] uppercase tracking-[0.2em] text-sm mb-2 font-semibold">
                        {product.material || product.category}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-serif text-[#5D4037] mb-4">
                        {product.name}
                    </h1>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    className={
                                        i < Math.floor(product.rating)
                                            ? "text-[#FF9933] fill-[#FF9933]"
                                            : "text-[#B5A642]/30"
                                    }
                                />
                            ))}
                        </div>
                        <span className="text-sm text-[#5D4037]/60">
                            {product.rating} ({product.reviewCount} reviews)
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-3 mb-6">
                        <span className="text-3xl text-[#FF9933] font-bold">
                            ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        {product.originalPrice && (
                            <>
                                <span className="text-lg line-through text-[#B5A642]">
                                    ₹{product.originalPrice.toLocaleString("en-IN")}
                                </span>
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                </span>
                            </>
                        )}
                    </div>

                    {/* Description */}
                    <p className="text-[#5D4037]/80 leading-relaxed mb-6">
                        {product.description}
                    </p>

                    {/* Variants */}
                    {product.variants && product.variants.length > 0 && (
                        <div className="space-y-4 mb-6">
                            {product.variants.map((variant) => (
                                <div key={variant.name}>
                                    <label className="text-xs font-bold uppercase tracking-wider text-[#B5A642] mb-2 block">
                                        {variant.name}
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {variant.options.map((option) => (
                                            <button
                                                key={option}
                                                onClick={() =>
                                                    setSelectedVariants((prev) => ({
                                                        ...prev,
                                                        [variant.name]: option,
                                                    }))
                                                }
                                                className={`px-4 py-2 rounded-xl text-sm border-2 transition-all ${selectedVariants[variant.name] === option
                                                    ? "border-[#FF9933] bg-[#FF9933]/5 text-[#5D4037] font-semibold"
                                                    : "border-[#B5A642]/20 text-[#5D4037]/70 hover:border-[#B5A642]/40"
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Subscription Toggle (for consumables) */}
                    {product.isSubscribable && (
                        <SubscriptionToggle price={product.price} />
                    )}

                    {/* Vedic Specification Box */}
                    {(product.vastuDirection || product.weight) && (
                        <div className="bg-white/40 p-4 rounded-xl border border-[#B5A642]/10 space-y-3 mb-6">
                            {product.vastuDirection && (
                                <div className="flex items-center gap-2 text-sm">
                                    <Info size={16} className="text-[#B5A642]" />
                                    <span className="font-bold text-[#5D4037]">Pooja Vidhi:</span>
                                    <span className="text-[#5D4037]/70">
                                        Best placed in the {product.vastuDirection}.
                                    </span>
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-4 text-xs text-[#5D4037]/70">
                                {product.weight && (
                                    <div>
                                        <strong className="text-[#5D4037]">Weight:</strong> {product.weight}kg
                                    </div>
                                )}
                                {product.height && (
                                    <div>
                                        <strong className="text-[#5D4037]">Height:</strong> {product.height} inches
                                    </div>
                                )}
                            </div>
                            {product.careInstructions && (
                                <p className="text-xs text-[#5D4037]/60 italic border-t border-[#B5A642]/10 pt-3">
                                    💡 <strong>Care:</strong> {product.careInstructions}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Trust Badges */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {[
                            { icon: Shield, label: "Authentic" },
                            { icon: Truck, label: "Free Shipping ₹999+" },
                            { icon: RotateCcw, label: "Easy Returns" },
                        ].map(({ icon: Icon, label }) => (
                            <div key={label} className="flex flex-col items-center gap-1 p-3 bg-white/40 rounded-xl border border-[#B5A642]/10 text-center">
                                <Icon size={16} className="text-[#B5A642]" />
                                <span className="text-[10px] text-[#5D4037]/60 font-medium">{label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Add to Cart CTA */}
                    <div className="fixed bottom-20 left-0 right-0 p-4 md:relative md:bottom-0 md:p-0 bg-[#F9F6F0]/80 backdrop-blur-md md:bg-transparent z-30">
                        <div className="flex gap-3">
                            <button
                                onClick={handleAddToCart}
                                className={`flex-1 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg transition-all ${addedToCart
                                    ? "bg-green-500 text-white"
                                    : "bg-[#FF9933] text-white hover:bg-[#e68a2e]"
                                    }`}
                            >
                                <ShoppingCart size={20} />
                                {addedToCart ? "Added! ✓" : "Add to Cart"}
                            </button>
                            <button className="p-4 rounded-2xl border-2 border-[#B5A642]/20 text-[#5D4037] hover:border-[#FF9933] hover:text-[#FF9933] transition-all">
                                <Heart size={20} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 py-16">
                    <h2 className="text-2xl md:text-3xl font-serif text-[#5D4037] mb-8">
                        You May Also Like
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {relatedProducts.map((p, i) => (
                            <ProductCard key={p.id} product={p} index={i} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
