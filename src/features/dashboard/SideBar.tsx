import { Link, useLocation } from "react-router-dom";
import Logo from "../../ui/Logo";
interface Props {
  menus: { title: string; url: string; Icon: JSX.Element }[];
}
function SideBar({ menus }: Props) {
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-screen w-[260px] flex-col gap-2 bg-accent-100/40 py-4 text-white">
      <Logo className="text-white" />

      <hr className="border-b-2 border-gray-700" />

      <nav className="mt-4 uppercase transition">
        <ul>
          {menus.map((menu, i) => (
            <li key={i}>
              <Link
                key={menu.title}
                className={"flex items-center gap-3 rounded-sm px-5 py-2 hover:text-slate-100 hover:bg-accent-400 " + (pathname === menu.url ? " bg-accent-500 text-slate-100" : "")}
                to={menu.url}
              >
                <span className={"text-accent-500" + (pathname === menu.url ? " text-slate-100" : "")}>
                  {menu.Icon}
                </span>
                <span>{menu.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default SideBar;
