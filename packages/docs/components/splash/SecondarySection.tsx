import HeroFlow from '../demos/HeroFlow'
import NodeDemo from '../demos/NodeDemo'

export default () => {
  return (
    <div className="w-full flex justify-center bg-gray-800">
      <div className="flex flex-col md:flex-row w-full max-w-6xl justify-end">
        <section className="flex flex px-4 sm:px-6 lg:px-8 my-8">
          <div
            className="mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:pl-8 flex flex-col lg:flex-row">
            <div className="sm:text-center lg:text-left">
              <div className="select-none text-2xl tracking-tight font-extrabold text-gray-50 sm:text-4xl md:text-4xl">
                <div className="text-gray-50">We have Nodes 😎</div>
                <div className="text-gray-50 text-xl sm:text-2xl">Lets go</div>
              </div>
              <div>
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
          </div>
        </section>
      </div>
    </div>
  )
}