const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white px-10 py-5 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Developer Portfolio</h1>

      <ul className="flex gap-8">
        <li><a href="#home">Home</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#footer">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;