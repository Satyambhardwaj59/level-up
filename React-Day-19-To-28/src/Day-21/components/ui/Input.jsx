const Input = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default Input;