"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, ShoppingBag, Star } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import RitualKitCard from "@/components/ui/RitualKitCard";
import DailyRemedyCard from "@/components/ui/DailyRemedyCard";
import PanchangWidget from "@/components/ui/PanchangWidget";
import { products } from "@/data/products";
import { ritualKits } from "@/data/ritualKits";
import { todaysRemedy, todaysPanchang } from "@/data/astrology";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
};

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.badge === "Bestseller").slice(0, 4);
  const newArrivals = products.filter((p) => p.badge === "New" || p.badge === "Limited").slice(0, 4);

  return (
    <div className="bg-ivory">
      {/* ======== HERO SECTION ======== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#FF9933]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#C2B280]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B5A642]/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles size={16} className="text-[#FF9933]" />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B5A642]">
                  Ancient Wisdom, Modern Living
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif text-[#5D4037] leading-[1.1] mb-6">
                Where <span className="text-gradient-saffron">Devotion</span>{" "}
                Meets Craftsmanship
              </h1>
              <p className="text-lg text-[#5D4037]/70 leading-relaxed max-w-lg mb-8">
                Discover hand-crafted brass idols, premium pooja essentials, and
                curated ritual kits — each piece carries the energy of centuries-old
                artisan traditions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/collection"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF9933] text-white rounded-2xl font-semibold text-sm hover:bg-[#e68a2e] transition-all shadow-lg shadow-[#FF9933]/25 hover:shadow-xl hover:shadow-[#FF9933]/30"
                >
                  <ShoppingBag size={18} />
                  Explore Collection
                </Link>
                <Link
                  href="/remedies"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#B5A642]/30 text-[#5D4037] rounded-2xl font-semibold text-sm hover:border-[#FF9933] hover:text-[#FF9933] transition-all"
                >
                  Today&apos;s Remedy
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 mt-10 pt-8 border-t border-[#B5A642]/10">
                <div>
                  <p className="text-2xl font-serif font-bold text-[#5D4037]">5000+</p>
                  <p className="text-[10px] uppercase tracking-wider text-[#B5A642]">Happy Devotees</p>
                </div>
                <div className="w-px h-10 bg-[#B5A642]/20" />
                <div>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-[#FF9933] fill-[#FF9933]" />
                    <span className="text-2xl font-serif font-bold text-[#5D4037]">4.8</span>
                  </div>
                  <p className="text-[10px] uppercase tracking-wider text-[#B5A642]">Avg Rating</p>
                </div>
                <div className="w-px h-10 bg-[#B5A642]/20" />
                <div>
                  <p className="text-2xl font-serif font-bold text-[#5D4037]">100%</p>
                  <p className="text-[10px] uppercase tracking-wider text-[#B5A642]">Authentic</p>
                </div>
              </div>
            </motion.div>

            {/* Right - Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              <div className="relative w-[450px] h-[450px]">
                {/* Circle background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#C2B280]/20 to-[#FF9933]/10 animate-breath" />
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[#F9F6F0] to-white/80 flex items-center justify-center">
                  <div className="text-center">
                    <img 
                      src="/images/ganesha-hero.png" 
                      alt="Ganesha Idol" 
                      className="h-64 w-auto object-contain mx-auto transition-transform hover:scale-110 duration-700 pointer-events-none select-none"
                    />
                    <p className="text-sm text-[#B5A642] mt-4 font-serif italic">
                      Begin your sacred journey
                    </p>
                  </div>
                </div>
                {/* Floating elements */}
                <div className="absolute top-8 right-8 w-16 h-16 bg-white/80 rounded-2xl flex items-center justify-center shadow-lg animate-float">
                  <span className="text-2xl">🪔</span>
                </div>
                <div className="absolute bottom-12 left-4 w-14 h-14 bg-white/80 rounded-2xl flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: "2s" }}>
                  <span className="text-2xl">🪷</span>
                </div>
                <div className="absolute top-1/2 -right-4 w-14 h-14 bg-white/80 rounded-2xl flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: "4s" }}>
                  <span className="text-xl">🔔</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======== DAILY REMEDY + PANCHANG ======== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-ivory to-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B5A642]">
              Your Morning Companion
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#5D4037] mt-3">
              Daily Spiritual Guidance
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <DailyRemedyCard remedy={todaysRemedy} />
            <PanchangWidget data={todaysPanchang} />
          </div>
        </div>
      </section>

      {/* ======== FEATURED PRODUCTS ======== */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B5A642]">
                Curated for You
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#5D4037] mt-3">
                Bestsellers
              </h2>
            </div>
            <Link
              href="/collection"
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#FF9933] hover:text-[#e68a2e] transition-colors"
            >
              View All <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF9933]"
            >
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ======== RITUAL KITS ======== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white/50 to-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B5A642]">
              Save More, Pray More
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#5D4037] mt-3">
              Ritual Kits
            </h2>
            <p className="text-[#5D4037]/60 mt-3 max-w-lg mx-auto">
              Thoughtfully bundled essentials for every ritual. Each kit is
              curated by temple priests for the perfect pooja experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ritualKits.map((kit, i) => (
              <RitualKitCard key={kit.id} kit={kit} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ======== NEW ARRIVALS ======== */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B5A642]">
                Just Arrived
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#5D4037] mt-3">
                New & Exclusive
              </h2>
            </div>
            <Link
              href="/collection"
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#FF9933] hover:text-[#e68a2e]"
            >
              View All <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ======== TESTIMONIALS ======== */}
      <section className="py-16 md:py-24 bg-[#5D4037]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B5A642]">
              From Our Community
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white mt-3">
              Voices of Devotion
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                text: "The Ganesh Ji idol is absolutely stunning. The craftsmanship is beyond what I expected from an online purchase. It now sits in our family mandir with pride.",
                name: "Priya Sharma",
                location: "New Delhi",
                rating: 5,
              },
              {
                text: "I subscribed to the Monthly Ritual agarbatti box and it has transformed my morning pooja. The fragrances are authentic and the quality is consistent every month.",
                name: "Rajesh Patel",
                location: "Ahmedabad",
                rating: 5,
              },
              {
                text: "The Daily Remedy feature is why I open this app every morning. It's like having a personal pandit ji in my pocket. Highly recommended for every Hindu household.",
                name: "Meera Krishnan",
                location: "Chennai",
                rating: 5,
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-[#FF9933] fill-[#FF9933]" />
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed italic mb-4 font-serif">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-white/40 text-xs">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== CTA BANNER ======== */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-[#FF9933] to-[#e68a2e] p-8 md:p-16 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
                Start Your Sattvic Journey Today
              </h2>
              <p className="text-white/80 max-w-md mx-auto mb-8">
                Use code <strong>FIRST10</strong> for 10% off your first order.
                Free shipping on orders above ₹999.
              </p>
              <Link
                href="/collection"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#FF9933] rounded-2xl font-bold hover:bg-ivory transition-colors shadow-lg"
              >
                <ShoppingBag size={18} />
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
