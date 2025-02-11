
const LoadingPage = () => {
    return (
        <div className="flex items-center justify-center  w-[80vw] h-[calc(90vh-4rem)] ">
            <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-accent-500">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default LoadingPage
