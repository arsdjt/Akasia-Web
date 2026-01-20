import React from 'react';

// Responsive Design Utilities
// Formulas for fluid sizing and responsive calculations

/**
 * Fluid size calculation using clamp()
 * @param {number} min - Minimum size in px
 * @param {number} max - Maximum size in px
 * @param {number} viewportMin - Minimum viewport width in px (default 320)
 * @param {number} viewportMax - Maximum viewport width in px (default 1200)
 * @returns {string} CSS clamp() value
 */
export const fluidSize = (min, max, viewportMin = 320, viewportMax = 1200) => {
  const slope = (max - min) / (viewportMax - viewportMin);
  const intercept = min - slope * viewportMin;
  const preferred = `${slope * 100}vw + ${intercept}px`;
  return `clamp(${min}px, ${preferred}, ${max}px)`;
};

/**
 * Fluid typography size
 * @param {number} min - Minimum font size in px
 * @param {number} max - Maximum font size in px
 * @returns {string} CSS clamp() value optimized for typography
 */
export const fluidFontSize = (min, max) => {
  return fluidSize(min, max, 320, 1200);
};

/**
 * Responsive spacing calculation
 * @param {number} base - Base spacing in px
 * @param {number} scale - Scaling factor
 * @returns {string} CSS clamp() value for spacing
 */
export const fluidSpacing = (base, scale = 1.5) => {
  const min = base * 0.8;
  const max = base * scale;
  return fluidSize(min, max);
};

/**
 * Get responsive breakpoint values
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * Calculate responsive value based on current screen size
 * @param {object} values - Object with breakpoint keys and values
 * @param {number} currentWidth - Current viewport width
 * @returns {*} The value for the current breakpoint
 */
export const getResponsiveValue = (values, currentWidth = window.innerWidth) => {
  const sortedBreakpoints = Object.entries(breakpoints).sort((a, b) => a[1] - b[1]);
  
  for (let i = sortedBreakpoints.length - 1; i >= 0; i--) {
    const [key, width] = sortedBreakpoints[i];
    if (currentWidth >= width && values[key] !== undefined) {
      return values[key];
    }
  }
  
  return values.default || values.sm || Object.values(values)[0];
};

/**
 * Hook for responsive values (React)
 * Usage: const fontSize = useResponsiveValue({ sm: 16, md: 18, lg: 20 });
 */
export const useResponsiveValue = (values) => {
  const [value, setValue] = React.useState(() => getResponsiveValue(values));
  
  React.useEffect(() => {
    const handleResize = () => setValue(getResponsiveValue(values));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [values]);
  
  return value;
};