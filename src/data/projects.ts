import { Project } from "@/types";

// Cover images: expected at /public/images/projects/{slug}-cover.jpg (1600x1000, 16:10)
// Screenshots: expected at /public/images/projects/{slug}-01.jpg, -02.jpg, ... (1600x1000)
// Until real assets are added, the UI falls back to a generated placeholder panel.

export const projects: Project[] = [
  {
    slug: "ecotrace",
    name: "EcoTrace",
    fullTitle: "EcoTrace: Intelligent Electronic Waste Recovery and Circular Economy Management System",
    shortDescription:
      "A mobile and backend system for scheduling e-waste pickups, tracking recovery, and coordinating collectors, recyclers, and households around a circular-economy workflow.",
    categories: ["AI/ML", "Mobile", "Full Stack"],
    stack: [
      "Flutter",
      "Dart",
      "Python",
      "FastAPI",
      "Firebase Authentication",
      "Cloud Firestore",
      "Firebase Cloud Messaging",
      "Cloudinary",
      "Google Maps Platform",
      "Render",
    ],
    status: "Completed",
    year: "2026",
    featured: true,
    coverImage: "/images/projects/ecotrace-cover.png",
    screenshots: [],
    links: {
      github: "https://github.com/EcoTraces/Ecotrace-SRS-Document",
      demo: "https://wastemanagementsystem-902eb.web.app/",
    },
    caseStudy: {
      overview:
        "EcoTrace is a flagship project built around a practical problem: electronic waste in growing urban areas rarely gets recovered in a structured way. The system connects households and businesses that need to dispose of e-waste with collectors and recyclers, using scheduling, classification, and tracking to keep the process organized.",
      problem:
        "Electronic waste is one of the fastest-growing waste streams, but in many regions there is no structured pipeline connecting people who have e-waste with the collectors and recyclers who can process it responsibly. Pickup requests, classification, and reporting are handled informally or not at all.",
      motivation:
        "Building a system that treats e-waste recovery as a logistics and data problem — not just an environmental slogan — was the motivation: give every stakeholder (household, collector, recycler, administrator) a clear role and a clear view of where an item is in the recovery process.",
      solution:
        "A Flutter mobile app for requesting and tracking pickups, paired with a FastAPI backend and Firebase services for authentication, real-time data, and notifications. AI-assisted classification helps categorize e-waste, and Google Maps Platform handles location and route-related functionality for pickup logistics.",
      keyFeatures: [
        "Role-based access for households, collectors, recyclers, and administrators",
        "AI-assisted e-waste classification to help categorize items during intake",
        "Pickup scheduling and collection management workflow",
        "Location and route functionality for collectors using Google Maps Platform",
        "Push notifications via Firebase Cloud Messaging for pickup and status updates",
        "Environmental and recovery reporting for tracking progress over time",
      ],
      architecture:
        "Flutter client communicating with a FastAPI backend deployed on Render; Cloud Firestore as the primary real-time data store; Firebase Authentication for identity and role management; Cloudinary for image storage; Google Maps Platform for geolocation and routing.",
      process: [
        "Defined stakeholder roles and the recovery workflow before writing code",
        "Built the data model in Cloud Firestore around pickup requests and item status",
        "Implemented the FastAPI service layer and connected it to the Flutter client",
        "Added AI-assisted classification and map-based logistics features",
      ],
      challenges: [
        {
          challenge: "Coordinating role-based permissions across households, collectors, recyclers, and admins.",
          solution:
            "Modeled roles explicitly in the data layer and enforced access rules at both the client and API level rather than relying on UI restrictions alone.",
        },
      ],
      technicalDecisions: [
        "Chose Flutter for a single codebase across mobile platforms given the target users' device diversity.",
        "Used Firebase for authentication and real-time data to reduce backend complexity while keeping FastAPI for custom business logic and AI integration.",
      ],
      lessonsLearned:
        "TODO — add reflections on what this project taught you technically and practically.",
    },
  },
  {
    slug: "scholarsphere",
    name: "ScholarSphere",
    fullTitle: "ScholarSphere – Global Scholarship & Opportunity Platform",
    shortDescription:
      "An opportunity-discovery platform that aggregates and verifies scholarships, fellowships, internships, and grants, and matches them to student profiles.",
    categories: ["Web", "Full Stack"],
    stack: ["React", "Node.js", "Express", "Firebase"],
    status: "In Progress",
    year: "2026",
    featured: true,
    coverImage: "/images/projects/scholarsphere-cover.jpg",
    screenshots: [],
    links: {
      github: "https://github.com/EcoTraces/scholarsphere",
      demo: undefined,
    },
    caseStudy: {
      overview:
        "ScholarSphere helps students, graduates, researchers, and young professionals find scholarships, fellowships, internships, conferences, grants, summits, webinars, and training opportunities in one place, instead of across dozens of scattered sources.",
      problem:
        "Opportunity information is fragmented across mailing lists, social media, and individual organization websites. Verifying legitimacy and tracking deadlines is manual and error-prone, and many eligible candidates miss opportunities simply because they never see them.",
      motivation:
        "Give students and early-career professionals — particularly in contexts with less institutional access to this information — a single, verified, personalized source for opportunity discovery.",
      solution:
        "A platform that aggregates opportunities, applies a verification step against source legitimacy, evaluates eligibility against a user's profile, and sends deadline notifications, with multi-role administration for managing the underlying data.",
      keyFeatures: [
        "Opportunity aggregation across multiple categories (scholarships, fellowships, internships, conferences, grants, summits, webinars, training)",
        "Source verification workflow to reduce the spread of unverified or fraudulent listings",
        "Eligibility evaluation matched against a user profile",
        "Personalized recommendations",
        "Application tracking and deadline notifications",
        "Multi-role administration for content and platform management",
      ],
      architecture:
        "React frontend, Node.js/Express backend API, with Firebase providing authentication and data services.",
      process: [
        "Mapped opportunity categories and the data fields needed for verification and eligibility matching",
        "Built the aggregation and verification workflow before layering on recommendations",
        "Implemented the admin layer for ongoing content management",
      ],
      challenges: [
        {
          challenge: "Balancing opportunity coverage with verification quality.",
          solution:
            "Built a verification step into the aggregation pipeline rather than treating it as a manual afterthought, so unverified listings don't reach users by default.",
        },
      ],
      technicalDecisions: [
        "Used Express to keep the API layer explicit and framework-light while the platform's data model was still evolving.",
      ],
      lessonsLearned: "TODO — add reflections on what this project taught you technically and practically.",
    },
  },
  {
    slug: "agri-pest-disease-detection",
    name: "Agriculture Pest & Disease Detection",
    fullTitle: "Agriculture Pest & Disease Detection System",
    shortDescription:
      "A mobile computer-vision tool that helps farmers identify plant diseases and pests from photos and provides agricultural recommendations.",
    categories: ["AI/ML", "Mobile"],
    stack: ["Flutter", "Firebase", "Computer Vision"],
    status: "In Progress",
    year: "2026",
    featured: true,
    coverImage: "/images/projects/agri-pest-disease-detection-cover.jpg",
    screenshots: [],
    links: {
      github: undefined,
      demo: undefined,
    },
    caseStudy: {
      overview:
        "A Flutter application that uses computer vision to help farmers identify plant diseases and pests from photographs, paired with agricultural recommendations and basic farm management tools.",
      problem:
        "Smallholder farmers often lack timely access to agronomists, so pest and disease problems can go unidentified until crop damage is significant.",
      motivation:
        "Put a first-line diagnostic tool directly in farmers' hands using a device they already carry — a phone camera — to shorten the time between noticing a problem and acting on it.",
      solution:
        "A mobile app where users photograph affected crops; a computer-vision component identifies likely pests or diseases and surfaces relevant recommendations, backed by Firebase for data and account management.",
      keyFeatures: [
        "Photo-based plant disease detection",
        "Pest identification",
        "Agricultural recommendations based on detected issues",
        "Basic farm management features",
      ],
      architecture: "Flutter client with a computer-vision inference component and Firebase for backend services.",
      process: ["TODO — add development process details for this project."],
      lessonsLearned: "TODO — add reflections on what this project taught you technically and practically.",
    },
  },
  {
    slug: "digital-land-verification",
    name: "Digital Land Verification System",
    fullTitle: "Digital Land Verification System",
    shortDescription:
      "A web platform for registering land records, verifying ownership, and managing transfers and disputes with a full audit trail.",
    categories: ["Web", "Full Stack"],
    stack: ["React", "Node.js", "Express"],
    status: "In Progress",
    year: "2026",
    featured: true,
    coverImage: "/images/projects/digital-land-verification-cover.jpg",
    screenshots: [],
    links: {
      github: undefined,
      demo: undefined,
    },
    caseStudy: {
      overview:
        "A system for registering land records digitally, verifying ownership claims, and managing transfer and dispute workflows with a complete audit trail — aimed at reducing the ambiguity that surrounds informal or paper-based land records.",
      problem:
        "Paper-based land records are easy to lose, forge, or dispute, and verifying ownership can be a slow, opaque process without a reliable audit trail.",
      motivation:
        "Bring the same rigor used in financial record-keeping — verifiable identity, immutable history, clear authorization — to land ownership records.",
      solution:
        "A React frontend backed by a Node.js/Express API that supports land registration, ownership verification, document management, transfer workflows, dispute management, and audit logging.",
      keyFeatures: [
        "Land registration with structured document management",
        "Ownership verification workflow",
        "Transfer workflows between parties",
        "Dispute management",
        "Audit logs for record history",
        "Authentication and access control",
      ],
      architecture: "React frontend, Node.js/Express REST API, with a relational or document store for records (TODO — confirm database).",
      process: ["TODO — add development process details for this project."],
      lessonsLearned: "TODO — add reflections on what this project taught you technically and practically.",
    },
  },
];

export const projectCategories = ["All", "AI/ML", "Web", "Mobile", "Full Stack", "Research"] as const;
