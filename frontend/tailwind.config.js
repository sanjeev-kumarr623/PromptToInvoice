/** @type {import('tailwindcss').Config} */
module.exports = {
  // Explicit default ('media' = respect the OS/browser color-scheme preference).
  // Nothing in this app uses `dark:` variants yet, but this documents the
  // current behavior rather than leaving it implicit.
  darkMode: "media",

  // Every place Tailwind classes actually appear in this project. Kept split
  // by folder (rather than one broad "./**/*.{js,jsx}") so it's obvious what
  // feeds the scanner, and so build tools don't waste time walking
  // node_modules/.next/public.
  content: [
    "./app/**/*.{js,jsx}", // route pages + layouts (App Router)
    "./components/**/*.{js,jsx}", // shared UI (Navbar, AppShell, Dashboard, ...)
    "./context/**/*.{js,jsx}", // AuthContext (SignedIn/SignedOut render classes)
    "./assets/**/*.{js,jsx}", // dummyStyles.js — the class-name string source of truth
    "./lib/**/*.{js,jsx}", // small helpers; included for completeness
  ],

  theme: {
    extend: {
      // AppShell's header CTA button (components/AppShell.jsx) switches between
      // "Create Invoice" and "Create" with `xs:inline` / `xs:hidden`, but Tailwind
      // has no `xs` breakpoint out of the box. 480px matches the mobile cutoff
      // already used for the print-preview layout in app/globals.css, so it's
      // consistent with the one "small mobile" line this codebase already draws.
      screens: {
        xs: "480px",
      },

      // The primary CTA gradient (`from-blue-600 to-indigo-600`) is repeated
      // ~17 times across dummyStyles.js (buttons, active nav links, totals).
      // Aliased here as `brand`/`brand-dark` so a future rename only touches
      // one place; existing components keep working unchanged either way.
      colors: {
        brand: {
          DEFAULT: "#2563eb", // Tailwind's blue-600
          dark: "#4338ca", // Tailwind's indigo-700
        },
      },

      // `font-[pacifico]` shows up in every page's `pageContainer` style
      // (dummyStyles.js) but no "Pacifico" font is ever loaded, so it silently
      // falls back to the browser default. This token doesn't change that —
      // it just gives the intended stack a name if the font is added later
      // (e.g. via next/font/google) and the arbitrary-value classes are
      // swapped for `font-pacifico`.
      fontFamily: {
        pacifico: ["Pacifico", "cursive"],
      },

      // Tailwind's default box-shadow scale stops at `shadow-2xl`, but
      // `hover:shadow-3xl` is used twice in dummyStyles.js (Hero's primary
      // button and the hero demo card) — without this, both currently
      // compile to nothing and the hover has no effect at all.
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },

      // Not referenced anywhere yet — the default scale (up to `rounded-3xl`)
      // covers every card/button in this app today. Added as a real, working
      // token in case a future design (e.g. an even softer modal or hero
      // panel) wants a bigger radius than `rounded-3xl` without another trip
      // through this file.
      borderRadius: {
        "4xl": "2rem",
      },

      // Also unused today: AppShell's mobile drawer and sticky header sit at
      // z-40/z-50 (both in Tailwind's default scale already). These two
      // extra steps exist for whatever eventually needs to stack above them
      // — a toast, a confirm dialog, a tooltip — without picking an
      // arbitrary `z-[9999]` at the call site.
      zIndex: {
        60: "60",
        70: "70",
      },

      // New, unused utilities — `app/globals.css` already hand-writes the
      // `animate-blob` / `animate-float-*` / `animate-pulse-slow` keyframes
      // this project actually uses, so those are deliberately *not*
      // duplicated here (that would just create two competing definitions
      // of the same class). `fade-in` and `slide-up` are real, working
      // Tailwind animations nothing currently applies.
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
      },
    },
  },

  plugins: [
    require('tailwind-animationlab')({
    duration: '500ms',
    delay: '1s',
    iterationCount: '2'
    })
  ],
};
