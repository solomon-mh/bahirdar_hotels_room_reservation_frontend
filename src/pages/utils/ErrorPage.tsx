
interface Props {
    children: React.ReactNode;
}
const ErrorPage = ({ children }: Props) => {
    return (
        <div className="flex text-red-400 items-center justify-center h-[calc(100vh-4rem)] w-full">
            {children}
        </div>
    )
}

export default ErrorPage
