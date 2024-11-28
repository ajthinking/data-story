import ConsoleNodeComponent from './ConsoleNodeComponent';
import { ReactFlowProvider } from '@xyflow/react';
import { ItemsObserver } from '@data-story/core';
import { DataStoryContext } from '../DataStory/store/store';

const data = {
  'params': [],
  'computer': 'ConsoleLog',
  'label': 'ConsoleLog',
  'inputs': [
    {
      'id': 'ConsoleLog.1.input',
      'name': 'input',
      'schema': {}
    }
  ],
  'outputs': []
};
const id = 'ConsoleLog.1';

const mountConsoleNodeComponent = (items: unknown[], client?: () => void) => {
  cy.mount(
    // @ts-ignore
    <DataStoryContext.Provider value={() => {
      return ({
        toDiagram: () => ({
          getLinkIdFromNodeId: (id: string, port: string) => {
            return `${id}.${port}`;
          }
        }),
        client: client?.() || {
          itemsObserver: (observer: ItemsObserver) => {
            console.log('itemsObserver:', observer)
            // @ts-ignore
            observer.onReceive(items);
          }
        }
      })
    }}>
      <ReactFlowProvider>
        <ConsoleNodeComponent id={id} data={data} selected={false}/>
      </ReactFlowProvider>
    </DataStoryContext.Provider>
  );
}

describe('ConsoleNodeComponent', () => {
  it('should render', () => {
    mountConsoleNodeComponent([]);
    cy.get('[data-cy="data-story-node-component"]').should('exist');
    cy.get('[data-cy="data-story-node-component"]').contains('ConsoleLog');
  });

  it('should render a console log', () => {
    const customLog = cy.stub().callsFake((e) => e);
    cy.stub(console, 'log').callsFake(customLog);
    mountConsoleNodeComponent(['Hello, World!']);
    cy.get('[data-cy="data-story-node-component"]').should('exist');
    cy.wrap(customLog).should('be.called');
    cy.wrap(customLog).should('be.calledWith', 'Hello, World!');
  });
});