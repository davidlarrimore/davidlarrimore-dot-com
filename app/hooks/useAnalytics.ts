// hooks/useAnalytics.ts (Optional - for event tracking)
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageview } from "@/lib/gtag";

export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();
    
    // Track page views
    pageview(url);
  }, [pathname, searchParams]);
}

// Example usage in a component:
// import { useAnalytics } from "@/hooks/useAnalytics";
// 
// export default function SomeComponent() {
//   useAnalytics(); // This will automatically track page views
//   
//   const handleButtonClick = () => {
//     // Track custom events
//     event({
//       action: 'click',
//       category: 'engagement',
//       label: 'hero_cta_button',
//     });
//   };
//   
//   return <button onClick={handleButtonClick}>Click Me</button>;
// }