
interface Props {
  selectedRoomTypes: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function RoomTypeFilter({ selectedRoomTypes, onChange }: Props) {
  return (
    <div className="pb-5">
      {["single", "double", "twin", "triple", "quad", "twin-double"].map(
        (type) => (
          <label className="mb-2 flex items-center space-x-2" key={type}>
            <input
              type="checkbox"
              className="rounded accent-blue-600"
              value={type}
              checked={selectedRoomTypes.includes(type)}
              onChange={onChange}
            />
            <span>{type}</span>
          </label>
        ),
      )}
    </div>
  );
}

export default RoomTypeFilter;
