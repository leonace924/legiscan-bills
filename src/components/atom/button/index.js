const Button = ({ type, children, ...props }) => {
  return (
    <button
      type={type}
      className="px-6 py-2 text-sm text-white duration-300 bg-gray-700 rounded-md rounded-r shadow hover:bg-gray-500"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
