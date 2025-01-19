
interface Props {
  selectedStars: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function StarRatingFilter({ selectedStars, onChange }: Props) {
  return (
    <div className="pb-5  w-[12rem]">
      <h2 className="text-slate-800 border-b px-3 py-2 w-full border-b-accent-400">Filter By Hotel Star:</h2>
      {["5", "4", "3", "2", "1"].map((star) => (
        <label className="mt-2  hover:bg-accent-100 px-3 py-1 flex items-center space-x-2" key={star}>
          <input
            type="checkbox"
            className="rounded accent-accent-600"
            value={star}
            checked={selectedStars.includes(star)}
            onChange={onChange}
          />
          <span className="text-slate-800">{star} Stars</span>
        </label>
      ))}
    </div>
  );
}

export default StarRatingFilter;
