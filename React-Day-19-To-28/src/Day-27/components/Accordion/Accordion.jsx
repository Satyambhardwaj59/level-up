import React, { useState, useCallback, Children, cloneElement } from 'react';

const Accordion = ({ 
  children, 
  allowMultiple = false, 
  defaultOpen = [],
  className = '',
  onChange,
}) => {
  const [openItems, setOpenItems] = useState(
    Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen]
  );

  const handleToggle = useCallback((index) => {
    setOpenItems(prev => {
      let newOpenItems;
      if (allowMultiple) {
        newOpenItems = prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index];
      } else {
        newOpenItems = prev.includes(index) ? [] : [index];
      }
      
      if (onChange) {
        onChange(newOpenItems);
      }
      
      return newOpenItems;
    });
  }, [allowMultiple, onChange]);

  // Inject props into children
  const enhancedChildren = Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return cloneElement(child, {
        isOpen: openItems.includes(index),
        onToggle: () => handleToggle(index),
        index,
      });
    }
    return child;
  });

  return (
    <div className={`space-y-2 ${className}`}>
      {enhancedChildren}
    </div>
  );
};

export default Accordion;