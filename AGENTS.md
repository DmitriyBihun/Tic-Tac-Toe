# Tic-Tac-Toe Engineering Guide

## Tech Stack
- Frontend: React
- Styling: Tailwind CSS
- Tooling: Vite 

## Project Structure & Architecture
- У нас компонентный подход. Один логический блок = один файл.
- Компоненты должны храниться в директории `src/components/`.
- Файл `App.jsx` должен быть максимально чистым и выступать только точкой входа (контейнером), собирающим в себе основные компоненты.

## CSS Conventions (Tailwind CSS Patterns)
- СТРОГО ЗАПРЕЩЕНО использовать инлайн-стили (`style={{...}}`).
- Используй только utility-классы Tailwind CSS.
- # Tailwind CSS Responsive Design & Dark Mode

## Responsive Design Patterns

### Mobile-First Responsive Layout

```html
<div class="container mx-auto px-4">
  <!-- Hero Section -->
  <div class="flex flex-col md:flex-row items-center gap-8 py-12">
    <div class="flex-1">
      <h1 class="text-3xl md:text-5xl font-bold mb-4">
        Welcome to Our Site
      </h1>
      <p class="text-lg text-gray-600 mb-6">
        Build amazing things with Tailwind CSS
      </p>
      <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        Get Started
      </button>
    </div>
    <div class="flex-1">
      <img src="hero.jpg" class="w-full rounded-lg shadow-lg" />
    </div>
  </div>
</div>
```

### Responsive Grid Gallery

```html
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
  <div class="aspect-square bg-gray-200 rounded-lg overflow-hidden">
    <img src="image1.jpg" class="w-full h-full object-cover hover:scale-105 transition" />
  </div>
  <div class="aspect-square bg-gray-200 rounded-lg overflow-hidden">
    <img src="image2.jpg" class="w-full h-full object-cover hover:scale-105 transition" />
  </div>
  <!-- More items... -->
</div>
```

### Responsive Card Component

```tsx
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden
                    sm:flex sm:max-w-2xl">
      <img
        className="h-48 w-full object-cover sm:h-auto sm:w-48"
        src={product.image}
        alt={product.name}
      />
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {product.name}
        </h3>
        <p className="mt-2 text-gray-600">
          {product.description}
        </p>
        <button className="mt-4 px-4 py-2 bg-indigo-600 text-white
                          rounded-lg hover:bg-indigo-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
```

---

## Dark Mode

### Basic Dark Mode Support

```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <h1 class="text-gray-900 dark:text-white">Title</h1>
  <p class="text-gray-600 dark:text-gray-400">Description</p>
</div>
```

Enable dark mode in tailwind.config.js:

```javascript
module.exports = {
  darkMode: 'class', // or 'media'
  // ...
}
```

### Dark Mode Toggle (React)

```tsx
function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800"
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
}
```

### Dark Mode Best Practices

1. **Use semantic color names**: Instead of `bg-white` use `bg-surface` custom color
2. **Test with real content**: Some colors look good in light but not in dark
3. **Respect system preference**: Use `darkMode: 'media'` for OS-level preference
4. **Smooth transitions**: Add transition utilities for theme changes

```css
/* Global transition for theme changes */
* {
  @apply transition-colors duration-200;
}
```

---

## Container Queries (v4.1+)

Component that responds to its container size, not viewport:

```html
<div class="@container">
  <div class="@lg:text-xl @2xl:text-2xl">
    Text size based on container, not viewport
  </div>
</div>
```

Usage in a card component:

```html
<div class="@container w-full">
  <div class="flex flex-col @[400px]:flex-row gap-4">
    <img class="w-full @[400px]:w-32 h-32 object-cover" src="image.jpg" />
    <div>
      <h3 class="text-base @[400px]:text-lg font-bold">Title</h3>
      <p class="text-sm @[400px]:text-base">Description</p>
    </div>
  </div>
</div>
```
# Tailwind CSS Accessibility Guidelines

## Focus Management

```html
<!-- Custom focus styles that meet WCAG AA -->
<button class="focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2">
  Accessible Button
</button>

<!-- Skip links for keyboard navigation -->
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4">
  Skip to main content
</a>
```

### Focus Visible vs Focus

```html
<!-- Only show focus ring on keyboard navigation -->
<button class="focus-visible:ring-2 focus-visible:ring-blue-500">
  Keyboard-only focus indicator
</button>
```

---

## Screen Reader Support

```html
<!-- Semantic buttons with ARIA labels -->
<button aria-label="Close dialog" class="p-2">
  <svg class="w-5 h-5" fill="none" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>

<!-- Descriptive links -->
<a href="/docs" aria-describedby="docs-description">
  Documentation
</a>
<p id="docs-description" class="sr-only">
  Learn how to use our API and integration guides
</p>

<!-- Live regions for dynamic content -->
<div aria-live="polite" class="sr-only">
  <p>3 new notifications</p>
</div>
```

### Screen Reader Only Content

```html
<span class="sr-only">Opens in new window</span>
```

---

## Color Contrast

```html
<!-- Ensure sufficient contrast ratios -->
<div class="bg-gray-900 text-white">
  High contrast text (WCAG AAA)
</div>

<div class="bg-blue-500 text-blue-100">
  Good contrast on colored backgrounds
</div>

<!-- Use contrast utilities for testing -->
<div class="bg-red-500 text-white contrast-more:bg-red-600 contrast-more:text-red-100">
  Adjusts for high contrast mode
</div>
```

### Contrast Guidelines

- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text**: Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio

---

## Motion Preferences

```html
<!-- Respect prefers-reduced-motion -->
<div class="transform transition-transform motion-reduce:transition-none">
  Doesn't animate when user prefers reduced motion
</div>

<!-- Conditional animations -->
<div class="animate-pulse motion-safe:hover:animate-spin">
  Only animates when motion is preferred
</div>
```

### Reduced Motion Media Query

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## ARIA Patterns with Tailwind

### Toggle Button

```html
<button
  type="button"
  role="switch"
  aria-checked="false"
  class="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 aria-checked:bg-blue-600"
>
  <span class="sr-only">Enable notifications</span>
  <span class="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1 aria-checked:translate-x-6"></span>
</button>
```

### Alert Dialog

```html
<div
  role="alertdialog"
  aria-labelledby="alert-title"
  aria-describedby="alert-description"
  class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
>
  <div class="max-w-md w-full bg-white rounded-lg shadow-xl p-6">
    <h2 id="alert-title" class="text-lg font-bold mb-2">
      Are you sure?
    </h2>
    <p id="alert-description" class="text-gray-600 mb-4">
      This action cannot be undone.
    </p>
    <div class="flex justify-end gap-2">
      <button class="px-4 py-2 text-gray-600">Cancel</button>
      <button class="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
    </div>
  </div>
</div>
```

---

## Accessibility Checklist

- [ ] All interactive elements have visible focus indicators
- [ ] Color contrast meets WCAG standards
- [ ] Images have alt text
- [ ] Form inputs have associated labels
- [ ] ARIA labels used for icon-only buttons
- [ ] Animations respect reduced motion preference
- [ ] Skip links provided for keyboard navigation
- [ ] Landmarks (header, main, nav, footer) used appropriately
