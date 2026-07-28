const Badge = ({ children }) => {
  return (
    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
      {children}
    </span>
  );
};

export default Badge;