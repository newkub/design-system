import { useEffect, useState } from 'react';

interface UseScrollSpyOptions {
  ids: string[];
  offset?: number;
  updateHash?: boolean;
}

export function useScrollSpy({ ids, offset = 100, updateHash = true }: UseScrollSpyOptions) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    
    if (elements.length === 0) return;
    
    const handleScroll = () => {
      // Get current scroll position
      const scrollPosition = window.scrollY + offset;
      
      // Find the element that is currently in view
      let currentElement: HTMLElement | null = null;
      
      for (const element of elements) {
        const { top } = element.getBoundingClientRect();
        const elementTop = top + window.scrollY;
        
        if (elementTop <= scrollPosition) {
          currentElement = element;
        } else {
          break;
        }
      }
      
      // Update active ID
      if (currentElement) {
        setActiveId(currentElement.id);
        
        // Update URL hash if enabled
        if (updateHash) {
          history.replaceState(null, '', `#${currentElement.id}`);
        }
      } else {
        setActiveId(null);
      }
    };
    
    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ids, offset, updateHash]);
  
  // Function to scroll to a section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    
    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    
    window.scrollTo({
      top: elementTop - offset,
      behavior: 'smooth',
    });
    
    // Update active ID
    setActiveId(id);
    
    // Update URL hash if enabled
    if (updateHash) {
      history.pushState(null, '', `#${id}`);
    }
  };
  
  return { activeId, scrollToSection };
}