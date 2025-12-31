export default function Seat({
  seatNumber,
  status,
  selected,
  disabled,
  onClick,
}) {
  const isBooked = status === "BOOKED";

  let className =
    "w-8 h-8 rounded-md text-xs font-semibold flex items-center justify-center transition";

  if (isBooked) {
    className += " bg-gray-300 cursor-not-allowed";
  } else if (selected) {
    className += " bg-green-600 text-white";
  } else if (disabled) {
    className += " bg-blue-300 cursor-not-allowed text-white";
  } else {
    className += " bg-blue-600 hover:bg-blue-700 text-white";
  }

  return (
    <button
      type="button"
      disabled={isBooked || disabled}
      onClick={onClick}
      className={className}
    >
      {seatNumber}
    </button>
  );
}
