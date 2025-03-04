import React from 'react';
import { useScrollSpy } from '../lib/hooks/useScrollSpy';

interface SidebarProps {
  sections: {
    id: string;
    title: string;
    subsections?: {
      id: string;
      title: string;
    }[];
  }[];
}

const Sidebar: React.FC<SidebarProps> = ({ sections }) => {
  // Get all section and subsection IDs
  const allIds = sections.flatMap(section => 
    [section.id, ...(section.subsections?.map(sub => sub.id) || [])]
  );
  
  const { activeId, scrollToSection } = useScrollSpy({ ids: allIds });
  
  return (
    <aside className="w-64 flex-shrink-0 hidden md:block h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto py-6 px-4 bg-sidebar border-r border-border">
      <div className="mb-6">
        <h3 className="text-xs uppercase font-semibold tracking-wider text-muted-foreground mb-4 px-2">Components</h3>
        <div className="h-px bg-sidebar-muted mb-4"></div>
      </div>
      
      <nav className="space-y-1">
        {sections.map((section) => (
          <div key={section.id} className="mb-4">
            <button
              onClick={() => scrollToSection(section.id)}
              className={`flex items-center w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeId === section.id
                  ? 'bg-sidebar-active text-sidebar-active-foreground'
                  : 'hover:bg-muted text-sidebar-foreground'
              }`}
            >
              {section.title}
            </button>
            
            {section.subsections && (
              <div className="mt-1 ml-3 pl-2 border-l border-sidebar-muted space-y-1">
                {section.subsections.map((subsection) => (
                  <button
                    key={subsection.id}
                    onClick={() => scrollToSection(subsection.id)}
                    className={`block w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                      activeId === subsection.id
                        ? 'text-sidebar-active-foreground font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {subsection.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;