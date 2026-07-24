import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

        {/* Logo */}
        <div>
          <h2 className="text-3xl font-bold text-white">
            ReactApp
          </h2>

          <p className="mt-4 leading-7">
            Build modern React applications with clean code,
            responsive layouts, and best practices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3">
            <li>
              <a href="#home" className="hover:text-white">
                Home
              </a>
            </li>

            <li>
              <a href="#about" className="hover:text-white">
                About
              </a>
            </li>

            <li>
              <a href="#services" className="hover:text-white">
                Services
              </a>
            </li>

            <li>
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Services
          </h3>

          <ul className="space-y-3">
            <li>Frontend Development</li>
            <li>Backend Development</li>
            <li>Full Stack Projects</li>
            <li>UI/UX Design</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Follow Us
          </h3>

          <div className="flex gap-4 text-2xl">

            <a
              href="#"
              className="hover:text-blue-500 transition"
            >
              <FaFacebook />
            </a>

            <a
              href="#"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="hover:text-blue-400 transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="#"
              className="hover:text-white transition"
            >
              <FaGithub />
            </a>

          </div>

          <p className="mt-6">
            Email: info@reactapp.com
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-slate-700 text-center py-5">
        © {new Date().getFullYear()} Satyam Bhardwaj. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;