# Evenlyo Mobile-First Responsive Design System

## Overview

This design system provides a comprehensive set of mobile-first responsive components and utilities for the Evenlyo multi-vendor platform. Built with TailwindCSS and React, it ensures consistent user experience across all device sizes.

## Technology Stack

- **TailwindCSS**: Utility-first CSS framework
- **React**: JavaScript library for building user interfaces
- **Vite**: Build tool for fast development
- **Plus Jakarta Sans**: Primary font family

## Custom Breakpoints

Our mobile-first approach uses custom container breakpoints:

```css
w-xs: 350px    /* Extra small devices */
w-sm: 384px    /* Small devices */
w-md: 448px    /* Medium devices */
w-lg: 512px    /* Large devices */
w-xl: 576px    /* Extra large devices */
w-2xl: 672px   /* 2X large devices */
w-3xl: 768px   /* 3X large devices */
w-4xl: 896px   /* 4X large devices */
w-5xl: 1024px  /* 5X large devices */
w-6xl: 1152px  /* 6X large devices */
w-7xl: 1280px  /* 7X large devices */
```

## Typography Scale

### Mobile-First Typography

```css
/* Mobile Typography */
.text-h1-mobile: 2rem (32px) → 3.75rem (60px) on desktop
.text-h2-mobile: 1.75rem (28px) → 3.125rem (50px) on desktop
.text-h3-mobile: 1.5rem (24px) → 2.5rem (40px) on desktop

/* Responsive Typography Classes */
.text-responsive-h1: 2xl → 3xl → 4xl → 5xl → 6xl
.text-responsive-h2: xl → 2xl → 3xl → 4xl → 5xl
.text-responsive-h3: lg → xl → 2xl → 3xl → 4xl
.text-responsive-body: sm → base → lg
```

## Color System

### Brand Colors

```css
primary: #E31B95 (Main brand color)
secondary: #FF295D (Secondary brand color)
primary-gradient: linear-gradient(90deg, #FF295D 0%, #E31B95 50%, #C817AE 100%)
```

### Grayscale

```css
white: #FFFFFF
black: #000000
gray-50: #F9FAFB
gray-100: #F3F4F6
gray-200: #E5E7EB
gray-300: #D1D5DB
gray-400: #9CA3AF
gray-500: #6B7280
gray-600: #666666
gray-700: #2F2F2F
gray-800: #1F2937
gray-900: #111827
```

### Accent Colors

```css
blue: #2970BE
green: #04C373
green-dark: #1C752E
yellow: #FFD500
accent-light: #FCF6D8
accent-pink: #FFEDF0
```

## Components

### Buttons

#### Primary Button
```jsx
<button className="btn-primary-mobile">
  Primary Action
</button>
```

#### Secondary Button
```jsx
<button className="btn-secondary-mobile">
  Secondary Action
</button>
```

#### Touch Button (Mobile Optimized)
```jsx
<button className="touch-button">
  Touch Friendly
</button>
```

### Cards

#### Basic Card
```jsx
<div className="card-mobile">
  <!-- Card content -->
</div>
```

#### Vendor Card
```jsx
<div className="card-mobile vendor-card-desktop">
  <!-- Vendor information -->
</div>
```

#### Card with Hover Effect
```jsx
<div className="card-mobile card-hover-mobile">
  <!-- Interactive card content -->
</div>
```

### Form Elements

#### Input Field
```jsx
<input className="input-mobile" type="text" placeholder="Enter text" />
```

#### Select Field
```jsx
<select className="select-mobile">
  <option>Choose option</option>
</select>
```

### Navigation

#### Desktop Navigation
```jsx
<nav className="nav-desktop">
  <!-- Navigation items -->
</nav>
```

#### Mobile Navigation
```jsx
<nav className="nav-mobile">
  <!-- Mobile navigation items -->
</nav>
```

### Grid System

#### Mobile-First Grid
```jsx
<div className="grid-mobile-1">    <!-- 1 column on mobile -->
<div className="grid-mobile-2">    <!-- 2 columns on mobile -->
<div className="grid-mobile-3">    <!-- 3 columns on mobile -->
<div className="grid-mobile-4">    <!-- 4 columns on mobile -->
```

### Containers

#### Custom Container Classes
```jsx
<div className="container-xs">     <!-- 350px max-width -->
<div className="container-sm">     <!-- 384px max-width -->
<div className="container-md">     <!-- 448px max-width -->
<div className="container-lg">     <!-- 512px max-width -->
<div className="container-xl">     <!-- 576px max-width -->
<div className="container-2xl">    <!-- 672px max-width -->
<div className="container-3xl">    <!-- 768px max-width -->
<div className="container-4xl">    <!-- 896px max-width -->
<div className="container-5xl">    <!-- 1024px max-width -->
<div className="container-6xl">    <!-- 1152px max-width -->
<div className="container-7xl">    <!-- 1280px max-width -->
```

## Spacing System

### Mobile-First Spacing

```css
.space-mobile-xs: 0.5rem (8px)
.space-mobile-sm: 1rem (16px)
.space-mobile-md: 1.5rem (24px)
.space-mobile-lg: 2rem (32px)
.space-mobile-xl: 3rem (48px)
```

### Responsive Spacing

```css
.py-responsive: py-4 → py-6 → py-8 → py-12 → py-16
.px-responsive: px-4 → px-6 → px-8 → px-12 → px-16
.mb-responsive: mb-4 → mb-6 → mb-8 → mb-12 → mb-16
```

## Animations

### Fade In Animation
```jsx
<div className="fade-in-mobile">
  <!-- Content with fade-in effect -->
</div>
```

### Slide In Animation
```jsx
<div className="slide-in-mobile">
  <!-- Content with slide-in effect -->
</div>
```

## Accessibility Features

### Touch Targets
```jsx
<button className="touch-target">
  <!-- Minimum 44px touch target -->
</button>
```

### Screen Reader Support
```jsx
<span className="sr-only">Screen reader only text</span>
```

### Focus Management
```jsx
<input className="focus-visible" />
```

## Responsive Image Containers

### Mobile Image Container
```jsx
<div className="image-container-mobile">
  <img src="..." alt="..." />
</div>
```

### Desktop Image Container
```jsx
<div className="image-container-desktop">
  <img src="..." alt="..." />
</div>
```

## Loading States

### Skeleton Loaders
```jsx
<div className="skeleton-mobile">
  <!-- Skeleton content -->
</div>

<div className="skeleton-text"></div>
<div className="skeleton-avatar"></div>
```

## Best Practices

### Mobile-First Approach
1. Always design for mobile first
2. Use progressive enhancement for larger screens
3. Ensure touch targets are at least 44px
4. Optimize images for different screen densities

### Performance
1. Use responsive images
2. Implement lazy loading for images
3. Minimize layout shifts
4. Use CSS containment when appropriate

### Accessibility
1. Maintain proper color contrast (4.5:1 for normal text)
2. Ensure keyboard navigation works
3. Provide alternative text for images
4. Use semantic HTML elements

### Design Consistency
1. Use the defined color palette
2. Stick to the typography scale
3. Maintain consistent spacing
4. Follow the component patterns

## Component Examples

### Responsive Header
```jsx
import ResponsiveHeader from './components/ResponsiveHeader';

<ResponsiveHeader />
```

### Responsive Hero
```jsx
import ResponsiveHero from './components/ResponsiveHero';

<ResponsiveHero />
```

### Responsive Categories
```jsx
import Categories from './components/Categories';

<Categories />
```

## Implementation Notes

1. Import the design system CSS in your main CSS file:
   ```css
   @import './design-system.css';
   ```

2. Use responsive classes following mobile-first principles:
   ```jsx
   <div className="px-4 sm:px-6 lg:px-8">
     <!-- Content -->
   </div>
   ```

3. Combine utility classes for optimal flexibility:
   ```jsx
   <button className="btn-primary-mobile touch-button w-full sm:w-auto">
     Responsive Button
   </button>
   ```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari (latest)
- Chrome Android (latest)

## Contributing

When adding new components or utilities:

1. Follow the mobile-first approach
2. Ensure accessibility compliance
3. Test across different devices
4. Document your additions
5. Use the established naming conventions

## Version History

- v1.0.0: Initial mobile-first responsive design system
- Comprehensive component library
- Custom breakpoint system
- Accessibility features
- Animation utilities
