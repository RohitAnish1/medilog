// ============================================================================
// UTILITY FUNCTIONS - Common Helper Functions
// ============================================================================
// This file contains utility functions used throughout the MediLog application
// Primary purpose is to provide consistent CSS class name handling with Tailwind CSS

import { clsx, type ClassValue } from "clsx"      // Utility for conditional class names
import { twMerge } from "tailwind-merge"          // Utility for merging Tailwind classes intelligently

// ============================================================================
// CLASS NAME UTILITY FUNCTION - Smart CSS Class Management
// ============================================================================
// Combines multiple class values and intelligently merges Tailwind CSS classes
// Prevents conflicts by allowing later classes to override earlier ones
// Example usage: cn("text-red-500", condition && "text-blue-500", "font-bold")
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))                   // First apply clsx for conditionals, then merge with twMerge
}
