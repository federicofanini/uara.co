import { OpenPanel } from "@openpanel/nextjs";

// Initialize OpenPanel instance
export const op = new OpenPanel({
  clientId: process.env.NEXT_PUBLIC_OPEN_PANEL_CLIENT_ID!,
  clientSecret: process.env.OPEN_PANEL_CLIENT_SECRET!,
});

// Event names for tracking
export const EVENTS = {
  // Pricing conversion events
  PRICING_MVP_CLICK: "pricing_mvp_click",
  PRICING_FOUNDER_PLAN_CLICK: "pricing_founder_plan_click",
  PRICING_HERO_CLICK: "pricing_hero_click",

  // Conversion funnel events
  CONVERSION_INTENT: "conversion_intent",
  CONVERSION_STARTED: "conversion_started",
  CONVERSION_COMPLETED: "conversion_completed",
} as const;

// Product types for tracking
export const PRODUCTS = {
  MVP: "minimum_viable_page",
  FOUNDER_PLAN: "broke_founder_plan",
  HERO_CTA: "hero_cta",
} as const;

// Pricing event tracking functions
export const trackPricingClick = (
  product: string,
  price: number,
  source?: string
) => {
  op.track(EVENTS.PRICING_MVP_CLICK, {
    product,
    price,
    source: source || "pricing_page",
    currency: "USD",
    timestamp: new Date().toISOString(),
  });
};

export const trackMVPClick = (source?: string) => {
  op.track(EVENTS.PRICING_MVP_CLICK, {
    product: PRODUCTS.MVP,
    price: 500,
    original_price: 2000,
    discount: 75, // 75% off
    source: source || "pricing_page",
    currency: "USD",
    timestamp: new Date().toISOString(),
  });
};

export const trackFounderPlanClick = (source?: string) => {
  op.track(EVENTS.PRICING_FOUNDER_PLAN_CLICK, {
    product: PRODUCTS.FOUNDER_PLAN,
    price: 790,
    original_price: 1490,
    billing_cycle: "monthly",
    discount: 47, // 47% off
    source: source || "pricing_page",
    currency: "USD",
    timestamp: new Date().toISOString(),
  });
};

export const trackHeroCTAClick = (source?: string) => {
  op.track(EVENTS.PRICING_HERO_CLICK, {
    product: PRODUCTS.HERO_CTA,
    price: 500,
    source: source || "hero_section",
    currency: "USD",
    timestamp: new Date().toISOString(),
  });
};

// Conversion funnel tracking
export const trackConversionIntent = (product: string, price: number) => {
  op.track(EVENTS.CONVERSION_INTENT, {
    product,
    price,
    currency: "USD",
    funnel_stage: "intent",
    timestamp: new Date().toISOString(),
  });
};

export const trackConversionStarted = (
  product: string,
  price: number,
  external_link?: string
) => {
  op.track(EVENTS.CONVERSION_STARTED, {
    product,
    price,
    currency: "USD",
    funnel_stage: "started",
    external_link,
    timestamp: new Date().toISOString(),
  });
};

export const trackConversionCompleted = (
  product: string,
  price: number,
  order_id?: string
) => {
  op.track(EVENTS.CONVERSION_COMPLETED, {
    product,
    price,
    currency: "USD",
    funnel_stage: "completed",
    order_id,
    timestamp: new Date().toISOString(),
  });
};

// Page view tracking
export const trackPricingPageView = () => {
  op.track("pricing_page_view", {
    page: "pricing",
    timestamp: new Date().toISOString(),
  });
};

// Generic event tracking utility
export const trackCustomEvent = (
  eventName: string,
  properties?: Record<string, any>
) => {
  op.track(eventName, {
    ...properties,
    timestamp: new Date().toISOString(),
  });
};
