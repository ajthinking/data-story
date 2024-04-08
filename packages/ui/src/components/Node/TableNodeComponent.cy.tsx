import TableNodeComponent from './TableNodeComponent';
import * as store from '../DataStory/store/store';
import { DataStoryProvider } from '../DataStory/store/store';
import { ReactFlowProvider } from 'reactflow';
import { createLargeColsFn, createLargeRows, nested, normal, oversize } from './mock';
import { eventManager } from '../DataStory/events/eventManager';
import { DataStoryEvents } from '../DataStory/events/dataStoryEventType';

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

const mountTableNodeComponent = () => {
  cy.mount(
    <DataStoryProvider>
      <ReactFlowProvider>
        <TableNodeComponent id={id} data={data} selected={false}/>
      </ReactFlowProvider>
    </DataStoryProvider>
  )

  cy.dataCy('data-story-table')
    .then(() => {
      cy.wait(10).then(() => {
        eventManager.emit({
          type: DataStoryEvents.RUN_SUCCESS
        });
      })
    })
}

let testPerformanceLimit = 20;
const mockGetItems = (items: unknown[]): void => {
  // Set the limit constant to 10000 for testing performance

  cy.stub(store, 'createStore').returns(() => {
    return {
      server: {
        itemsApi: () => {
          const getItems = ({
            atNodeId = '',
            limit = testPerformanceLimit,
            offset = 0
          }) => {
            return items.slice(offset, offset + testPerformanceLimit)
          }

          return {
            getItems
          };
        }
      }
    }
  });
};

describe('test TableNodeComponent for tooltip', () => {
  it('render tooltip with normal data', () => {
    mockGetItems([normal]);
    mountTableNodeComponent();

    cy.dataCy('data-story-table-th').eq(1).click();
    cy.dataCy('data-story-table-tooltip').should('have.text', 'property_b');
  });

  it('render tooltip with oversize data', () => {
    mockGetItems([oversize]);
    mountTableNodeComponent();

    // test long key on tooltip
    const longKey = Object.keys(oversize)[3];
    cy.dataCy('data-story-table-th').eq(3).click();
    cy.dataCy('data-story-table-tooltip').should('have.text', longKey);

    // click on the table to close the tooltip
    cy.dataCy('data-story-table').click();

    // test long value on tooltip
    const longValue = oversize['long_property'];
    cy.get('[data-cy="data-story-table-row"] > :nth-child(2)').click();
    cy.dataCy('data-story-table-tooltip').should('have.text', longValue);
  });

  it('render tooltip with line break data', () => {
    mockGetItems([nested]);
    mountTableNodeComponent();

    cy.get('[data-cy="data-story-table-row"] > :nth-child(10)').click();
    cy.dataCy('data-story-table-tooltip').should('have.text', `122 Main St
Suite 100
 Anytown`);
  });

  it('render tooltip with formatted data', () => {
    mockGetItems([nested]);
    mountTableNodeComponent();
    let jsonString = '[\n  {\n    "id": "123456789",\n    "type": "CONTACT_TO_COMPANY"\n  }\n]';

    cy.get('[data-cy="data-story-table-row"] > :nth-child(7)').click();
    cy.dataCy('data-story-table-tooltip').should('have.text', jsonString);
  });
});

describe('test TableNodeComponent for table', () => {
  it('render default component', () => {
    mockGetItems([]);
    mountTableNodeComponent();

    cy.dataCy('data-story-table').should('exist');
  });

  it('render component with empty data', () => {
    mockGetItems([]);
    mountTableNodeComponent();

    cy.get('th').should('have.length', 1);
    cy.get('th').should('have.text', 'Awaiting data');
  });

  it('render component with data', () => {
    mockGetItems([normal]);
    mountTableNodeComponent();

    const headerLength = Object.keys(normal).length;

    cy.dataCy('data-story-table-th').should('have.length',headerLength);
    cy.dataCy('data-story-table-row').should('have.length', 1);
  });

  it('render component with nested data', () => {
    mockGetItems([nested]);
    mountTableNodeComponent();

    cy.dataCy('data-story-table-th').eq(0).should('have.text', 'objectId');
    cy.dataCy('data-story-table-th').eq(1).should('have.text', 'properties.firstname');
    cy.get('[data-cy="data-story-table-row"] > :nth-child(2)').should('have.text', 'John');
  })

  it('render component with oversize key or value data', () => {
    mockGetItems([oversize]);
    mountTableNodeComponent();

    cy.dataCy('data-story-table-th').eq(3).should('have.text', 'long_long_long_long_...');
    cy.get('[data-cy="data-story-table-row"] > :nth-child(2)').should('have.text', 'long_long_long_long_...');
  });

  it('render component with line break data', () => {
    mockGetItems([nested]);
    mountTableNodeComponent();

    cy.dataCy('data-story-table-th').eq(9).should('have.text', 'address.street');
    cy.get('[data-cy="data-story-table-row"] > :nth-child(10)').should('have.text', '122 Main St\nSuite 10...');
  });

  it('render component with boolean data', () => {
    mockGetItems([nested]);
    mountTableNodeComponent();

    cy.dataCy('data-story-table-th').eq(7).should('have.text', 'booleanFalse');
    cy.get('[data-cy="data-story-table-row"] > :nth-child(8)').should('have.text', 'false');
    cy.dataCy('data-story-table-th').eq(8).should('have.text', 'booleanTrue');
    cy.get('[data-cy="data-story-table-row"] > :nth-child(9)').should('have.text', 'true');
  });

  it('render component with 1000 columns data', () => {
    const thousandCols = createLargeColsFn(1000);
    mockGetItems([thousandCols]);
    const start = performance.now();
    mountTableNodeComponent();

    // https://web.dev/articles/rail
    cy.dataCy('data-story-table-th')
      .eq(1)
      .should('exist')
      .then(() => {
        const end = performance.now();
        const renderTime = end - start;
        cy.log(`cypress render Time: ${renderTime}ms`);
      });

    const headerLength = Object.keys(thousandCols).length;
    cy.dataCy('data-story-table-th')
      .should('have.length', headerLength);
  });

  it('render component with 1000 rows data', () => {
    const thousandRows = createLargeRows(1000);
    testPerformanceLimit = thousandRows.length;
    mockGetItems(thousandRows);
    const start = performance.now();
    mountTableNodeComponent();

    cy.dataCy('data-story-table-row')
      .eq(1)
      .should('exist')
      .then(() => {
        const end = performance.now();
        const renderTime = end - start;
        cy.log(`cypress render Time: ${renderTime}ms`);
      });

    cy.dataCy('data-story-table-row').should('have.length', testPerformanceLimit);
  });

  it('test table component scroll', () => {
    const thousandRows = createLargeRows(1000);

    testPerformanceLimit = thousandRows.length;
    mockGetItems(thousandRows);
    mountTableNodeComponent();

    // wait 10ms for data to load
    cy.wait(10);

    const start = performance.now();
    cy.dataCy('data-story-table')
      .scrollTo('bottom')
      .then(() => {
        const end = performance.now();
        const scrollTime = end - start;
        cy.log(`cypress scroll Time: ${scrollTime}ms`);
      });
  });
})
