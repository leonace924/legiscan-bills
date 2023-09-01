import clsx from "clsx";

const TextInput = ({ id, label, className, type, name, ...props }) => {
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        className={clsx(
          "flex-1 p-2 bg-gray-200/80 rounded-md shadow-inner border border-gray-500 text-sm",
          className
        )}
        id={id}
        type={type}
        aria-label={name}
        {...props}
      />
    </div>
  );
};

export default TextInput;
