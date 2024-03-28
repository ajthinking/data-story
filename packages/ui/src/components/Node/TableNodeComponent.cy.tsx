import TableNodeComponent from './TableNodeComponent';
import * as store from '../DataStory/store/store';
import { DataStoryProvider } from '../DataStory/store/store';
import { ReactFlowProvider } from 'reactflow';
import { normal } from './itemExamples/normal';
import { nested } from './itemExamples/nested';
import { oversize } from './itemExamples/oversize';

const mountTableNodeComponent = () => {
  const data = {
    'params': [],
    'computer': 'Table',
    'label': 'Table',
    'inputs': [
      {
        'id': 'Table.1.input',
        'name': 'input',
        'schema': {}
      }
    ],
    'outputs': []
  };
  const id = 'Table.1';
  cy.mount(
    <DataStoryProvider>
      <ReactFlowProvider>
        <TableNodeComponent id={id} data={data} selected={false}/>
      </ReactFlowProvider>
    </DataStoryProvider>
  );
}

describe('test TableNodeComponent for table', () => {
  function mockGetItems(items): void {
    cy.stub(store, 'createStore').returns(() => {
      return {
        server: {
          itemsApi: () => {
            const getItems = ({
              atNodeId = '',
              limit = 10,
              offset = 0
            }) => {
              return [items].slice(offset, offset + limit)
            }

            return {
              getItems
            };
          }
        }
      }
    });
  }

  it('render default component', () => {
    mockGetItems([]);
    mountTableNodeComponent();

    cy.dataCy('data-story-table-node').should('exist');
  });

  it('render component with data', () => {
    mockGetItems(normal);
    mountTableNodeComponent();

    const headerLength = Object.keys(normal).length;

    cy.dataCy('data-story-table-th').should('have.length',headerLength);
    cy.dataCy('data-story-table-row').should('have.length', 1);
  });

  it('render component with nested data', () => {
    mockGetItems(nested);
    mountTableNodeComponent();

    cy.dataCy('data-story-table-th').eq(0).should('have.text', 'objectId');
    cy.dataCy('data-story-table-th').eq(1).should('have.text', 'properties.firstname');
    cy.get('[data-cy="data-story-table-row"] > :nth-child(2)').should('have.text', 'John');
  })

  it('render component with oversize key or value data', () => {
    mockGetItems(oversize);
    mountTableNodeComponent();

    cy.dataCy('data-story-table-th').eq(3).should('have.text', 'long_long_long_long_...');
    cy.get('[data-cy="data-story-table-row"] > :nth-child(2)').should('have.text', 'long_long_long_long_...');
  });

  it('render component with line break data', () => {
    mockGetItems(nested);
    mountTableNodeComponent();

    cy.dataCy('data-story-table-th').eq(7).should('have.text', 'address.street');
    cy.get('[data-cy="data-story-table-row"] > :nth-child(8)').should('have.text', '122 Main St\nSuite 10...');
  })
})

describe('test TableNodeComponent for tooltip', () => {
  function mockGetItems(items): void {
    cy.stub(store, 'createStore').returns(() => {
      return {
        server: {
          itemsApi: () => {
            const getItems = ({
              atNodeId = '',
              limit = 10,
              offset = 0
            }) => {
              return [items].slice(offset, offset + limit)
            }

            return {
              getItems
            };
          }
        }
      }
    });
  }

  it('render tooltip with normal data', () => {
    mockGetItems(normal);
    mountTableNodeComponent();

    cy.dataCy('data-story-table-th').eq(1).click();
    cy.dataCy('data-story-table-tooltip').should('have.text', 'property_b');
  });

  it('render tooltip with oversize data', () => {
    mockGetItems(oversize);
    mountTableNodeComponent();

    // test long key on tooltip
    const longKey = Object.keys(oversize)[3];
    cy.dataCy('data-story-table-th').eq(3).click();
    cy.dataCy('data-story-table-tooltip').should('have.text', longKey);

    // test long value on tooltip
    const longValue = oversize['long_property'];
    cy.get('[data-cy="data-story-table-row"] > :nth-child(2)').click();
    cy.dataCy('data-story-table-tooltip').should('have.text', longValue);
  });

  it('render tooltip with line break data', () => {
    mockGetItems(nested);
    mountTableNodeComponent();

    cy.get('[data-cy="data-story-table-row"] > :nth-child(8)').click();
    cy.dataCy('data-story-table-tooltip').should('have.text', `122 Main St
Suite 100
 Anytown`);
  });
});
