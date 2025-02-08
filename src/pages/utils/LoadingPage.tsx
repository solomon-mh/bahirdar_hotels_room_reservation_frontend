
const LoadingPage = () => {
    return (
        <div className="flex items-center justify-center  w-[80vw] h-[calc(100vh-4rem)] ">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default LoadingPage
