const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-indigo-600">
          ReactApp
        </h1>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-8 font-medium">
          <li>
            <a href="#home" className="hover:text-indigo-600 transition">
              Home
            </a>
          </li>

          <li>
            <a href="#about" className="hover:text-indigo-600 transition">
              About
            </a>
          </li>

          <li>
            <a href="#services" className="hover:text-indigo-600 transition">
              Services
            </a>
          </li>

          <li>
            <a href="#contact" className="hover:text-indigo-600 transition">
              Contact
            </a>
          </li>
        </ul>

        {/* Button */}
        <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
          Get Started
        </button>

      </nav>
    </header>
  );
};

export default Header;