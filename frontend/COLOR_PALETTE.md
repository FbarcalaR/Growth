# Color Palette Guide

This document outlines the color palette used in the Growth application, with a focus on accessibility and contrast ratios.

## Text Colors

### Primary Text
- **Usage**: Main headings, important content
- **Color**: `text-gray-900` (#111827)
- **Contrast Ratio**: 15.6:1 (Excellent)

### Secondary Text
- **Usage**: Body text, descriptions, labels, form inputs
- **Color**: `text-gray-800` (#1f2937)
- **Contrast Ratio**: 12.6:1 (Excellent)

### Muted Text
- **Usage**: Subtle information, timestamps, metadata, secondary descriptions
- **Color**: `text-gray-700` (#374151)
- **Contrast Ratio**: 8.8:1 (Excellent)

### Disabled Text
- **Usage**: Disabled form elements, inactive content, placeholders
- **Color**: `text-gray-500` (#6b7280)
- **Contrast Ratio**: 4.5:1 (Acceptable)

## Background Colors

### Primary Background
- **Usage**: Main page backgrounds
- **Color**: `bg-white` (#ffffff)

### Secondary Background
- **Usage**: Cards, sections, form backgrounds
- **Color**: `bg-gray-50` (#f9fafb)

### Muted Background
- **Usage**: Hover states, subtle highlights
- **Color**: `bg-gray-100` (#f3f4f6)

## Semantic Colors

### Success
- **Primary**: `text-green-600` (#16a34a)
- **Background**: `bg-green-100` (#dcfce7)
- **Usage**: Success messages, completed tasks

### Error
- **Primary**: `text-red-600` (#dc2626)
- **Background**: `bg-red-100` (#fee2e2)
- **Usage**: Error messages, validation errors

### Warning
- **Primary**: `text-yellow-600` (#d97706)
- **Background**: `bg-yellow-100` (#fef3c7)
- **Usage**: Warning messages, attention needed

### Info
- **Primary**: `text-blue-600` (#2563eb)
- **Background**: `bg-blue-100` (#dbeafe)
- **Usage**: Information messages, links

## Button Colors

### Primary Button
- **Background**: `bg-blue-600` (#2563eb)
- **Text**: `text-white`
- **Hover**: `hover:bg-blue-700` (#1d4ed8)

### Secondary Button
- **Background**: `bg-gray-200` (#e5e7eb)
- **Text**: `text-gray-800` (#1f2937)
- **Hover**: `hover:bg-gray-300` (#d1d5db)

## Form Elements

### Input Text
- **Color**: `text-gray-900` (#111827)
- **Contrast Ratio**: 15.6:1 (Excellent)

### Input Placeholders
- **Color**: `placeholder-gray-500` (#6b7280)
- **Contrast Ratio**: 4.5:1 (Acceptable)

### Input Borders
- **Default**: `border-gray-300` (#d1d5db)
- **Focus**: `border-blue-500` (#3b82f6)
- **Error**: `border-red-500` (#ef4444)

### Labels
- **Color**: `text-gray-800` (#1f2937)
- **Font Weight**: `font-medium`
- **Contrast Ratio**: 12.6:1 (Excellent)

## Accessibility Guidelines

1. **Minimum Contrast**: All text should have a contrast ratio of at least 4.5:1
2. **Preferred Contrast**: Aim for 7:1 or higher for better readability
3. **Large Text**: Text 18pt+ can use 3:1 contrast ratio
4. **Interactive Elements**: Buttons and links should have clear hover states
5. **Form Inputs**: Input text should use `text-gray-900` for maximum readability

## Usage Examples

```tsx
// Excellent contrast - use for main content and form inputs
<h1 className="text-gray-900">Main Heading</h1>
<p className="text-gray-800">Body text with excellent readability</p>
<input className="text-gray-900" />

// Good contrast - use for secondary information
<span className="text-gray-700">Secondary information</span>

// Acceptable contrast - use for placeholders and disabled text
<span className="text-gray-500">Placeholder text</span>

// Good button contrast
<button className="bg-blue-600 text-white hover:bg-blue-700">
  Primary Action
</button>

// Good form labels
<label className="text-gray-800 font-medium">Form Label</label>
```

## Recent Improvements

- **Upgraded text colors**: Changed from `text-gray-600/700` to `text-gray-700/800` for better contrast
- **Form inputs**: All input text now uses `text-gray-900` for maximum readability
- **Labels**: Form labels use `text-gray-800` for excellent contrast
- **Body text**: Main content uses `text-gray-800` instead of lighter grays

## Testing Contrast

Use browser developer tools or tools like:
- WebAIM Contrast Checker
- Stark Contrast Checker
- Chrome DevTools Accessibility panel

## Color Variables

The application uses CSS custom properties defined in `globals.css` for consistent theming and potential dark mode support. 