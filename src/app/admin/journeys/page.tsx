"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Truck, 
  Sparkles, 
  Store, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Search, 
  Filter, 
  MoreVertical,
  Calendar,
  Layers,
  Activity
} from "lucide-react";

const journeys = [
    { 
        id: "J-DLV-8742", 
        type: "Delivery", 
        customer: "Ananya S.", 
        status: "In Transit", 
        progress: 65, 
        currentMilestone: "Local Hub - Sorting", 
        nextMilestone: "Out for Delivery",
        location: "Mumbai South Hub",
        eta: "2:00 PM Today",
        priority: "High"
    },
    { 
        id: "J-RIT-1029", 
        type: "Ritual", 
        customer: "Rajesh K.", 
        status: "Active Cycle", 
        progress: 48, 
        currentMilestone: "Day 10 (Mid-Point)", 
        nextMilestone: "Day 21 (Completion)",
        location: "Home Mandir",
        eta: "11 Days Left",
        priority: "Medium"
    },
    { 
        id: "J-RET-0951", 
        type: "Retail", 
        customer: "Vastu Temple Store", 
        status: "Installation", 
        progress: 90, 
        currentMilestone: "Final Audit", 
        nextMilestone: "Handover",
        location: "New Delhi",
        eta: "5:00 PM Tomorrow",
        priority: "Critical"
    },
];

const journeyTypes = [
    { name: "Delivery", icon: Truck, color: "bg-blue-500", label: "Shipping Stats" },
    { name: "Ritual", icon: Sparkles, color: "bg-[#FF9933]", label: "User Progress" },
    { name: "Retail", icon: Store, color: "bg-purple-500", label: "TAT Dashboard" },
];

export default function AdminJourneysPage() {
    const [activeType, setActiveType] = useState<string | null>(null);

    const filteredJourneys = activeType 
        ? journeys.filter(j => j.type === activeType) 
        : journeys;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Multi-Layer Journey Tracker</h1>
                    <p className="text-slate-500 text-sm mt-1">Real-time visibility into logistics, rituals, and retail site lifecycle.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
                        <Layers size={18} /> Live Map View
                    </button>
                    <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2">
                        <Activity size={18} /> Analytics Console
                    </button>
                </div>
            </div>

            {/* View Selectors (Journey Types) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {journeyTypes.map((type) => (
                    <button
                        key={type.name}
                        onClick={() => setActiveType(activeType === type.name ? null : type.name)}
                        className={`p-6 rounded-3xl border-2 transition-all text-left flex items-start justify-between shadow-sm hover:shadow-lg ${
                            activeType === type.name 
                            ? `border-${type.color.split('-')[1]}-500 bg-white ring-4 ring-${type.color.split('-')[1]}-500/10` 
                            : 'border-transparent bg-white hover:border-slate-200'
                        }`}
                    >
                        <div>
                            <div className={`w-12 h-12 ${type.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-xl shadow-${type.color.split('-')[1]}-500/20`}>
                                <type.icon size={24} />
                            </div>
                            <h3 className="font-bold text-slate-900 text-lg">{type.name} Journeys</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{type.label}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-black text-slate-900">248</p>
                            <p className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">8 Active</p>
                        </div>
                    </button>
                ))}
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by Journey ID, Customer, or Location..." 
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-slate-300 shadow-sm"
                    />
                </div>
                <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 shadow-sm transition-all flex items-center gap-2 px-5">
                    <Filter size={18} /> Filters
                </button>
            </div>

            {/* Journey List */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredJourneys.map((journey, i) => (
                        <motion.div
                            key={journey.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white rounded-3xl border border-slate-200 p-6 hover:border-slate-300 transition-all shadow-sm hover:shadow-xl group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4">
                                <button className="p-2 text-slate-300 hover:text-slate-900 rounded-full hover:bg-slate-50">
                                    <MoreVertical size={18} />
                                </button>
                            </div>

                            <div className="flex items-start gap-5">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                                    journey.type === 'Delivery' ? 'bg-blue-50 text-blue-500' : 
                                    journey.type === 'Ritual' ? 'bg-orange-50 text-orange-500' : 'bg-purple-50 text-purple-500'
                                }`}>
                                    {journey.type === 'Delivery' ? <Truck size={28} /> : 
                                     journey.type === 'Ritual' ? <Sparkles size={28} /> : <Store size={28} />}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-bold text-slate-900 text-lg">{journey.id}</h3>
                                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                                            journey.priority === 'Critical' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                            {journey.priority}
                                        </span>
                                    </div>
                                    <p className="text-slate-500 text-sm font-medium mt-0.5">Customer: {journey.customer}</p>
                                    
                                    <div className="mt-6 space-y-4">
                                        {/* Progress Bar */}
                                        <div>
                                            <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                                                <span>Journey Progress</span>
                                                <span>{journey.progress}%</span>
                                            </div>
                                            <div className="h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
                                                <div 
                                                    className={`h-full rounded-full transition-all duration-1000 ${
                                                        journey.type === 'Delivery' ? 'bg-blue-500' : 
                                                        journey.type === 'Ritual' ? 'bg-[#FF9933]' : 'bg-purple-500'
                                                    }`} 
                                                    style={{ width: `${journey.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Milestones */}
                                        <div className="flex items-center gap-3 py-3 px-4 bg-slate-50 rounded-2xl border border-slate-100">
                                            <div className="flex-1">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Status</p>
                                                <p className="text-xs font-bold text-slate-900 mt-1">{journey.currentMilestone}</p>
                                            </div>
                                            <ChevronRight className="text-slate-300" size={16} />
                                            <div className="flex-1 text-right">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expectation</p>
                                                <p className="text-xs font-bold text-slate-900 mt-1">{journey.nextMilestone}</p>
                                            </div>
                                        </div>

                                        {/* Location & ETA */}
                                        <div className="flex items-center justify-between text-xs font-bold text-slate-600 pt-2">
                                            <div className="flex items-center gap-2">
                                                <MapPin size={14} className="text-slate-400" />
                                                {journey.location}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock size={14} className="text-slate-400" />
                                                {journey.eta}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all">
                                <button className="text-xs font-bold text-slate-900 uppercase tracking-widest hover:underline">View Full Trace Logs</button>
                                <div className="flex items-center gap-2">
                                    <button className="px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-600 transition-all">Red Flag</button>
                                    <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-lg shadow-slate-900/10 transition-all">Update Status</button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
