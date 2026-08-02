import { forwardRef, useImperativeHandle, useRef } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const AccordionItem = forwardRef(({
  title,
  children,
  isOpen = false,
  onToggle,
  icon = null,
  className = '',
  titleClassName = '',
  contentClassName = '',
}, ref) => {
  const contentRef = useRef(null);

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    toggle: onToggle,
    open: () => onToggle(true),
    close: () => onToggle(false),
    getContentHeight: () => contentRef.current?.scrollHeight,
  }));

  return (
    <div className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden ${className}`}>
      {/* Header */}
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${titleClassName}`}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-highlight">{icon}</span>}
          <span className="font-medium text-gray-800 dark:text-white">{title}</span>
        </div>
        <span className="text-gray-500 dark:text-gray-400">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>

      {/* Content */}
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className={`p-4 bg-white dark:bg-secondary-dark ${contentClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
});

AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;