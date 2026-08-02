

const ModalBody = ({ children, className = '' }) => {
  return (
    <div className={`py-2 ${className}`}>
      {children}
    </div>
  );
};

export default ModalBody;