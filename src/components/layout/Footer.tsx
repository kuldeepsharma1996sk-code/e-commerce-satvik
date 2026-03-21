import Link from "next/link";

const footerLinks = {
    Shop: [
        { name: "Brass Idols", href: "/collection?category=brass-idols" },
        { name: "Marble Murtis", href: "/collection?category=marble-murtis" },
        { name: "Pooja Essentials", href: "/collection?category=pooja-essentials" },
        { name: "Incense & Dhoop", href: "/collection?category=incense-dhoop" },
        { name: "Ritual Kits", href: "/collection?category=ritual-kits" },
    ],
    "Spiritual Guide": [
        { name: "Daily Remedy", href: "/remedies" },
        { name: "Today's Panchang", href: "/remedies#panchang" },
        { name: "Vastu Tips", href: "#" },
        { name: "Mandir Setup Guide", href: "#" },
    ],
    Support: [
        { name: "Shipping & Returns", href: "#" },
        { name: "Track Order", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "FAQ", href: "#" },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-[#2D2A26] text-white/70 pb-24 md:pb-8">
            {/* Newsletter */}
            <div className="bg-gradient-to-r from-[#5D4037] to-[#2D2A26] py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">
                        Begin Your Sattvic Journey
                    </h3>
                    <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">
                        Receive daily spiritual guidance, exclusive offers, and new arrivals
                        directly in your inbox.
                    </p>
                    <div className="flex max-w-md mx-auto gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF9933]"
                        />
                        <button className="px-6 py-3 bg-[#FF9933] text-white rounded-xl font-semibold hover:bg-[#e68a2e] transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Links */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-[#FF9933] rounded-full flex items-center justify-center">
                                <span className="text-white font-serif font-bold text-sm">A</span>
                            </div>
                            <span className="text-xl font-serif font-bold text-white">
                                Antigravity
                            </span>
                        </div>
                        <p className="text-sm text-white/50 leading-relaxed">
                            Bridging ancient wisdom with modern living. Authentic pooja
                            essentials, sacred idols, and daily spiritual guidance.
                        </p>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                                {title}
                            </h4>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-white/50 hover:text-[#FF9933] transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-white/30">
                        © 2026 Antigravity. All rights reserved. Made with devotion in India.
                    </p>
                    <div className="flex gap-4 text-xs text-white/30">
                        <Link href="#" className="hover:text-white/60">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white/60">Terms of Service</Link>
                        <Link href="#" className="hover:text-white/60">Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
