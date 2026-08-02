import { useEffect, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';
import { useClickOutside } from '../../hooks';
import { FaTimes } from 'react-icons/fa';

const Modal = forwardRef(({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  closeOnOutsideClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = '',
  overlayClassName = '',
  contentClassName = '',
}, ref) => {
  const modalRef = useRef(null);
  const clickOutsideRef = useClickOutside(() => {
    if (closeOnOutsideClick && isOpen) {
      onClose();
    }
  }, isOpen && closeOnOutsideClick);

  // Merge refs
  const mergedRef = useCallback((node) => {
    modalRef.current = node;
    clickOutsideRef.current = node;
  }, [clickOutsideRef]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (closeOnEscape && event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, closeOnEscape]);

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    close: onClose,
    open: () => {},
    getElement: () => modalRef.current,
  }));

  // Size classes
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in ${overlayClassName}`}
      onClick={(e) => {
        if (e.target === e.currentTarget && closeOnOutsideClick) {
          onClose();
        }
      }}
    >
      <div 
        ref={mergedRef}
        className={`bg-white dark:bg-secondary-dark rounded-2xl shadow-2xl w-full ${sizeClasses[size]} animate-scale-in ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            {title && (
              <h2 id="modal-title" className="text-xl font-bold text-gray-800 dark:text-white">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Close modal"
              >
                <FaTimes className="text-gray-500 dark:text-gray-400 text-xl" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className={`p-4 ${contentClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );

  // Use portal for better accessibility and z-index management
  return ReactDOM.createPortal(
    modalContent,
    document.body
  );
});

Modal.displayName = 'Modal';

export default Modal;