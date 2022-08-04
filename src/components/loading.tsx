
const Loading = () => {
    return (
        <div className="p-4 max-w-sm w-full mx-auto space-x-4">
            <img src="/images/logo-dark.svg" alt="logo" className="animate-spin h-5 w-5 mr-3 float-left hidden dark:block" />
            <img src="/images/logo.svg" alt="logo" className="animate-spin h-5 w-5 mr-3 float-left dark:hidden" />
            <span>Loading...</span>
        </div>
    )
}

export default Loading