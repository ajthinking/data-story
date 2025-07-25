import { Computer } from '../../types/Computer';
import { Diagram } from '../../Diagram';
import { Executor, NodeStatus } from '../../Executor';
import { PortLinkMap } from '../../types/PortLinkMap';
import { ItemValue } from '../../types/ItemValue';
import { Node, NodeId } from '../../types/Node';
import { OutputDevice } from '../../OutputDevice';
import { TestStep } from './TestStep';

import {
  doRun,
  expectError,
  expectOutput,
  expectOutputs,
  expectHooks,
  getsInput,
  getsInputs,
} from './testSteps';

import { expectDone } from './testSteps/expectDone';
import { ExecutionMemory } from '../../ExecutionMemory';
import { InputDevice } from '../../InputDevice';
import { ComputerFactory } from '../../ComputerFactory';
import { LinkId } from '../../types/Link';
import { Hook } from '../../types/Hook';
import { Param } from '../../Param';
import { ParamEvaluator } from '../../ItemWithParams/ParamEvaluator';
import { merge } from '../../utils/merge';
import { createExecutableDiagram } from '../../createExecutableDiagram';
import { NodeRunnerContext } from '../../NodeRunnerContext';

export const when = (computer: Computer) => {
  return new ComputerTester(computer)
}

export type ExpectedOutputItems = {
  [key: string]: ItemValue[]
}

export type InputValues = {
  [key: string]: ItemValue[]
}

export type ExplicitParamValues = {
  [key: string]: any
}

type TestStepArgs = any[]

export class ComputerTester {
  diagram: Diagram | null = null
  node: Node | null = null
  explicitParamValues: ExplicitParamValues = {}
  explicitParams: Partial<Param>[] = []
  steps: [TestStep, TestStepArgs][] = []
  inputs: {
    [key: string]: ItemValue[]
  } = {}
  expectedOutputs: {
    [key: string]: ItemValue[]
  } = {}
  runner: AsyncGenerator | null = null
  inputDevice: InputDevice | null = null
  outputDevice: OutputDevice | null = null
  hooksDevice: { register: (hook: Hook) => void } = { register: vi.fn() }
  memory: ExecutionMemory | null = null
  expectedErrorMessage: string | undefined
  computer: Computer

  constructor(computer: Computer) {
    this.computer = new ComputerFactory().getInstance(computer)
  }

  /**
   * After all steps have been registered, call this method to perform them 💫
   */
  async ok() {
    this.diagram = this.makeDiagram()
    this.node = this.diagram.nodes[0]
    this.memory = this.makeExecutionMemory()

    this.inputDevice = this.makeInputDevice()
    this.outputDevice = this.makeOutputDevice()

    // Initialize runner
    const context = new NodeRunnerContext(this.node!.id);
    context.status = this.computer.run({
      input: this.inputDevice,
      output: this.outputDevice,
      params: new Proxy({}, {
        get: (_, key: string) => {
          const params = this.makeParams();
          const param = params.find(p => p.name === key) as Param;
          if (!param) throw new Error(`Param "${key}" does not exist`);

          try {
            const emptyItem = {}
            const evaluator = new ParamEvaluator();
            return evaluator.evaluate(emptyItem, param, this.diagram!.params);
          } catch (error) {
            console.error('error', error);
            return param.input;
          }
        },
      }),
      hooks: {
        register: (hook: Hook) => {
          this.memory!.pushHooks([hook])
        },
      },
      node: this.node!,
      onComplete: context.registerOnComplete,
    })
    this.memory!.setNodeRunnerContext(this.node!.id, context);

    // Runner handle
    this.runner = this.memory.getNodeRunner(this.node.id)!

    // Perform the preparation and assertion steps
    for(const [step, args] of this.steps) {
      await step.handle(this, ...args)
    }
  }

  doRun(times: number = 1) {
    for(let i = 0; i < times; i++) {
      this.steps.push([doRun, []])
    }

    return this
  }

  hasDefaultParams() {
    return this; // this is already true
  }

  hasParam(param: Partial<Param>) {
    this.explicitParams.push(param)

    return this;
  }

  hasParams(params: ExplicitParamValues) {
    this.explicitParamValues = params

    return this
  }

  // TODO getsFinalInput
  // TODO getsFinalInputs

  getsInput(input: ItemValue) {
    this.steps.push([getsInput, [input]])

    return this
  }

  getsInputs(inputs: InputValues) {
    this.steps.push([getsInputs, [inputs]])

    return this
  }

  expectDone() {
    this.steps.push([expectDone, []])

    return this
  }

  expectError(message: string) {
    this.steps.push([expectError, [message]])

    return this
  }

  expectHooks(hooks: Hook[]) {
    this.steps.push([expectHooks, [hooks]])

    return this
  }

  expectOutput(output: ItemValue) {
    this.steps.push([expectOutput, [output]])

    return this
  }

  expectOutputs(outputs: ExpectedOutputItems) {
    this.steps.push([expectOutputs, [outputs]])

    return this
  }

  protected makeDiagram(): Diagram {
    // To make testing easier,replacing the dynamic id with a fixed value of 1
    const nodeId = `${this.computer.computerType}.1`
    // Create a new Node from the computer + params (TODO: this is a general need)
    const node: Node = {
      id: nodeId,
      type: this.computer.computerType,
      inputs: (this.computer.inputs || []).map(input => ({
        id: `${nodeId}.${input.name}`,
        name: input.name,
        schema: input.schema,
      })),
      outputs: (this.computer.outputs || []).map(output => ({
        id: `${nodeId}.${output.name}`,
        name: output.name,
        schema: output.schema,
      })),
      params: [],
    }

    // Create dangling links to the inputs
    const inputLinks = node.inputs.map(inputPort => ({
      id: `dangling-link-to-port-${inputPort.id}`,
      sourcePortId: 'dangling-source-port-id',
      targetPortId: `${nodeId}.${inputPort.name}`,
    }))

    // Create dangling links to the outputs
    const outputLinks = node.outputs.map(outputPort => ({
      id: `dangling-link-from-port-${outputPort.id}`,
      sourcePortId: `${nodeId}.${outputPort.name}`,
      targetPortId: 'dangling-target-port-id',
    }))

    return new Diagram({
      nodes: [node],
      links: [
        ...inputLinks,
        ...outputLinks,
      ],
    })
  }

  protected makeInputDevice() {
    const diagramClone = this.diagram!.clone()
    const executableDiagram = createExecutableDiagram(
      diagramClone,
      {},
    )

    return new InputDevice(
      {
        ...this.node!,
        params: this.makeParams(),
      },
      executableDiagram,
      this.memory!,
    )
  }

  protected makeOutputDevice() {
    let map: PortLinkMap = {}

    for(const output of this.node!.outputs) {
      const connectedLinkIds = this.diagram!
        .linksAtOutputPortId(output.id)
        .map(link => link.id)

      map[output.name] = connectedLinkIds
    }

    return new OutputDevice(map, this.memory!, this.node!)
  }

  protected makeParams(): Param[] {
    const params = this.computer.params || []

    const mergedParams = params.map(param => {
      const explicitParam = this.explicitParams.find(p => p.name === param.name)
      if(explicitParam) {
        return merge(param, explicitParam) as Param
      }

      const hasExplicitValue = this.explicitParamValues.hasOwnProperty(param.name)
      if(hasExplicitValue) {
        const mergedParam = { ...param };
        mergedParam.input = param.type === 'StringableParam' ?  {
          ...param.input,
          rawValue: this.explicitParamValues[param.name],
        } : this.explicitParamValues[param.name];

        return mergedParam;
      }

      return param;
    })

    return mergedParams;
  }

  protected makeExecutionMemory() {
    // Maps
    const nodeStatuses = new Map<NodeId, NodeStatus>();
    const linkItems = new Map<LinkId, ItemValue[]>();
    const linkCounts = new Map<LinkId, number>();
    const nodeRunnerContexts = new Map<NodeId, NodeRunnerContext>();

    // The memory object
    const memory = new ExecutionMemory({
      nodeStatuses,
      nodeRunnerContexts,
      linkItems,
      linkCounts,
      // TODO inputDevice
    })

    // Configure memory initial state
    for(const link of this.diagram!.links) {
      // Set all links to be empty
      linkItems.set(link.id, [])
      linkCounts.set(link.id, 0)
    }

    for(const node of this.diagram!.nodes) {
      // Set all nodes to available
      nodeStatuses.set(node.id, 'AVAILABLE')
    }

    return memory
  }
}
