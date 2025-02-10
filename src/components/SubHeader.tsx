interface Props {
    children: React.ReactNode
    className?: string
}
const SubHeader = ({ children, className }: Props) => {
    return (
        <div className={"flex  p-2 items-center w-full shadow-md gap-6 " + className} >
            {
                children
            }
        </div>
    )
}

export default SubHeader
