

const ModalFooter = ({ children, className = '' }) => {
  return (
    <div className={`border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 flex justify-end gap-2 ${className}`}>
      {children}
    </div>
  );
};

export default ModalFooter;