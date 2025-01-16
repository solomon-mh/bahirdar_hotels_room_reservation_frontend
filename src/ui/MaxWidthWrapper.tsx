import { cn } from "../utils/cn";

interface Props {
  className?: string;
  children: React.ReactNode;  // Make sure to specify the type of children prop
}
const MaxWidthWrapper = ({ className, children }: Props) => {
  return (
    <div
      className={cn(
        "mx-auto h-full w-full max-w-screen-xl px-2.5 md:px-20",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
