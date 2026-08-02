

const TabPanel = ({ 
  children, 
  className = '',
}) => {
  return (
    <div className={`p-4 animate-fade-in ${className}`}>
      {children}
    </div>
  );
};

TabPanel.displayName = 'TabPanel';

export default TabPanel;