"use client";

import { useEffect } from "react";

/**
 * Handles smooth scrolling for anchor links with offset for fixed navbar.
 * Also handles hash-based navigation on page load (e.g., navigating from /blog to /#about).
 * Place this component once in the layout.
 */
export function SmoothScroll() {
  // Handle anchor link clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const element = document.querySelector(href);
      if (!element) return;

      e.preventDefault();

      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update URL hash without jumping
      window.history.pushState(null, "", href);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Handle hash on page load (e.g., navigating to /#about from another page)
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      const element = document.querySelector(hash);
      if (!element) return;

      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
