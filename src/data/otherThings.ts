import type { CowVariant } from "@/components/Cow";

export type OtherThing = {
  slug: string;
  title: string;
  description: string;
  variant: CowVariant;
  repoUrl: string;
  repoPrivate: boolean;
  tools: string[];
  mediumUrl?: string;
  wip?: boolean;
  // Optional short write-up shown on the project page. Each field is a list
  // of paragraphs.
  // Alternative to `post` for a collection of small projects: one block each.
  experiments?: {
    title: string;
    tools: string[];
    paragraphs: string[];
  }[];
  post?: {
    objectives: string[];
    engineering: string[];
    science: string[];
    takeaways?: string[];
  };
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
      "A teaching-hours tracker for a small group of Philadelphia yoga teachers, replacing the personal spreadsheet most teachers keep. A daily job scrapes class schedules from the public endpoints behind studio booking widgets like Momence and Walla, then matches classes to teachers — accounting for substitutes, cancellations, and in-person/livestream duplicates — so each class can be confirmed exactly once after it ends. Teachers can also import existing spreadsheets, export to CSV, and track progress toward Yoga Alliance continuing-education renewals.",
    variant: "yoga",
    repoUrl: "https://github.com/Laumillerren/philly-yoga-platform",
    repoPrivate: true,
    tools: ["Next.js", "Supabase", "Python", "Leaflet", "Recharts"],
    mediumUrl:
      "https://medium.com/@laurenthemiller/scraping-the-schedule-how-i-built-teaching-hours-tracker-for-yoga-teachers-9514dc1dde6b",
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
    wip: true,
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
    tools: ["Python", "pandas", "scikit-learn", "RDKit", "ChEMBL API", "seaborn"],
    experiments: [
      {
        title: "Drug discovery: SARS coronavirus",
        tools: ["ChEMBL API", "RDKit", "SciPy"],
        paragraphs: [
          "Which molecular properties separate compounds that inhibit the SARS coronavirus 3C-like protease (an enzyme the virus needs to replicate) from those that don't? I pulled every IC50 measurement for that target from ChEMBL through its Python API and dropped records missing a value or a structure. That left 133 compounds: 15 active (IC50 under 1,000 nM), 103 inactive (over 10,000 nM), and 15 in between.",
          "I converted IC50 to pIC50 and computed Lipinski's rule-of-five descriptors with RDKit. Mann–Whitney U tests found that molecular weight and hydrogen-bond donors and acceptors differed significantly between actives and inactives, but LogP did not. With only 15 actives, it's a small sample, so the results are a starting point rather than a conclusion.",
        ],
      },
      {
        title: "Drug discovery: acetylcholinesterase",
        tools: ["ChEMBL API", "RDKit", "SciPy"],
        paragraphs: [
          "The same pipeline, run on a much larger target: acetylcholinesterase, the enzyme that breaks down the neurotransmitter acetylcholine and a target for Alzheimer's drugs. ChEMBL returned 6,157 curated compounds (2,608 active, 2,012 inactive, and 1,537 intermediate), with each stage written to CSV so it could be rerun and inspected.",
          "This time all four Lipinski descriptors (molecular weight, LogP, and hydrogen-bond donors and acceptors) differed significantly between actives and inactives. Running one reusable pipeline on two targets showed how much the conclusions depend on how much data there is.",
        ],
      },
      {
        title: "Movie budgets and box office",
        tools: ["pandas", "seaborn"],
        paragraphs: [
          "What actually predicts how much a movie earns? The dataset covers 7,668 films released between 1980 and 2020, with budget, gross, votes, rating score, runtime, genre, and studio. Cleaning came first: the year column often disagreed with the actual release date, so I rebuilt it from the release string. I also encoded text fields like studio and director as numbers so they could go into the correlation matrix.",
          "Budget had the strongest relationship with gross (r = 0.74), followed by number of votes (0.61). A film's score was barely related to its budget (0.07). Spending more buys box office, not better reviews.",
        ],
      },
      {
        title: "Red wine quality",
        tools: ["pandas", "seaborn"],
        paragraphs: [
          "The data covers 1,599 Portuguese Vinho Verde red wines, each with 11 chemical measurements (acidity, residual sugar, sulphates, alcohol, and more) and a quality score from tasters. There's no grape type, brand, or price, just chemistry.",
          "After confirming nothing was missing, I split the wines into \"good\" (quality above 6.5) and the rest, which left 217 good wines, about 14%. I then compared each chemical property's distribution across the two groups, and used a correlation heatmap and pair plots to see which properties move with quality and with each other.",
        ],
      },
      {
        title: "Random forests: diabetes and iris",
        tools: ["scikit-learn"],
        paragraphs: [
          "Practice building random forest models from start to finish. The diabetes dataset (768 patients, from the National Institute of Diabetes and Digestive and Kidney Diseases) needed cleaning first. Zeros in glucose, blood pressure, skin thickness, insulin, and BMI are physically impossible, so I treated them as missing and filled them with each column's mean.",
          "With an 80/20 split, the model reached 73% accuracy and 64% precision on 154 held-out patients, and feature importance ranked glucose first, followed by BMI. The iris notebook runs the same workflow on a cleaner dataset, where petal width and length were the most important features.",
        ],
      },
    ],
  },
  {
    slug: "wastewise",
    title: "WasteWise",
    description:
      "An image dataset and machine learning model that classifies waste into recyclable, non-recyclable, and compostable categories, built from images pulled from Google, the TrashNet dataset, a drinking-waste dataset, and the TACO litter dataset.",
    variant: "data",
    repoUrl: "https://github.com/Laumillerren/WasteWise",
    repoPrivate: false,
    tools: ["Python", "PyTorch", "Pillow", "Google Custom Search API", "Hugging Face"],
    post: {
      objectives: [
        "Standing at a bin, most people just want to know: does this go in recycling, compost, or trash? Getting it wrong matters. A greasy pizza box or a plastic bag can contaminate a whole load of recycling. WasteWise aims to answer that question from a photo, so the labels match the decision a person actually makes: recyclable, non-recyclable, or compostable.",
      ],
      engineering: [
        "No existing dataset used those three labels, so the main job was building one. Images came from four sources: TrashNet (six material classes), a drinking-waste dataset (4,832 cans and bottles, all recyclable), the TACO litter dataset (1,530 photos from woods, roads, and beaches, with JSON annotations), and the Google Custom Search API. The free API tier allows 100 images a day, so collection ran daily in small batches by query: apple cores, tea bags, eggshells, styrofoam cups, cigarette butts.",
        "Each source's labels had to be remapped. TrashNet's material folders mapped neatly to recyclable or non-recyclable. TACO's 60 categories had to be mapped one by one: a metal bottle cap is recyclable but a plastic one isn't, a paper straw is compostable, and a pizza box is not recyclable. Every image then went through 14 augmentations (grayscale, rotations, flips, noise, blur, brightening and darkening, color inversion, posterize, solarize, and equalize). Finally, images were standardized to 224×224 tensors with ImageNet normalization and written to disk in parallel with a thread pool, ready to load for training.",
      ],
      science: [
        "Exploratory analysis surfaced a clear class imbalance. An early snapshot had 2,518 recyclable images, 1,022 compostable, and only 375 non-recyclable. Counting images by item type showed where coverage was thin: non-recyclables came from just four kinds of objects. That shaped what to collect next, and it's why augmentation matters here, since it multiplies the variety of each underrepresented item. The 224×224 ImageNet-normalized format is set up for fine-tuning a pretrained image model.",
      ],
      takeaways: [
        "The hardest part wasn't the images but the definitions. Whether something is recyclable depends on local infrastructure, so writing down explicit category rules (and applying them consistently across four datasets) was the real foundation of the project.",
      ],
    },
  },
  {
    slug: "ecommerce-analysis",
    title: "Ecommerce Analysis",
    description:
      "A sales-forecasting project using five years of daily Walmart sales data across California, Texas, and Wisconsin (the M5 Kaggle competition dataset), comparing Linear Regression, Random Forest, and XGBoost models.",
    variant: "spark",
    repoUrl: "https://github.com/Laumillerren/Ecommerce_Analysis",
    repoPrivate: false,
    tools: ["R", "tidyverse", "Random Forest", "XGBoost", "Python", "PyTorch Forecasting"],
    post: {
      objectives: [
        "For a retailer, a good demand forecast means the right amount of stock on the shelf: fewer empty shelves for customers, less money tied up in excess inventory, and better revenue planning. The goal was to predict daily unit sales for each state and department, which is detailed enough for a planner to act on and stable enough to model reliably.",
      ],
      engineering: [
        "The data comes from Walmart's M5 forecasting competition on Kaggle: daily unit sales from January 2011 to May 2016 across stores in California, Texas, and Wisconsin, organized as a hierarchy from state down to individual item. I aggregated the item-level sales to the M5's level 7 (state × department, 21 series) and joined in the calendar data: day of week, month, and 30 events and holidays, from the Super Bowl to Ramadan to Thanksgiving. That produced a 40,761-row modeling table. Event flags spread across several one-hot columns were consolidated into a single holiday field for analysis.",
      ],
      science: [
        "Exploratory analysis in R looked at sales by state and department, seasonality by month and year, and which holidays drove the most volume. For modeling, day of week and month were encoded cyclically with sine and cosine so the model knows December sits next to January. State, department, holiday, and weekday were one-hot encoded and the target was standardized.",
        "A linear regression served as the baseline, followed by a random forest and XGBoost, with a grid search over XGBoost's learning rate, tree depth, and number of rounds. Models were compared on MSE, RMSE, MAE, and R². The tree-based models captured nonlinear patterns the linear model missed, and the random forest was strong even with default settings. Separately, in Python, I trained a Temporal Fusion Transformer to forecast all 21 series together, scored with the competition's own metric (RMSSE = 1.19).",
      ],
      takeaways: [
        "If I revisited this, I'd evaluate the tree models with a time-based split (training on the past and testing on the future, as the M5 does) rather than a random split, so the scores reflect how the model would perform on genuinely unseen days.",
      ],
    },
  },
  {
    slug: "bookworm-recommender",
    title: "Bookworm Recommender",
    description:
      "A book recommender system built on the Goodreads interactions dataset, using TF-IDF and cosine similarity to recommend titles based on content similarity.",
    variant: "book",
    repoUrl: "https://github.com/Laumillerren/Bookworm_Recommender",
    repoPrivate: true,
    tools: ["Python", "pandas", "scikit-learn", "SciPy", "TF-IDF", "Cosine Similarity"],
    post: {
      objectives: [
        "Bestseller lists are the same for everyone. Bookworm aims to answer a more personal question: given the books I've loved, what are readers with similar taste loving next? It has two parts: a search that finds a book from a loosely typed title, and a recommender that turns a list of liked books into personalized picks with links and covers.",
      ],
      engineering: [
        "Goodreads closed its public API in 2020, so the project uses the UCSD Goodreads dataset scraped in 2017: a gzipped JSON file of book metadata and an interactions file with hundreds of millions of user–book ratings. Both are far too large to load at once, so everything streams line by line. The metadata pass keeps only the fields needed (ID, title, rating count, URL, cover image), drops books with 10 or fewer ratings, and normalizes titles (lowercase, punctuation stripped, whitespace collapsed) into a compact lookup table. A separate ID map joins the two files, which use different book ID schemes.",
      ],
      science: [
        "Search uses TF-IDF on the cleaned titles and cosine similarity to rank matches against the query, then orders the top 10 by popularity so the well-known edition wins.",
        "Recommendations use user-based collaborative filtering, starting from my own Goodreads export. I found the 532,737 users who had read at least one of my books, narrowed that to 384 who shared a meaningful share of them, and built a sparse 385 × 600,077 user–book ratings matrix (3.2 million ratings). Cosine similarity picks the 15 most similar readers, and their ratings are aggregated into a score. That score is adjusted by how often similar readers chose a book relative to its overall popularity, so niche favorites can beat mega-bestsellers. Books I've already read are removed, and a pick needs at least three similar readers and an average rating of 3 or higher.",
      ],
      takeaways: [
        "This is a proof of concept. The approach works, but scanning the full interactions file for every request is slow. The next step is precomputing and indexing the data so recommendations can be served interactively.",
      ],
    },
  },
  {
    slug: "histology-classification",
    title: "Histology Classification",
    description:
      "A histology image classification project comparing several machine learning methods, completed with a classmate during a Master's in Data Science at Drexel University.",
    variant: "data",
    repoUrl: "https://github.com/Laumillerren/Histology_Classification_Project",
    repoPrivate: false,
    tools: ["Python", "PyTorch", "XGBoost", "scikit-learn", "Hugging Face"],
    post: {
      objectives: [
        "Invasive ductal carcinoma (IDC) is the most common form of breast cancer. Before a pathologist can grade a tumor's aggressiveness, they first have to find the regions of IDC on a whole-slide image, which is slow and painstaking work. The goal, built with Luke Chesley, was a model that flags cancerous tissue patches automatically, to save pathologists time and make results more consistent.",
      ],
      engineering: [
        "The dataset is 277,524 image patches of 50×50 pixels, cut from 162 whole-slide breast cancer scans at 40× magnification and loaded through Hugging Face. A custom PyTorch dataset class filtered out patches that weren't exactly 50×50 (the cut-off pieces at slide edges), converted images to tensors, and produced train, validation, and test splits. The deep model consumed the tensors directly. For XGBoost the images were flattened into 7,500-value pixel vectors and packed into DMatrix format, and the SVM was trained on a subsample to keep it tractable.",
      ],
      science: [
        "The classes are imbalanced, about 72% negative to 28% positive, so accuracy alone is misleading. We compared three approaches on a 27,471-patch test set. The first was a DenseNet convolutional network (100 layers, about 766K parameters, trained for 4 epochs in roughly 50 minutes). The second was XGBoost on raw pixels, and the third an SVM.",
        "XGBoost had the highest accuracy (0.85), but it caught only 69% of cancerous patches. The DenseNet's accuracy was lower (0.82), but it caught 86% of them, at the cost of more false alarms (0.63 precision). The SVM reached 0.83 accuracy on a small 200-patch test. For a screening tool, missing cancer costs far more than double-checking a false positive, so the CNN's higher recall makes it the more useful model despite its lower accuracy.",
      ],
      takeaways: [
        "Choosing the metric was itself a design decision. Framing the problem around what a pathologist needs (catching the cancer) changed which model looked best.",
      ],
    },
  },
];

export function getOtherThing(slug: string) {
  return otherThings.find((o) => o.slug === slug);
}
