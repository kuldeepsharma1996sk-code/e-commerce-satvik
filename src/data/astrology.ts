export interface DailyRemedy {
    id: string;
    title: string;
    content: string;
    benefitCategory: "Prosperity" | "Health" | "Peace" | "Protection" | "Wisdom";
    date: string;
    imageUrl?: string;
    isActive: boolean;
}

export interface PanchangData {
    tithi: string;
    nakshatra: string;
    yoga: string;
    karana: string;
    abhijitMuhurat: string;
    sunrise: string;
    sunset: string;
    moonrise: string;
    rahukaal: string;
    location: string;
    isAuspicious: boolean;
    auspiciousMessage?: string;
}

export interface RashiPrediction {
    rashi: string;
    rashiHindi: string;
    symbol: string;
    prediction: string;
    luckyNumber: number;
    luckyColor: string;
    luckyTime: string;
}

export const todaysRemedy: DailyRemedy = {
    id: "remedy-1",
    title: "Surya Arghya at Sunrise",
    content:
        "Offer water to the rising sun (Surya Dev) using a copper vessel. Stand facing east, fill the lota with water, and pour it in a continuous stream while chanting the Gayatri Mantra. This practice activates solar energy in the body and attracts abundance.",
    benefitCategory: "Prosperity",
    date: new Date().toISOString().split("T")[0],
    isActive: true,
};

export const todaysPanchang: PanchangData = {
    tithi: "Shukla Ekadashi",
    nakshatra: "Rohini",
    yoga: "Siddhi",
    karana: "Bava",
    abhijitMuhurat: "11:45 AM - 12:30 PM",
    sunrise: "06:42 AM",
    sunset: "06:15 PM",
    moonrise: "03:22 PM",
    rahukaal: "10:30 AM - 12:00 PM",
    location: "New Delhi, IN",
    isAuspicious: true,
    auspiciousMessage:
        "Ekadashi is a divine time to bring home a new Idol. Explore the collection.",
};

export const rashiPredictions: RashiPrediction[] = [
    {
        rashi: "Mesha",
        rashiHindi: "मेष",
        symbol: "♈",
        prediction:
            "A day of new beginnings. Financial gains are indicated after noon. Chant Hanuman Chalisa for enhanced courage.",
        luckyNumber: 9,
        luckyColor: "Red",
        luckyTime: "2:00 PM - 4:00 PM",
    },
    {
        rashi: "Vrishabha",
        rashiHindi: "वृषभ",
        symbol: "♉",
        prediction:
            "Focus on domestic harmony. A minor disagreement can be resolved with patience. Offer white flowers to Shiva.",
        luckyNumber: 6,
        luckyColor: "White",
        luckyTime: "10:00 AM - 12:00 PM",
    },
    {
        rashi: "Mithuna",
        rashiHindi: "मिथुन",
        symbol: "♊",
        prediction:
            "Communication is your strength today. Good day for negotiations and learning. Light a ghee diya in the evening.",
        luckyNumber: 5,
        luckyColor: "Green",
        luckyTime: "5:00 PM - 7:00 PM",
    },
    {
        rashi: "Karka",
        rashiHindi: "कर्क",
        symbol: "♋",
        prediction:
            "Emotional clarity comes through meditation. Prioritize self-care. Offer milk to the Shivalinga for mental peace.",
        luckyNumber: 2,
        luckyColor: "Silver",
        luckyTime: "6:00 AM - 8:00 AM",
    },
    {
        rashi: "Simha",
        rashiHindi: "सिंह",
        symbol: "♌",
        prediction:
            "Leadership opportunities arise. Assert yourself with confidence. Recite the Aditya Hridayam Stotram for solar blessings.",
        luckyNumber: 1,
        luckyColor: "Gold",
        luckyTime: "12:00 PM - 2:00 PM",
    },
    {
        rashi: "Kanya",
        rashiHindi: "कन्या",
        symbol: "♍",
        prediction:
            "Attention to detail pays off today. Good day for organizing and planning. Offer green moong to a temple.",
        luckyNumber: 3,
        luckyColor: "Green",
        luckyTime: "3:00 PM - 5:00 PM",
    },
    {
        rashi: "Tula",
        rashiHindi: "तुला",
        symbol: "♎",
        prediction:
            "Balance in relationships is key. Social activities are favored. Light a sandalwood incense for harmony.",
        luckyNumber: 6,
        luckyColor: "Blue",
        luckyTime: "4:00 PM - 6:00 PM",
    },
    {
        rashi: "Vrishchika",
        rashiHindi: "वृश्चिक",
        symbol: "♏",
        prediction:
            "Transformation is in the air. let go of old patterns. Chant the Maha Mrityunjaya Mantra for renewal and protection.",
        luckyNumber: 8,
        luckyColor: "Maroon",
        luckyTime: "8:00 PM - 10:00 PM",
    },
    {
        rashi: "Dhanu",
        rashiHindi: "धनु",
        symbol: "♐",
        prediction:
            "Expansion and learning are highlighted. Travel plans may materialize. Offer bananas at a Vishnu temple for blessings.",
        luckyNumber: 3,
        luckyColor: "Yellow",
        luckyTime: "9:00 AM - 11:00 AM",
    },
    {
        rashi: "Makara",
        rashiHindi: "मकर",
        symbol: "♑",
        prediction:
            "Hard work bears fruit. Professional recognition is on the horizon. Feed sesame seeds to birds for Saturn's grace.",
        luckyNumber: 8,
        luckyColor: "Black",
        luckyTime: "7:00 AM - 9:00 AM",
    },
    {
        rashi: "Kumbha",
        rashiHindi: "कुम्भ",
        symbol: "♒",
        prediction:
            "Innovation and unconventional thinking are your allies. Network actively. Donate to charity for Shani Dev's blessings.",
        luckyNumber: 4,
        luckyColor: "Blue",
        luckyTime: "11:00 AM - 1:00 PM",
    },
    {
        rashi: "Meena",
        rashiHindi: "मीन",
        symbol: "♓",
        prediction:
            "Intuition is heightened. Trust your inner voice. Offer yellow flowers to Lord Vishnu and wear a moonstone for enhanced spiritual clarity.",
        luckyNumber: 7,
        luckyColor: "Yellow",
        luckyTime: "6:00 PM - 8:00 PM",
    },
];
