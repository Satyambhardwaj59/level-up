import React, { useCallback, forwardRef, useImperativeHandle } from 'react';
import { useClickOutside, useToggle } from '../../hooks';

const Dropdown = forwardRef(({
  children,
  isOpen: controlledOpen,
  onToggle,
  onOpen,
  onClose,
  className = '',
  closeOnOutsideClick = true,
  closeOnItemClick = true,
  placement = 'bottom-start', // bottom-start, bottom-end, top-start, top-end
}, ref) => {
  const { state: internalOpen, toggle: toggleInternal, setOn, setOff } = useToggle(false);
  
  // Use controlled or uncontrolled state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  
  const handleToggle = useCallback(() => {
    if (controlledOpen === undefined) {
      toggleInternal();
    }
    if (onToggle) {
      onToggle(!isOpen);
    }
    if (!isOpen && onOpen) {
      onOpen();
    }
    if (isOpen && onClose) {
      onClose();
    }
  }, [controlledOpen, isOpen, toggleInternal, onToggle, onOpen, onClose]);

  const handleClose = useCallback(() => {
    if (controlledOpen === undefined) {
      setOff();
    }
    if (onClose) {
      onClose();
    }
  }, [controlledOpen, setOff, onClose]);

  const clickOutsideRef = useClickOutside(() => {
    if (closeOnOutsideClick && isOpen) {
      handleClose();
    }
  }, isOpen);

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    open: () => {
      if (controlledOpen === undefined) setOn();
      if (onOpen) onOpen();
    },
    close: handleClose,
    toggle: handleToggle,
    isOpen: () => isOpen,
  }));

  // Clone children to inject props
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type.displayName === 'DropdownToggle' || child.type.name === 'DropdownToggle') {
        return React.cloneElement(child, {
          isOpen,
          onToggle: handleToggle,
        });
      }
      if (child.type.displayName === 'DropdownMenu' || child.type.name === 'DropdownMenu') {
        return React.cloneElement(child, {
          isOpen,
          onClose: handleClose,
          closeOnItemClick,
          placement,
        });
      }
    }
    return child;
  });

  return (
    <div 
      ref={clickOutsideRef}
      className={`relative inline-block ${className}`}
    >
      {enhancedChildren}
    </div>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;