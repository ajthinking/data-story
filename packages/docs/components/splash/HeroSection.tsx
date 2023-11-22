import HeroFlow from '../demos/HeroFlow'
import NodeDemo from '../demos/NodeDemo'

export default () => {
  return (
    <div className="flex flex-col md:flex-row w-full max-w-8xl mx-auto h-screen">     
      <section className="flex flex mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:pl-8 flex lg:flex-justify lg:flex flex-col lg:flex-row">
          <div className="sm:text-center lg:text-left">
            <div className="select-none text-2xl tracking-tight font-extrabold text-gray-800 sm:text-4xl md:text-4xl">
              <div className="text-indigo-600">Realtime Automation</div>
              <div className="text-indigo-600">for React and NodeJS</div>
            </div>
            <div className="mt-5 sm:mt-8 flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a href="/docs"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600 md:py-4 md:text-lg md:px-10">
                    Docs
                </a>
              </div>
              <div className="sm:mt-0 sm:ml-3">
                <a href="/playground"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                    Playground
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>          
      <div className="flex flex-1 flex-initial w-full min-w-sm h-64 mt-16 mr-8">
        <HeroFlow />
      </div>        
    </div>
  )
}