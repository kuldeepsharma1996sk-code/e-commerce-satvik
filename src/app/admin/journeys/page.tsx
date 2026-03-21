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
  Activity,
  AlertCircle,
  HardHat,
  Monitor,
  CheckCircle2,
  Clock3
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
        priority: "High",
        slaStatus: "On Time"
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
        priority: "Medium",
        slaStatus: "On Time"
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
        priority: "Critical",
        slaStatus: "Delayed"
    },
    { 
        id: "PRJ-VMX-101", 
        type: "Project", 
        customer: "ZEISS Experience Center", 
        status: "Fabrication", 
        progress: 35, 
        currentMilestone: "Material Sourcing", 
        nextMilestone: "Assembly",
        location: "Bangalore Factory",
        eta: "4 Days Left",
        priority: "Critical",
        slaStatus: "Overdue",
        stageGates: ["Recce", "Design", "Fabrication", "Installation", "Audit"]
    },
];

const journeyTypes = [
    { name: "Delivery", icon: Truck, color: "bg-blue-500", label: "Logistics" },
    { name: "Ritual", icon: Sparkles, color: "bg-[#FF9933]", label: "User Lifecycle" },
    { name: "Retail", icon: Store, color: "bg-purple-500", label: "Site Progress" },
    { name: "Project", icon: HardHat, color: "bg-red-500", label: "VMX Stage-Gate" },
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
                    <p className="text-slate-500 text-sm mt-1">Control Tower for Delivery, Rituals, and VMX Project Stage-Gates.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2 text-sm italic">
                        <Layers size={18} /> Map Overlay
                    </button>
                    <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2 text-sm">
                        <Activity size={18} /> TAT Analytics
                    </button>
                </div>
            </div>

            {/* View Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {journeyTypes.map((type) => (
                    <button
                        key={type.name}
                        onClick={() => setActiveType(activeType === type.name ? null : type.name)}
                        className={`p-6 rounded-3xl border-2 transition-all text-left flex items-start justify-between shadow-sm hover:shadow-lg ${
                            activeType === type.name 
                            ? `border-${type.color.split('-')[1]}-500 bg-white ring-4 ring-${type.color.split('-')[1]}-500/10` 
                            : 'border-transparent bg-white hover:border-slate-200 uppercase'
                        }`}
                    >
                        <div>
                            <div className={`w-12 h-12 ${type.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-xl shadow-${type.color.split('-')[1]}-500/20`}>
                                <type.icon size={24} />
                            </div>
                            <h3 className="font-bold text-slate-900 text-lg leading-none">{type.name}</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{type.label}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-black text-slate-900">12</p>
                            <p className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full mt-1 uppercase tracking-tighter">Active</p>
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
                        placeholder="Search by ID, Customer, or Warehouse Location..." 
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-slate-300 shadow-sm"
                    />
                </div>
                <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 shadow-sm transition-all flex items-center gap-2 px-5 font-bold text-xs uppercase">
                    <Filter size={18} /> Filter Layers
                </button>
            </div>

            {/* Journey Cards */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-20">
                <AnimatePresence mode="popLayout">
                    {filteredJourneys.map((journey, i) => (
                        <motion.div
                            key={journey.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            layout
                            className="bg-white rounded-3xl border border-slate-200 p-8 hover:border-slate-300 transition-all shadow-sm group hover:shadow-2xl relative overflow-hidden"
                        >
                            {/* SLA Alert Badge */}
                            <div className="absolute top-0 right-0 p-6">
                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${
                                    journey.slaStatus === 'Overdue' ? 'bg-red-50 text-red-500 border-red-100 animate-pulse' :
                                    journey.slaStatus === 'Delayed' ? 'bg-orange-50 text-orange-500 border-orange-100' :
                                    'bg-emerald-50 text-emerald-600 border-emerald-100'
                                }`}>
                                    <Clock3 size={12} strokeWidth={3} />
                                    {journey.slaStatus}
                                </div>
                            </div>

                            <div className="flex items-start gap-8">
                                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                                    journey.type === 'Delivery' ? 'bg-blue-50 text-blue-500' : 
                                    journey.type === 'Ritual' ? 'bg-[#FF9933]/10 text-[#FF9933]' : 
                                    journey.type === 'Retail' ? 'bg-purple-50 text-purple-500' : 'bg-red-50 text-red-500'
                                }`}>
                                    {journey.type === 'Delivery' ? <Truck size={40} /> : 
                                     journey.type === 'Ritual' ? <Sparkles size={40} /> : 
                                     journey.type === 'Retail' ? <Store size={40} /> : <HardHat size={40} />}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-4">
                                        <h3 className="font-black text-slate-900 text-xl tracking-tight">{journey.id}</h3>
                                        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                                            journey.priority === 'Critical' ? 'bg-red-900 text-white' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                            {journey.priority}
                                        </span>
                                    </div>
                                    <p className="text-slate-500 text-sm font-bold mt-1">{journey.customer}</p>
                                    
                                    {/* Project Stage-Gates (Visible for Project Type) */}
                                    {journey.type === 'Project' && (
                                        <div className="mt-8">
                                            <div className="flex items-center justify-between mb-4">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stage-Gate Tracking (VMX PRO)</p>
                                                <p className="text-[10px] font-black text-[#FF9933] uppercase">SLA: 48hrs/Gate</p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {journey.stageGates?.map((stage, idx) => (
                                                    <div key={stage} className="flex-1 flex flex-col items-center gap-2">
                                                        <div className={`w-full h-1.5 rounded-full ${
                                                            idx < 2 ? 'bg-emerald-400' : idx === 2 ? 'bg-orange-400 animate-pulse' : 'bg-slate-100'
                                                        }`}></div>
                                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter truncate w-full text-center">{stage}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Standard Progress Bar (Hidden if Project for cleaner look) */}
                                    {journey.type !== 'Project' && (
                                        <div className="mt-8 space-y-4">
                                            <div>
                                                <div className="flex justify-between text-[10px] font-black text-slate-900 uppercase tracking-widest mb-2 leading-none">
                                                    <span>Journey Momentum</span>
                                                    <span>{journey.progress}%</span>
                                                </div>
                                                <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200 mt-2">
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${journey.progress}%` }}
                                                        className={`h-full rounded-full ${
                                                            journey.type === 'Delivery' ? 'bg-blue-500' : 
                                                            journey.type === 'Ritual' ? 'bg-[#FF9933]' : 'bg-purple-500'
                                                        }`} 
                                                    ></motion.div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Real-time Status Box */}
                                    <div className="mt-8 flex items-center gap-4 py-4 px-6 bg-slate-50/50 rounded-[2rem] border border-slate-100">
                                        <div className="flex-1">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active State</p>
                                            <p className="text-sm font-black text-slate-900 mt-1">{journey.currentMilestone}</p>
                                        </div>
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-300">
                                            <ChevronRight size={24} />
                                        </div>
                                        <div className="flex-1 text-right">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Next Target</p>
                                            <p className="text-sm font-black text-slate-900 mt-1">{journey.nextMilestone}</p>
                                        </div>
                                    </div>

                                    {/* Location & TAT */}
                                    <div className="flex items-center justify-between mt-6">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <MapPin size={16} className="text-slate-900" />
                                            {journey.location}
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <Clock size={16} className="text-[#FF9933]" />
                                            TAT: {journey.eta}
                                        </div>
                                    </div>

                                    {/* Action Console */}
                                    <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                        <button className="text-[10px] font-black text-slate-900 uppercase tracking-widest hover:underline flex items-center gap-2">
                                            <Monitor size={14} /> Full Telemetry Audit
                                        </button>
                                        <div className="flex items-center gap-3">
                                            <button className="px-5 py-2.5 bg-red-50 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-all">Flag SLA Breach</button>
                                            <button className="px-5 py-2.5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-105 transition-all">Update Gate</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
