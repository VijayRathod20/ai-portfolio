"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { navItems } from "@/data/site-config";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection via IntersectionObserver (only on home page)
  useEffect(() => {
    if (!isHomePage) return;

    const sectionIds = navItems
      .filter((item) => item.href.startsWith("#"))
      .map((item) => item.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHomePage]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Smooth scroll to section (works on home page)
  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 80;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        window.history.pushState(null, "", `#${sectionId}`);
      }
    },
    []
  );

  // Handle nav click — smooth scroll on home page, navigate on other pages
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      // Page routes like /blog — let default behavior handle it
      if (!href.startsWith("#")) return;

      e.preventDefault();
      const sectionId = href.slice(1);

      if (isHomePage) {
        // On home page — smooth scroll to section
        scrollToSection(sectionId);
      } else {
        // On other pages — navigate to home page with hash
        router.push(`/${href}`);
      }

      // Close mobile menu
      setIsOpen(false);
    },
    [isHomePage, router, scrollToSection]
  );

  // Determine if a nav item is active
  const isNavItemActive = (item: { href: string }) => {
    if (item.href.startsWith("#")) {
      // Hash links — active based on scroll position (home page only)
      return isHomePage && activeSection === item.href.slice(1);
    }
    // Page routes — active based on pathname
    return pathname.startsWith(item.href);
  };

  // Get the proper href for a nav item
  const getNavHref = (href: string) => {
    if (!href.startsWith("#")) return href; // Page routes stay as-is
    if (isHomePage) return href; // On home page, use hash
    return `/${href}`; // On other pages, use full path with hash
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass py-3" : "py-5 bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <a
          href={isHomePage ? "#home" : "/"}
          onClick={(e) => {
            if (isHomePage) {
              e.preventDefault();
              scrollToSection("home");
            }
          }}
          className="group flex items-center gap-2 text-lg font-bold tracking-tight"
        >
          <Sparkles className="h-5 w-5 text-accent transition-transform group-hover:rotate-12" />
          <span className="gradient-text">VR</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = isNavItemActive(item);

            return (
              <a
                key={item.href}
                href={getNavHref(item.href)}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 rounded-lg bg-muted"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
          <div className="ml-3">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="glass mx-4 mt-3 overflow-hidden rounded-2xl md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navItems.map((item, index) => {
                const isActive = isNavItemActive(item);

                return (
                  <motion.a
                    key={item.href}
                    href={getNavHref(item.href)}
                    onClick={(e) => handleNavClick(e, item.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
