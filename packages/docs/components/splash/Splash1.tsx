import Hero from '../demos/Hero'
import NodeDemo from '../demos/NodeDemo'

export default () => {
  return (
    <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto h-screen">
      <div className="flex w-full min-w-sm h-64">
        <Hero />
      </div>
    </div>
  )
}