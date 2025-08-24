"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function Revenues() {
  const [revenue, setRevenue] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  // Simulate live revenue updates (replace with actual Stripe API call)
  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        // This would be your actual Stripe API call
        // const response = await fetch('/api/stripe/revenue');
        // const data = await response.json();

        // For demo purposes, simulate growing revenue
        const baseRevenue = 0;
        setRevenue(baseRevenue);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch revenue:", error);
        setRevenue(0); // Fallback
        setIsLoading(false);
      }
    };

    fetchRevenue();

    // Update revenue every 30 seconds
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        fetchRevenue();
        setIsAnimating(false);
      }, 300);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    router.push("/transparency");
  };

  if (isLoading) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-teal-500/10 to-green-500/10 border border-teal-500/20 rounded-full cursor-pointer hover:border-teal-500/40 transition-all duration-300">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
        <span className="text-xs font-mono text-muted-foreground">
          loading...
        </span>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className="group inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-teal-500/10 to-green-500/10 border border-teal-500/20 rounded-full cursor-pointer hover:border-teal-500/40 hover:from-teal-500/20 hover:to-green-500/20 transition-all duration-300 hover:scale-105 active:scale-95"
    >
      <div className="flex items-center gap-1">
        <svg
          className="w-3 h-3 text-indigo-400"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
        </svg>
      </div>

      <span className="text-xs font-mono text-foreground group-hover:text-teal-300 transition-colors">
        live revenue: ${revenue.toFixed(2)}
      </span>

      <svg
        className="w-3 h-3 text-muted-foreground group-hover:text-teal-300 transition-colors opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-0.5 transition-all duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
    </div>
  );
}
