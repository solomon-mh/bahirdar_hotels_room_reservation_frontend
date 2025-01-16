import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

type RefObject = { current: HTMLElement | null };
type Handler = () => void;

export const useOnClickOutside = ({ handler, refs }: { handler: Handler; refs: RefObject[] }) => {
  const { isOpenModal } = useAuthContext();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        refs.every((ref) => !ref.current?.contains(e.target as Node)) &&
        isOpenModal
      ) {
        handler();
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [handler, refs, isOpenModal]);
};
