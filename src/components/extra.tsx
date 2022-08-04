const Extra = () => {

  return (
    <section>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          <span className="block">Would like to see more?</span>
          <span className="block text-yellow-500">Check our profile on the network.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a href="https://adapools.org/pool/dfacb4313176b700e8ce0ba88732a5d7583746ccfaf582bd12095fde" 
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-black bg-yellow-500 hover:bg-yellow-400">
              ADAPools.org
            </a>
          </div>
          <div className="inline-flex pl-5 px-2 py-4">
            <p>OR</p>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <a href="https://pooltool.io/pool/dfacb4313176b700e8ce0ba88732a5d7583746ccfaf582bd12095fde" 
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-200">
              PoolTool.io
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Extra
