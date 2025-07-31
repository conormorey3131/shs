# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Sixmilebridge Historical Society website - a modern, mobile-first static HTML website for a local historical society founded in 2020. The site has been fully optimized for SEO, accessibility, and performance with professional animations and user experience enhancements.

## Architecture & Structure

**Mobile-First Static Website:**
- Pure HTML/CSS/JavaScript implementation with no build process
- Five main pages: Home (index.html), About Us, Events, Gallery, Contact Us  
- Fully responsive design using CSS Grid, Flexbox, and mobile-first approach
- Modern CSS with custom properties (CSS variables) for maintainability
- Font Awesome icons and Google Fonts (Merriweather serif, Open Sans sans-serif)
- Comprehensive SEO optimization with structured data markup

**Key Files:**
- `index.html` - Homepage with hero section, structured data, and comprehensive SEO
- `about.html` - Society information, team profiles, and achievements section
- `events.html` - Event listings with structured data markup
- `gallery.html` - Historical photos with lightbox functionality
- `contact.html` - Enhanced contact form with validation and accessibility features
- `css/style.css` - Modern CSS with variables, animations, and mobile-first responsive design
- `js/script.js` - Enhanced JavaScript with performance optimizations, animations, form validation, lightbox, and accessibility features
- `sitemap.xml` - SEO sitemap for search engines
- `robots.txt` - Search engine directives
- `images/` - Optimized images with proper alt texts

**Design System & CSS Architecture:**
- CSS Custom Properties: `--color-primary` (#3A4D39), `--color-secondary` (#739072), `--color-accent` (#A2C579), etc.
- Typography: Merriweather for headings, Open Sans for body text
- Responsive breakpoints: Mobile-first (320px+), Tablet (768px+), Desktop (1024px+), Large Desktop (1200px+)
- Enhanced animations: fadeInUp, fadeInLeft, fadeInRight, pulse, slideInDown
- Accessibility: Focus states, ARIA labels, semantic HTML, color contrast compliance

## SEO & Performance Features

**SEO Optimization:**
- Comprehensive meta tags (title, description, keywords, canonical URLs)
- Open Graph and Twitter Card meta tags for social sharing
- Structured data markup (Schema.org) for organization, events, and people
- Semantic HTML with proper heading hierarchy
- Image optimization with descriptive alt texts and lazy loading
- XML sitemap and robots.txt for search engine indexing

**Performance Enhancements:**
- Font preloading with fallback for critical resources
- Lazy loading for images and non-critical resources
- Optimized CSS with mobile-first approach
- Passive event listeners for better scroll performance
- Reduced motion support for accessibility

**Accessibility Features:**
- ARIA labels and roles throughout
- Keyboard navigation support
- Screen reader friendly content
- Focus management for modals and menus
- Color contrast compliance
- Form validation with clear error messages

## Enhanced Interactive Features

**Advanced JavaScript Functionality:**
- Enhanced hamburger menu with body scroll lock and escape key support
- Intersection Observer for staggered animations with reduced motion support
- Lightbox gallery with keyboard navigation
- Real-time form validation with visual feedback
- Notification system for user feedback
- Scroll-to-top button with smooth scrolling
- Haptic feedback support for mobile devices
- Performance optimizations with passive listeners

**Animation System:**
- CSS-based animations with JavaScript triggers
- Multiple animation types: fade, slide, scale, pulse
- Staggered animations for multiple elements
- Respect for user's reduced motion preferences
- Loading animations and micro-interactions

## Development

**No Build Process:** Static website - edit files directly and view in browser or serve via HTTP server.

**Local Development:** Use `python -m http.server` or `npx serve` for local testing.

**Testing Checklist:**
- Mobile responsiveness across all breakpoints
- Form validation and submission
- Image loading and lightbox functionality
- Animation performance and reduced motion support
- SEO meta tags and structured data validation
- Accessibility testing with screen readers

## Content Management

**Adding Events:** Update events.html with structured data markup following Schema.org Event format.

**Adding Gallery Images:** Add to gallery.html with proper alt texts and loading="lazy" attributes.

**Adding Team Members:** Update about.html team section with Schema.org Person markup.

**SEO Updates:** Update sitemap.xml lastmod dates when content changes significantly.

**Form Configuration:** Replace "YOUR_ACCESS_KEY_HERE" in contact.html with actual Web3Forms access key.

## Technical Notes

**CSS Variables:** Use the defined custom properties for consistent styling.

**Animation Classes:** Available classes include `.fade-in-section`, `.fade-in-left`, `.fade-in-right`, `.scale-in`.

**JavaScript APIs:** Uses modern APIs (IntersectionObserver, vibration, passive listeners) with feature detection.

**Browser Support:** Modern browsers with graceful degradation for older browsers.