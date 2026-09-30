import type { CowVariant } from "@/components/Cow";

export type OtherThing = {
  slug: string;
  title: string;
  description: string;
  variant: CowVariant;
  repoUrl: string;
  repoPrivate: boolean;
  tools: string[];
};

export const otherThings: OtherThing[] = [
  {
    slug: "book-club-tracker",
    title: "Book Club Tracker",
    description:
      "A password-protected site for a book club to track meetings, book recommendations, ranked voting on the next pick, reviews, and ratings — built as an immersive reading experience rather than a typical admin dashboard. It pulls book details automatically from the Open Library API and supports multiple independent clubs from one deployment.",
    variant: "book",
    repoUrl: "https://github.com/Laumillerren/bookclub_tracker",
    repoPrivate: true,
    tools: ["Next.js", "Prisma", "Framer Motion", "Vercel Blob"],
  },
  {
    slug: "yoga-tracker",
    title: "Yoga Tracker",
    description:
      "A teaching-hours tracker built for a small group of Philadelphia yoga teachers, replacing the usual personal spreadsheet. It scrapes class schedules directly from the studio booking platforms teachers already use so they can confirm hours with one click, and also tracks continuing education requirements and renewal deadlines.",
    variant: "yoga",
    repoUrl: "https://github.com/Laumillerren/philly-yoga-platform",
    repoPrivate: true,
    tools: ["Next.js", "Supabase", "Python", "Leaflet", "Recharts"],
  },
  {
    slug: "quilt-portfolio",
    title: "Quilt Portfolio",
    description:
      "A Next.js site that catalogs quilting projects with a Google Sheets backend, admin editing, photo galleries with a lightbox, and technique filtering.",
    variant: "quilt",
    repoUrl: "https://github.com/Laumillerren/quilting_portfolio",
    repoPrivate: false,
    tools: ["Next.js", "Google Sheets", "GSAP", "Framer Motion"],
  },
  {
    slug: "basketball-stats",
    title: "Basketball Stats",
    description: "A basketball statistics website.",
    variant: "basketball",
    repoUrl: "https://github.com/Laumillerren/penn_basketball_website",
    repoPrivate: true,
    tools: [],
  },
  {
    slug: "experiments",
    title: "Experiments",
    description:
      "A collection of smaller personal projects exploring different tools, techniques, and datasets.",
    variant: "spark",
    repoUrl: "https://github.com/Laumillerren/Personal_Projects_LMiller",
    repoPrivate: false,
    tools: ["Python"],
  },
  {
    slug: "wastewise",
    title: "WasteWise",
    description:
      "An image dataset and machine learning model that classifies waste into recyclable, non-recyclable, and compostable categories, built from images pulled from Google, the TrashNet dataset, a drinking-waste dataset, and the TACO litter dataset.",
    variant: "data",
    repoUrl: "https://github.com/Laumillerren/WasteWise",
    repoPrivate: false,
    tools: ["Python"],
  },
  {
    slug: "ecommerce-analysis",
    title: "Ecommerce Analysis",
    description:
      "A sales-forecasting project using five years of daily Walmart sales data across California, Texas, and Wisconsin (the M5 Kaggle competition dataset), comparing Linear Regression, Random Forest, and XGBoost models.",
    variant: "spark",
    repoUrl: "https://github.com/Laumillerren/Ecommerce_Analysis",
    repoPrivate: false,
    tools: ["Python", "R", "XGBoost"],
  },
  {
    slug: "bookworm-recommender",
    title: "Bookworm Recommender",
    description:
      "A book recommender system built on the Goodreads interactions dataset, using TF-IDF and cosine similarity to recommend titles based on content similarity.",
    variant: "book",
    repoUrl: "https://github.com/Laumillerren/Bookworm_Recommender",
    repoPrivate: true,
    tools: ["Python", "TF-IDF", "Cosine Similarity"],
  },
  {
    slug: "histology-classification",
    title: "Histology Classification",
    description:
      "A histology image classification project comparing several machine learning methods, completed with a classmate during a Master's in Data Science at Drexel University.",
    variant: "data",
    repoUrl: "https://github.com/Laumillerren/Histology_Classification_Project",
    repoPrivate: false,
    tools: ["Python"],
  },
];

export function getOtherThing(slug: string) {
  return otherThings.find((o) => o.slug === slug);
}
