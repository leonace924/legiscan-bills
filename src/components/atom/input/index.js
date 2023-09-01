import clsx from "clsx";

const TextInput = ({
  label,
  className,
  type,
  name,
  validation,
  register,
  errors,
  ...props
}) => {
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        className={clsx(
          "flex-1 p-2 bg-gray-200/80 rounded-md shadow-inner border border-gray-500 text-sm duration-300",
          className,
          errors && "border-red-500 focus:border-red-500 outline-red-500"
        )}
        type={type}
        aria-label={name}
        {...register(name, validation)}
        {...props}
      />
    </div>
  );
};

export default TextInput;
