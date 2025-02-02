import { Outlet } from "react-router-dom"

const HotelsPage = () => {
    return (
        <div className="flex w-full px-4 h-full bg-slate-200/50">
            <Outlet />
        </div>
    )
}

export default HotelsPage
