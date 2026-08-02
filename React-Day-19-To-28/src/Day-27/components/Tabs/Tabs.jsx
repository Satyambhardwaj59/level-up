import React, { useState, useCallback, Children, cloneElement } from 'react';

const Tabs = ({ 
  children, 
  defaultActiveTab = 0,
  activeTab: controlledActiveTab,
  onChange,
  className = '',
  variant = 'default', // 'default' | 'pills' | 'underline'
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  // Use controlled or uncontrolled state
  const currentActiveTab = controlledActiveTab !== undefined ? controlledActiveTab : activeTab;

  const handleTabChange = useCallback((index) => {
    if (controlledActiveTab === undefined) {
      setActiveTab(index);
    }
    if (onChange) {
      onChange(index);
    }
  }, [controlledActiveTab, onChange]);

  // Find TabList and TabPanel components
  let tabList = null;
  const tabPanels = [];

  Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type.displayName === 'TabList' || child.type.name === 'TabList') {
        tabList = child;
      } else if (child.type.displayName === 'TabPanel' || child.type.name === 'TabPanel') {
        tabPanels.push(child);
      }
    }
  });

  // Enhance TabList with active tab and onChange
  const enhancedTabList = tabList ? cloneElement(tabList, {
    activeTab: currentActiveTab,
    onTabChange: handleTabChange,
    variant,
  }) : null;

  // Render active TabPanel
  const activePanel = tabPanels[currentActiveTab];

  return (
    <div className={className}>
      {enhancedTabList}
      {activePanel}
    </div>
  );
};

export default Tabs;