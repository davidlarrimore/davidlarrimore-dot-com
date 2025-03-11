/**
 * Configuration utility for accessing environment variables
 * This centralizes environment variable access and provides type safety
 */

// App configuration
export const siteConfig = {
    name: process.env.NEXT_PUBLIC_SITE_NAME || "David Larrimore | Personal Website",
    url: process.env.PUBLIC_SITE_URL || "https://davidlarrimore.com",
  }
  
  // Contact information
  export const contactConfig = {
    email: process.env.CONTACT_EMAIL || "davidlarrimore@gmail.com",
  }
  
  // Social media links
  export const socialConfig = {
    github: process.env.CONTACT_GITHUB_URL || "https://github.com/davidlarrimore",
    linkedin: process.env.CONTACT_LINKEDIN_URL || "https://linkedin.com/in/davidlarrimore",
    twitter: process.env.CONTACT_TWITTER_URL || "https://twitter.com/davidlarrimore",
  }
  
  
  // Analytics configuration (for future use)
  export const analyticsConfig = {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "",
  }
  
  // API configuration (for future use)
  export const apiConfig = {
    key: process.env.API_KEY || "",
  }