import React, { Children, cloneElement } from 'react';

const DropdownMenu = ({
  children,
  isOpen,
  onClose,
  closeOnItemClick = true,
  placement = 'bottom-start',
  className = '',
}) => {
  const placementClasses = {
    'bottom-start': 'top-full left-0 mt-2',
    'bottom-end': 'top-full right-0 mt-2',
    'top-start': 'bottom-full left-0 mb-2',
    'top-end': 'bottom-full right-0 mb-2',
  };

  // Clone children to inject onClose prop
  const enhancedChildren = Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return cloneElement(child, {
        onClick: (e) => {
          if (child.props.onClick) {
            child.props.onClick(e);
          }
          if (closeOnItemClick) {
            onClose();
          }
        },
      });
    }
    return child;
  });

  if (!isOpen) return null;

  return (
    <div 
      className={`absolute z-50 min-w-[200px] py-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-slide-down ${placementClasses[placement]} ${className}`}
      role="menu"
    >
      {enhancedChildren}
    </div>
  );
};

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;