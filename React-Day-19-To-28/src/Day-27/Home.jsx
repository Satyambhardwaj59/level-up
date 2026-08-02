import React, { useRef, useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from './components/Modal';
import { Accordion, AccordionItem } from './components/Accordion';
import { Tabs, TabList, Tab, TabPanel } from './components/Tabs';
import { Tooltip } from './components/Tooltip';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from './components/Dropdown';
import { useToggle, useLocalStorage } from './hooks';
import { 
  FaHome, 
  FaUser, 
  FaCog, 
  FaInfoCircle,
  FaHeart,
  FaStar,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaMoon,
  FaSun,
} from 'react-icons/fa';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const modalRef = useRef(null);
  const tooltipRef = useRef(null);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-primary-dark transition-colors duration-300">
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-highlight to-pink-500 bg-clip-text text-transparent">
          UI Component Library
        </h1>

        {/* Theme Toggle */}
        <div className="flex justify-end mb-8">
          <button
            onClick={toggleTheme}
            className="p-3 bg-white dark:bg-secondary-dark rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {theme === 'light' ? (
              <FaMoon className="text-2xl text-gray-600" />
            ) : (
              <FaSun className="text-2xl text-yellow-400" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Modal Section */}
            <section className="bg-white dark:bg-secondary-dark rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Modal</h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-primary"
              >
                Open Modal
              </button>

              <Modal
                ref={modalRef}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Welcome to the Modal"
                size="lg"
              >
                <ModalBody>
                  <p className="text-gray-600 dark:text-gray-300 ">
                    This is a fully featured modal component with:
                  </p>
                  <ul className="mt-4 space-y-2 text-gray-600  dark:text-gray-300">
                    <li className="flex items-center gap-2">
                      <FaCheck className="text-green-500 max-h-20" />
                      Close on outside click
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheck className="text-green-500 max-h-20" />
                      Close with Escape key
                    </li>
                    <li className="flex items-center  gap-2">
                      <FaCheck className="text-green-500 max-h-20" />
                      Portal implementation
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheck className="text-green-500 max-h-20" />
                      ForwardRef support
                    </li>
                  </ul>
                </ModalBody>
                <ModalFooter>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      alert('Confirmed!');
                      setIsModalOpen(false);
                    }}
                    className="btn-primary"
                  >
                    Confirm
                  </button>
                </ModalFooter>
              </Modal>
            </section>

            {/* Accordion Section */}
            <section className="bg-white dark:bg-secondary-dark rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Accordion</h2>
              <Accordion allowMultiple defaultOpen={[0]}>
                <AccordionItem title="What is a UI Component Library?" icon={<FaInfoCircle />}>
                  <p className="text-gray-600 dark:text-gray-300">
                    A UI component library is a collection of reusable components that can be used 
                    to build user interfaces quickly and consistently.
                  </p>
                </AccordionItem>
                <AccordionItem title="Why use reusable components?" icon={<FaStar />}>
                  <p className="text-gray-600 dark:text-gray-300">
                    Reusable components help maintain consistency, reduce code duplication, and 
                    speed up development by providing pre-built, tested functionality.
                  </p>
                </AccordionItem>
                <AccordionItem title="What's included in this library?" icon={<FaHeart />}>
                  <p className="text-gray-600 dark:text-gray-300">
                    This library includes Modal, Accordion, Tabs, Tooltip, Dropdown components 
                    along with custom hooks like useToggle, useClickOutside, and useLocalStorage.
                  </p>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Tabs Section */}
            <section className="bg-white dark:bg-secondary-dark rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Tabs</h2>
              <Tabs defaultActiveTab={0}>
                <TabList>
                  <Tab><FaHome className="inline mr-2" /> Home</Tab>
                  <Tab><FaUser className="inline mr-2" /> Profile</Tab>
                  <Tab><FaCog className="inline mr-2" /> Settings</Tab>
                </TabList>
                <TabPanel>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Home Tab</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Welcome to the home tab. This is the content for the first tab.
                  </p>
                </TabPanel>
                <TabPanel>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Profile Tab</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Your profile information would appear here.
                  </p>
                </TabPanel>
                <TabPanel>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Settings Tab</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Configure your application settings here.
                  </p>
                </TabPanel>
              </Tabs>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Tooltip Section */}
            <section className="bg-white dark:bg-secondary-dark rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Tooltip</h2>
              <div className="flex flex-wrap gap-6">
                <Tooltip content="This is a top tooltip" position="top">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Top
                  </button>
                </Tooltip>
                <Tooltip content="This is a bottom tooltip" position="bottom">
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    Bottom
                  </button>
                </Tooltip>
                <Tooltip content="This is a left tooltip" position="left">
                  <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                    Left
                  </button>
                </Tooltip>
                <Tooltip content="This is a right tooltip" position="right">
                  <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                    Right
                  </button>
                </Tooltip>
                <Tooltip 
                  ref={tooltipRef}
                  content="This tooltip can be controlled programmatically"
                  position="top"
                >
                  <button 
                    onClick={() => tooltipRef.current?.toggle()}
                    className="px-4 py-2 bg-highlight text-white rounded-lg hover:bg-highlight/90 transition-colors"
                  >
                    Toggle Tooltip
                  </button>
                </Tooltip>
              </div>
            </section>

            {/* Dropdown Section */}
            <section className="bg-white dark:bg-secondary-dark rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Dropdown</h2>
              <div className="flex flex-wrap gap-4">
                <Dropdown placement="bottom-start">
                  <DropdownToggle>
                    <FaUser /> Profile
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem icon={<FaUser />}>View Profile</DropdownItem>
                    <DropdownItem icon={<FaCog />}>Settings</DropdownItem>
                    <DropdownItem icon={<FaHeart />}>Favorites</DropdownItem>
                    <DropdownItem icon={<FaEnvelope />}>Messages</DropdownItem>
                    <hr className="my-2 border-gray-200 dark:border-gray-700" />
                    <DropdownItem icon={<FaSignOutAlt />} className="text-red-500">
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                <Dropdown placement="bottom-end">
                  <DropdownToggle className="bg-highlight text-white hover:bg-highlight/90">
                    <FaStar /> Actions
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem icon={<FaGithub />}>GitHub</DropdownItem>
                    <DropdownItem icon={<FaTwitter />}>Twitter</DropdownItem>
                    <DropdownItem icon={<FaLinkedin />}>LinkedIn</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </section>

            {/* Custom Hooks Section */}
            <section className="bg-white dark:bg-secondary-dark rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Custom Hooks</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="font-semibold text-gray-800 dark:text-white">useToggle</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    🔄 Manage boolean state with toggle, setOn, setOff methods
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="font-semibold text-gray-800 dark:text-white">useClickOutside</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    👆 Detect clicks outside a component (used in Modal & Dropdown)
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="font-semibold text-gray-800 dark:text-white">useLocalStorage</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    💾 Persist data in localStorage (used for theme preference)
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-secondary-dark rounded-2xl shadow-xl p-6 text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-bold text-gray-800 dark:text-white">Reusable Components</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              All components are built with reusability in mind
            </p>
          </div>
          <div className="bg-white dark:bg-secondary-dark rounded-2xl shadow-xl p-6 text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-bold text-gray-800 dark:text-white">Performance</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Optimized with React.memo, useCallback, useMemo
            </p>
          </div>
          <div className="bg-white dark:bg-secondary-dark rounded-2xl shadow-xl p-6 text-center">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="font-bold text-gray-800 dark:text-white">Dark/Light Mode</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Full dark mode support with Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for icons
const FaSignOutAlt = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h7a1 1 0 001-1V4a1 1 0 00-1-1H3zm4.5 5.5a.5.5 0 00-.5.5v1.5a.5.5 0 001 0V9a.5.5 0 00-.5-.5z" clipRule="evenodd" />
    <path d="M9 9a1 1 0 100 2 1 1 0 000-2z" />
    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h4a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1V5z" clipRule="evenodd" />
  </svg>
);

const FaCheck = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

export default Home;