import { Outlet } from "react-router-dom"

const HotelsPage = () => {
    return (
        <div className="flex w-full px-4 min-h-[90vh] h-fit  ">
            <Outlet />
        </div>
    )
}

export default HotelsPage
