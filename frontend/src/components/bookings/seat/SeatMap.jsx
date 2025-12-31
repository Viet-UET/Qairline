import Seat from "./Seat";
import SeatLegend from "./SeatLegend";
import { DoorClosed } from "lucide-react";
import { Tooltip } from "@nextui-org/react";

const SeatMap = ({
  seats = [],
  selectedSeats = [],
  onSeatSelect,
  maxSeats = 1,
}) => {
  const rows = seats.reduce((acc, s) => {
    const match = s.seat_number.match(/\d+/);
    if (!match) return acc;
    const row = match[0];
    acc[row] = acc[row] || [];
    acc[row].push(s);
    return acc;
  }, {});

  return (
    <div className="border border-[#D9D9D9] rounded-2xl p-4 bg-white">
      <SeatLegend />

      <div className="flex justify-center my-3 text-gray-400">
        <DoorClosed size={26} />
      </div>

      <div className="flex flex-col items-center gap-3 max-h-[420px] overflow-y-auto">
        {Object.entries(rows).map(([row, rowSeats]) => {
          const left = rowSeats.slice(0, 3);
          const right = rowSeats.slice(3);

          return (
            <div key={row} className="flex items-center gap-6">
              <div className="flex gap-2">
                {left.map((s) => {
                  const selected = selectedSeats.some(
                    (x) => x.seat_id === s.seat_id
                  );

                  const disabled =
                    !selected && selectedSeats.length >= maxSeats;

                  return (
                    <Tooltip
                      key={s.seat_id}
                      content={`${s.seat_number} – ${Number(s.price).toLocaleString("vi-VN")} đ`}
                    >
                      <div>
                        <Seat
                          seatNumber={s.seat_number}
                          status={s.status}
                          selected={selected}
                          disabled={disabled}
                          onClick={() => onSeatSelect(s)}
                        />
                      </div>
                    </Tooltip>
                  );
                })}
              </div>

              <div className="w-6" />

              <div className="flex gap-2">
                {right.map((s) => {
                  const selected = selectedSeats.some(
                    (x) => x.seat_id === s.seat_id
                  );

                  const disabled =
                    !selected && selectedSeats.length >= maxSeats;

                  return (
                    <Seat
                      key={s.seat_id}
                      seatNumber={s.seat_number}
                      status={s.status}
                      selected={selected}
                      disabled={disabled}
                      onClick={() => onSeatSelect(s)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeatMap;
