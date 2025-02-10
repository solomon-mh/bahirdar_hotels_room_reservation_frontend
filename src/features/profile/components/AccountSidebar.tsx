import { Link, useLocation } from "react-router-dom";
import { IDataAccountSidebar } from "../Account";

export const AccountSidebar = ({ data }: { data: IDataAccountSidebar[] }) => {
  const { pathname } = useLocation();

  return (
    <ul className="hidden md:flex w-[250px] min-w-[250px] flex-col gap-0 space-y-2 border-r-2 border-light-400 text-gray-700">
      {data.map((item, i) => (
        <li key={i}>
          <Link
            to={item.to}
            className={`flex w-full items-center rounded-md px-4 py-2 transition-all duration-200 hover:bg-light-200 ${pathname === item.pathname ? "bg-light-300" : ""}`}
          >
            {item.text}
          </Link>
        </li>
      ))}
    </ul>
  );
};
