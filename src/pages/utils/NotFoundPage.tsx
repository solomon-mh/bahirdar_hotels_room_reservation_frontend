interface Props {
    children: React.ReactNode;
}
const NotFoundPage = ({ children }: Props) => {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-4rem)] w-full">
            {children}
        </div>
    )
}

export default NotFoundPage
