export const UAEStates = {
    "ae-du": "Dubai",
    "ae-sh": "Sharjah",
    "ae-az": "Abu Dhabi",
    "ae-rk": "Ras Al Khaimah",
    "ae-aj": "Ajman",
    "ae-uq": "Umm Al-Quwain",
    "ae-fu": "Fujairah",
};

export const orderStatuses = {
    'REQUESTED': { group: "processing", bg: "#94a3b8", text: "#ffff" },
    'ASSIGNED': { group: "processing", bg: "#94a3b8", text: "#ffff" },
    'PICKED UP': { group: "shipped", bg: "#facc15", text: "#808080" },
    'AT DEPOT': { group: "shipped", bg: "#facc15", text: "#808080" },
    'DELIVERING': { group: "delivering", bg: "#f97316", text: "#ffff" },
    "DELIVERED": { group: "delivered", bg: "#4ade80", text: "#ffff" },
    "ATTEMPTED": { group: "attempted", bg: "#fef08a", text: "#808080" },
    "CANCELLED": { group: "cancelled", bg: "#dc2626", text: "#ffff" },
    "RTO INITIATED": { group: "cancelled", bg: "#2dd4bf", text: "#ffff" },
    "RTO ASSIGNED": { group: "cancelled", bg: "#2dd4bf", text: "#ffff" },
    "RTO PICKED UP": { group: "cancelled", bg: "#14b8a6", text: "#ffff" },
    "RTO COMPLETE": { group: "cancelled", bg: "#06b6d4", text: "#ffff" },
    "RTN REQUESTED": { group: "cancelled", bg: "#2dd4bf", text: "#ffff" },
    "RTN ASSIGNED": { group: "cancelled", bg: "#2dd4bf", text: "#ffff" },
    "RTN PICKED UP": { group: "cancelled", bg: "#14b8a6", text: "#ffff" },
    "RTN COMPLETE": { group: "cancelled", bg: "#06b6d4", text: "#ffff" }
};