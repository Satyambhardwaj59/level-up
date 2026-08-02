import React, { Children, cloneElement } from 'react';

const TabList = ({ 
  children, 
  activeTab, 
  onTabChange,
  variant = 'default',
  className = '',
}) => {
  const variantClasses = {
    default: 'border-b border-gray-200 dark:border-gray-700',
    pills: 'flex gap-2',
    underline: 'border-b border-gray-200 dark:border-gray-700',
  };

  const enhancedChildren = Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return cloneElement(child, {
        isActive: index === activeTab,
        onClick: () => onTabChange(index),
        variant,
        index,
      });
    }
    return child;
  });

  return (
    <div className={`flex ${variant === 'pills' ? 'flex-wrap gap-2' : 'space-x-1'} ${variantClasses[variant]} ${className}`}>
      {enhancedChildren}
    </div>
  );
};

TabList.displayName = 'TabList';

export default TabList;