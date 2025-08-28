import { Icons } from "@/components/ui/icons";
import { Twitter, Linkedin, Mail } from "lucide-react";

export const DATA = {
  // Brand & positioning
  name: "uara — Shippin Websites (Shadcn + Next.js)",
  initials: "UA",
  url: "https://uara.co",
  location: "Remote • Europe (CET)",
  locationLink: "https://www.google.com/maps/place/Europe",
  description:
    "Flat monthly subscription for clean, fast websites built with Shadcn UI + Next.js. Unlimited requests, one active at a time, 2–3 day turnaround. Live revenue. Founder building in public.",
  summary:
    "I’m a medtech founder funding science by building simple, clean websites on a flat monthly subscription. Tech: Next.js, Tailwind, Shadcn UI, Supabase, Stripe, Vercel. Unlimited requests (1 active), 2–3 day turnaround, full transparency (live revenue).",

  avatarUrl: "/logo-uara.png",

  // 🔎 Primary keywords / services (used across pages & schema)
  skills: [
    "Subscription website development",
    "Flat monthly web development",
    "Shadcn UI websites",
    "Next.js landing pages",
    "Tailwind CSS development",
    "Supabase integrations",
    "Stripe checkout buttons",
    "Website speed & SEO fixes",
    "Productized development service",
    "Unlimited website requests",
    "Startup websites",
    "Founder building in public",
  ],

  contact: {
    email: "fed@uara.ai",
    tel: "",
    social: {
      Twitter: {
        name: "Twitter / X",
        url: "https://x.com/FedericoFan",
        icon: Twitter,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/federico-fanini/",
        icon: Linkedin,
        navbar: true,
      },
      Email: {
        name: "Email",
        url: "mailto:fed@uara.ai",
        icon: Mail,
        navbar: false,
      },
    },
  },

  // Case studies / examples (helps SEO + social proof)
  projects: [
    {
      title: "Landing Page Sprint — Pre-launch Startup",
      href: "/examples/landing-page-sprint",
      dates: "2025",
      active: true,
      description:
        "Hero + features + pricing + FAQ + contact in 3 days using Shadcn UI + Next.js. Connected analytics and a simple newsletter form to Supabase.",
      technologies: ["Next.js", "Shadcn UI", "Tailwind", "Supabase", "Vercel"],
      links: [
        {
          type: "Get this",
          href: "/pricing?ref=example-landing",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/examples/landing-sprint.jpg",
      video: "",
    },
    {
      title: "Speed & SEO Pass — Marketing Site Glow-Up",
      href: "/examples/speed-seo-pass",
      dates: "2025",
      active: true,
      description:
        "Compressed assets, cleaned CSS, added meta + OG tags, and improved LCP to <2s. Simple wins that moved conversions.",
      technologies: ["Lighthouse", "Next/Image", "OG tags", "Plausible"],
      links: [
        {
          type: "Order the pass",
          href: "/pricing?ref=seo-pass",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/examples/seo-pass.jpg",
      video: "",
    },
    {
      title: "Contact Flow — Forms + Email + Stripe Button",
      href: "/examples/forms-and-stripe",
      dates: "2025",
      active: true,
      description:
        "Shipped a simple lead form wired to Supabase + Resend, and a Stripe one-time ‘book sprint’ button. Minimal integrations, maximum momentum.",
      technologies: ["Supabase", "Resend", "Stripe", "Next.js"],
      links: [
        {
          type: "Add this flow",
          href: "/pricing?ref=contact-flow",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/examples/contact-flow.jpg",
      video: "",
    },
  ],

  // Optional: industries/use-cases you target (helps long-tail)
  industries: [
    "Indie hackers",
    "Solo founders",
    "Small startups",
    "Consultants & creators",
    "Healthcare & medtech marketing pages",
  ],

  // 🔎 Long-tail keywords you want to rank for (used for dynamic pages or sitemaps)
  keywords: [
    "subscription website development",
    "flat monthly web development",
    "shadcn developer",
    "next.js landing page developer",
    "productized development service",
    "unlimited website requests plan",
    "startup website subscription",
    "speed and seo pass next.js",
  ],

  // 🌐 Per-page SEO metadata (titles, descriptions, og)
  meta: {
    home: {
      title: "uara — need a website? hire a broke founder",
      description:
        "Flat monthly subscription for clean Shadcn + Next.js websites. Unlimited requests (1 active), 2–3 day turnaround, full transparency. Revenue is public. ",
      ogImage: "/og/opengraph-image.png",
    },
    pricing: {
      title: "pricing — $790/mo subscription websites | uara",
      description:
        "One plan. No upsells. Unlimited requests, one active at a time, 2–3 day turnaround. Pause or cancel anytime. Netflix vibes, but I actually ship.",
      ogImage: "/og/opengraph-image.png",
    },
    howItWorks: {
      title: "how it works — unlimited requests, one active | uara",
      description:
        "Add requests → I pick one → code like a caffeinated raccoon → you approve or roast → we ship. 2–3 day turnaround. Simple, fast, funny.",
      ogImage: "/og/opengraph-image.png",
    },
    faq: {
      title: "faq — subscription websites explained (with memes) | uara",
      description:
        "Do you do calls? No, I do commits. What’s a task? A 2–3 day deliverable: page, section, form, speed pass. Cancel or pause anytime.",
      ogImage: "/og/opengraph-image.png",
    },
    transparency: {
      title: "transparency — live revenue & roadmap | uara",
      description:
        "Building in public. Live revenue counter, weekly updates, roadmap, and too much honesty. Every euro funds medtech (and coffee).",
      ogImage: "/og/opengraph-image.png",
    },
    wallOfLove: {
      title: "wall of love — real (and meme) testimonials | uara",
      description:
        "Testimonials from clients, friends, and trolls. Real screenshots coming soon. Current review: “stop putting memes in commits.” — my friend.",
      ogImage: "/og/opengraph-image.png",
    },
    request: {
      title: "submit a request — start your first task | uara",
      description:
        "Queue your first website request. Unlimited backlog, one active at a time. I ship in 2–3 days. No Facebook clones, pls.",
      ogImage: "/og/opengraph-image.png",
    },
    examples: {
      title: "examples — tiny sites, big energy | uara",
      description:
        "A handful of clean Shadcn + Next.js builds: landing sprints, speed/SEO pass, forms + Stripe button. Simple, fast, shippable.",
      ogImage: "/og/opengraph-image.png",
    },
    changelog: {
      title: "changelog — things shipped (and memes) | uara",
      description:
        "Weekly notes of what shipped for clients and for this site. Speed > polish. Transparency > perfection.",
      ogImage: "/og/opengraph-image.png",
    },
  },

  // ⚙️ JSON-LD (you can inject these in <head> via next/head or metadata API)
  schemaOrg: {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "uara",
      url: "https://uara.co",
      logo: "https://uara.co/logo-uara.png",
      sameAs: [
        "https://x.com/FedericoFan",
        "https://www.linkedin.com/in/federico-fanini/",
        "https://uara.co",
      ],
    },
    product: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "uara — Shippin Websites",
      description:
        "Flat monthly subscription for Shadcn + Next.js websites. Unlimited requests, one active at a time, 2–3 day turnaround. Live revenue.",
      brand: { "@type": "Brand", name: "uara" },
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: "790.00",
        availability: "https://schema.org/InStock",
        url: "https://uara.co/pricing",
      },
    },
    // Add Review schema once real testimonials exist
  },
} as const;
