import Hero from '../components/demos/Hero'
import NodeDemo from '../components/demos/NodeDemo'

export default function Home() {
  return (<div>
    <div className="flex w-full">
      <section className="h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="my-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:pl-8 flex gap-3 lg:flex-justify lg:flex flex-col lg:flex-row">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Do you even compute?</span>
              <span className="block text-indigo-600 xl:inline"> {'<DataStory />'}</span>
            </h1>
            <p
              className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Build, visualize and execute on <span className="italic">your</span> business problems.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600 md:py-4 md:text-lg md:px-10">
                    What is this?
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                    Playground
                </a>
              </div>
            </div>
          </div>

          <div className="lg:inset-y-0 lg:right-0 lg:w-1/2 my-4">
            {/* <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" alt=""> */}
          </div>
        </div>

      </section>
    
      <Hero />
    </div>
    <div>
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
    </div>        
  </div>)
}