export function generateFakeSeats({
  rows = 12,
  cols = ["A", "B", "C", "D", "E", "F"],
  seatClass = "Economy",
  bookedRate = 0.15,
}) {
  let id = 1;
  const seats = [];

  const price =
    seatClass === "First Class"
      ? 9964000
      : seatClass === "Business"
      ? 4880000
      : 2042000;

  for (let r = 1; r <= rows; r++) {
    for (const c of cols) {
      seats.push({
        seat_id: id++,
        seat_number: `${r}${c}`,
        status: Math.random() < bookedRate ? "BOOKED" : "AVAILABLE",
        class: seatClass,
        price,
      });
    }
  }

  return seats;
}
