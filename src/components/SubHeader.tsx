interface Props {
    children: React.ReactNode
}
const SubHeader = ({ children }: Props) => {
    return (
        <div className="flex  p-2 items-center w-full shadow-md gap-6">
            {
                children
            }
        </div>
    )
}

export default SubHeader
