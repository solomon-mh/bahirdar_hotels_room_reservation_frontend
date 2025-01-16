
interface Props {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}
function SortBy({ handleChange, options }: Props) {
  return (
    <select
      className="rounded-full px-4 py-2 transition-all duration-200 hover:scale-105 hover:cursor-pointer active:scale-105"
      onChange={handleChange}
    >
      {options.map((option, i) => (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SortBy;
