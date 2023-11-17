import Hero from '../demos/Hero'
import NodeDemo from '../demos/NodeDemo'

export default () => {
  return (<div>
    {/* <div className="flex flex-col md:flex-row w-full">
      <div className="bg-red-500 w-full md:w-auto">Rött</div>
      <div className="bg-green-500 w-full md:w-auto">Grönt</div>
    </div> */}
    <div className="flex flex-col md:flex-row w-full h-screen">
      <section className="absolute z-10 flex w-1/2 z-50 top-24 flex-initial mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="my-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:pl-8 flex gap-3 lg:flex-justify lg:flex flex-col lg:flex-row">
          <div className="sm:text-center lg:text-left">
            <div className="select-none text-2xl tracking-tight font-extrabold text-gray-800 sm:text-4xl md:text-4xl">
              {/* <div className="text-xl lg:text-3xl mb-8 whitespace-nowrap overflow:auto">real-time data workflows</div> */}
              <div className="text-indigo-600">Realtime Automation</div>
              <div className="text-indigo-600">for React and NodeJS</div>
            </div>
            {/* <p
              className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Build, visualize and execute <span className="italic">your</span> business case with React and NodeJS.
            </p> */}
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a href="/docs"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600 md:py-4 md:text-lg md:px-10">
                    Docs
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a href="/playground"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                    Playground
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex w-full min-w-sm h-64 mt-16 mr-8">
        <Hero />
      </div>
    </div>
    {/* <div>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-2xl text-gray-800 font-bold">We have all the Nodes!</div>
      </div>
      <div className="flex">
        <div className="flex-1">
          <NodeDemo nodeName={'Signal'} />
        </div>
        <div className="flex-1">
          <NodeDemo nodeName={'Merge'} />
        </div>
        <div className="flex-1">
          <NodeDemo nodeName={'Filter'} />
        </div>
        <div className="flex-1">
          <NodeDemo nodeName={'Request'} />
        </div>                        
      </div>
    </div>
    <div className="w-full bg-amber-500">
      Show some code example
    </div>
    <div className="py-24 px-24 w-full bg-blue-800 flex">
      <Hero />
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-xl text-gray-50">Do frontend</div>
      </div>
    </div>
    <div className="py-24 px-24 w-full bg-blue-800 flex">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-xl text-gray-50">Do backend</div>
      </div>
      <Hero />
    </div>
    <div className="py-24 px-24 w-full bg-blue-800 flex">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-xl text-gray-50">Do your business</div>
      </div>
      <Hero />
    </div>         */}
  </div>)
}