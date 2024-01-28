import HeroFlow from '../demos/HeroFlow'
import NodeDemo from '../demos/NodeDemo'

export default () => {
  return (
    <div className="w-full flex justify-center pb-16">
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto">
        <section className="lowercase font-mono flex w-full justify-around px-4 sm:px-6 lg:px-8 my-8">
          <div className="">
            <div className="font-bold tracking-wide text-2xl text-gray-50">161</div>
          </div>
          <div className="">
            <div className="font-bold tracking-wide text-2xl text-gray-50">MIT</div>
          </div>
          <div className="">
            <div className="font-bold tracking-wide text-2xl text-gray-50">Yes</div>
          </div>
          <div className="">
            <div className="font-bold tracking-wide text-2xl text-gray-50">24</div>
          </div>
        </section>
      </div>
    </div>
  )
}