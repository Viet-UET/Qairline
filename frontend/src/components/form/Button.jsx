export default function Button({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-2 rounded-lg transition 
        ${disabled ? "bg-gray-300" : "bg-qa-green hover:bg-green-700 text-white"} 
        ${className}`}
    >
      {children}
    </button>
  );
}
