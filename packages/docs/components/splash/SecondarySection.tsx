import HeroFlow from '../demos/HeroFlow'
import NodeDemo from '../demos/NodeDemo'

export default () => {
  return (
    <div className="w-full flex justify-center bg-gray-800 skew-x-3 skew-y-3">
      <div className="flex flex-col md:flex-row w-full max-w-6xl justify-end -skew-x-3 -skew-y-3">     
        <section className="flex flex px-4 sm:px-6 lg:px-8 my-8">
          <div
            className="mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:pl-8 flex lg:flex-justify lg:flex flex-col lg:flex-row">
            <div className="sm:text-center lg:text-left">
              <div className="select-none text-2xl tracking-tight font-extrabold text-gray-50 sm:text-4xl md:text-4xl">
                <div className="text-gray-50">We have Nodes</div>
                <div className="text-gray-50">Lets go</div>
              </div>
            </div>
          </div>
        </section>        
      </div>
    </div>
  )
}