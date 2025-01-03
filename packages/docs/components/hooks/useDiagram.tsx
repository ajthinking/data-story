import { Application, coreNodeProvider, Diagram, DiagramBuilder, remoteNodeProvider, sleep } from '@data-story/core';
import useRequest from 'ahooks/lib/useRequest';

export function useDiagram(diagramFactory: (builder: DiagramBuilder) => Diagram): {
  app: Application;
  diagram: Diagram;
  loading: boolean;
  error: Error | undefined;
} {
  const { data, loading, error } = useRequest(async() => {
    const appInstance = new Application()
    appInstance.register(coreNodeProvider)
    appInstance.register(remoteNodeProvider)
    await appInstance.boot()
    await sleep(10) // TODO why is this necessary?

    const builder = appInstance.getDiagramBuilder()

    return {
      app: appInstance,
      diagram: diagramFactory(builder),
    }
  });

  return { ...data, loading, error };
}

export function useDiagrams(diagramFactories: ((builder: DiagramBuilder) => Diagram)[]): {
  app: Application;
  diagrams: Diagram[];
  loading: boolean;
  error: Error | undefined;
} {
  const { data, loading, error } = useRequest(async() => {
    const appInstance = new Application()
    appInstance.register(coreNodeProvider)
    appInstance.register(remoteNodeProvider)
    await appInstance.boot()
    await sleep(10) // TODO why is this necessary?

    const builder = appInstance.getDiagramBuilder()

    return {
      app: appInstance,
      diagrams: diagramFactories.map(factory => factory(builder)),
    }
  });

  return { ...data, loading, error };
}
