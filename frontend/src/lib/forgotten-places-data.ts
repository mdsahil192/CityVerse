export type PlaceCategory = "Historical" | "Demolished" | "Abandoned" | "Transformed" | "Lost";

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  image?: string;
}

export interface HistoricalPlace {
  id: string;
  name: string;
  city: string;
  coordinates: [number, number];
  category: PlaceCategory;
  startYear: number;
  endYear: number | null; // null if it still exists
  description: string;
  historicalSignificance: string;
  previousName?: string;
  currentPlace?: string; // what is there today
  historicalImages: string[];
  currentImages: string[];
  timelineEvents: TimelineEvent[];
  sources: string[];
}

export const forgottenPlaces: HistoricalPlace[] = [
  {
    id: "fp-1",
    name: "Rivoli Cinema",
    city: "New Delhi",
    coordinates: [28.6315, 77.2167],
    category: "Transformed",
    startYear: 1934,
    endYear: null,
    description: "One of the oldest single-screen theatres in Delhi, renowned for its art deco style and premiering major Hollywood releases.",
    historicalSignificance: "Rivoli was part of the original Connaught Place design, serving as an elite cultural hub for pre-independence and post-independence Delhi. It was later acquired and transformed by PVR, maintaining its legacy while updating its interiors.",
    currentPlace: "PVR Rivoli",
    historicalImages: [
      "https://images.unsplash.com/photo-1518063065487-7578768798bb?auto=format&fit=crop&q=80&w=1200&sat=-100", // Sepia/grayscale styled via CSS later
    ],
    currentImages: [
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=1200",
    ],
    timelineEvents: [
      {
        year: 1934,
        title: "Inception",
        description: "Rivoli Theatre opened its doors as a premier single-screen cinema.",
      },
      {
        year: 1947,
        title: "Post-Independence Era",
        description: "Became a popular spot for bureaucrats and the evolving middle class of independent India.",
      },
      {
        year: 2004,
        title: "The PVR Takeover",
        description: "PVR Cinemas acquired Rivoli, undertaking significant renovations while keeping the heritage façade intact.",
      },
      {
        year: 2026,
        title: "Modern Day",
        description: "Continues to operate as one of the few heritage cinemas integrated with modern screening technology.",
      }
    ],
    sources: ["Delhi Historical Archives", "PVR Heritage"]
  },
  {
    id: "fp-2",
    name: "Old Delhi Tramways",
    city: "New Delhi",
    coordinates: [28.6562, 77.2315],
    category: "Lost",
    startYear: 1908,
    endYear: 1963,
    description: "A network of electric trams that once navigated the bustling streets of Chandni Chowk and Old Delhi.",
    historicalSignificance: "The tramway was Delhi's first mass transit system, operating for over 50 years. It played a critical role in the daily life of Old Delhi before being phased out due to rising vehicular traffic.",
    currentPlace: "Chandni Chowk Pedestrian Zone",
    historicalImages: [
      "https://images.unsplash.com/photo-1506544777-626a58b299e9?auto=format&fit=crop&q=80&w=1200&sat=-100"
    ],
    currentImages: [
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=1200"
    ],
    timelineEvents: [
      {
        year: 1908,
        title: "First Tram",
        description: "The first tram line opened, connecting Jama Masjid, Chandni Chowk, and Fatehpuri.",
      },
      {
        year: 1921,
        title: "Expansion",
        description: "The network expanded to cover more areas of Shahjahanabad.",
      },
      {
        year: 1963,
        title: "Closure",
        description: "Due to increasing traffic congestion and the rise of buses, the tram system was officially closed.",
      }
    ],
    sources: ["Indian Railway Archives"]
  },
  {
    id: "fp-3",
    name: "Appu Ghar",
    city: "New Delhi",
    coordinates: [28.6219, 77.2415],
    category: "Demolished",
    startYear: 1984,
    endYear: 2008,
    description: "India's first and most beloved amusement park, named after the mascot of the 1982 Asian Games.",
    historicalSignificance: "For over two decades, Appu Ghar was synonymous with family entertainment in Delhi. It introduced rides like the Roller Coaster and Bumping Cars to an entire generation.",
    currentPlace: "Supreme Court Metro Station / Extension",
    historicalImages: [
      "https://images.unsplash.com/photo-1533036814981-d146db57fbb4?auto=format&fit=crop&q=80&w=1200&sat=-100"
    ],
    currentImages: [
      "https://images.unsplash.com/photo-1580227183610-d7a8e5762c20?auto=format&fit=crop&q=80&w=1200"
    ],
    timelineEvents: [
      {
        year: 1984,
        title: "Grand Opening",
        description: "Inaugurated by Prime Minister Rajiv Gandhi on November 19, 1984.",
      },
      {
        year: 1998,
        title: "Oysters Water Park",
        description: "Addition of a water park section, increasing its popularity during summers.",
      },
      {
        year: 2008,
        title: "Final Shutdown",
        description: "The park was closed and demolished to make way for the Delhi Metro expansion and the Supreme Court annexe.",
      }
    ],
    sources: ["Delhi Tourism"]
  },
  {
    id: "fp-4",
    name: "Safdarjung Airport (Commercial)",
    city: "New Delhi",
    coordinates: [28.5833, 77.2089],
    category: "Transformed",
    startYear: 1929,
    endYear: 1962,
    description: "Delhi's first airport, previously known as Willingdon Airfield, serving as the main hub until Palam Airport took over.",
    historicalSignificance: "It was the only airport in Delhi until 1962. It played a significant role during World War II and the partition of India. Today it is used only for VVIP helicopter flights.",
    currentPlace: "Safdarjung Flying Club / VVIP Heliport",
    historicalImages: [
      "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&q=80&w=1200&sat=-100"
    ],
    currentImages: [
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200"
    ],
    timelineEvents: [
      {
        year: 1929,
        title: "Establishment",
        description: "Founded as Willingdon Airfield, the first airport in Delhi.",
      },
      {
        year: 1947,
        title: "Partition Flights",
        description: "Served as a crucial hub for refugee flights during the partition.",
      },
      {
        year: 1962,
        title: "Commercial Operations Shift",
        description: "Commercial flights were moved to the new Palam Airport (now IGI) due to larger aircraft requirements.",
      }
    ],
    sources: ["Aviation History Society of India"]
  },
  {
    id: "fp-5",
    name: "Mehrauli Cotton Mills",
    city: "New Delhi",
    coordinates: [28.5204, 77.1818],
    category: "Abandoned",
    startYear: 1912,
    endYear: 1985,
    description: "An early 20th-century textile mill that once employed hundreds of workers before falling into ruin.",
    historicalSignificance: "Represented the early industrialization of Delhi outside the walled city. The ruins now stand in stark contrast to the surrounding historical monuments of Mehrauli.",
    currentPlace: "Abandoned Ruins near Qutub Complex",
    historicalImages: [
      "https://images.unsplash.com/photo-1568285526019-2166e44b94f6?auto=format&fit=crop&q=80&w=1200&sat=-100"
    ],
    currentImages: [
      "https://images.unsplash.com/photo-1518599904199-0ca897819ddb?auto=format&fit=crop&q=80&w=1200"
    ],
    timelineEvents: [
      {
        year: 1912,
        title: "Foundation",
        description: "Built during the British era to process cotton from surrounding agrarian regions.",
      },
      {
        year: 1950,
        title: "Peak Production",
        description: "The mill employed over 500 workers and ran round-the-clock.",
      },
      {
        year: 1985,
        title: "Closure",
        description: "Shut down due to labor strikes and outdated machinery. Left abandoned.",
      }
    ],
    sources: ["Industrial Heritage India"]
  }
];
