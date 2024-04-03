import { Diagram } from './Diagram';
import { Link } from './types/Link';

export const syncPortSchemas = (link: Link, diagram: Diagram) => {
  const sourceNode = diagram.nodeWithOutputPortId(link.sourcePortId)
  const sourcePort = sourceNode?.outputs.find(output => output.id === link.sourcePortId)
  if(!sourcePort) return

  const links = diagram.linksAtOutputPortId(link.sourcePortId)

  links.forEach(link => {
    const targetNode = diagram.nodeWithInputPortId(link.targetPortId)
    const incomingSchema = sourcePort.schema

    const inputPort = targetNode?.inputs.find(input => input.id === link.targetPortId)
    if(!inputPort) return

    inputPort.schema = incomingSchema ?? {}
  })
}