import TableNodeComponent from './TableNodeComponent';
import { DataStoryContext } from '../../DataStory/store/store';
import { ReactFlowProvider } from '@xyflow/react';
import { createLargeColsFn, createLargeRows, nested, normal, oversize } from './mock';
import { eventManager } from '../../DataStory/events/eventManager';
import { DataStoryEvents } from '../../DataStory/events/dataStoryEventType';
import { ItemValue, multiline, ObserveLinkUpdate } from '@data-story/core';

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
let testPerformanceLimit = 20;

const mountTableNodeComponent = (items: unknown[], client?: any ) => {
  let initialScreenCount: number = 1;
  cy.mount(
    // @ts-ignore
    <DataStoryContext.Provider value={() => {
      return ({
        toDiagram: () => ({
          getInputLinkIdsFromNodeIdAndPortName: (id: string, port: string) => {
            return ['tableLinkId'];
          }
        }),
        client: client || {
          getDataFromStorage: (data:  Record<string, ItemValue[]>) => {
            if (initialScreenCount <= 0) return Promise.resolve({ tableLinkId: [] });
            initialScreenCount--;

            return Promise.resolve({ tableLinkId: items });
          },
          observeLinkUpdate: (params: ObserveLinkUpdate) => {
            if (initialScreenCount > 0) {
              params.onReceive(['tableLinkId']);
            }
          },
          cancelObservation: cy.spy()
        }
      })
    }}>
      <ReactFlowProvider>
        <TableNodeComponent id={id} data={data} selected={false}/>
      </ReactFlowProvider>
    </DataStoryContext.Provider>
  );
}

function runSuccess(): void {
  cy.dataCy('data-story-table')
    .then(() => {
      cy.wait(10).then(() => {
        eventManager.emit({
          type: DataStoryEvents.RUN_SUCCESS
        });
      })
    });
}

describe('test TableNodeComponent for awaiting data', () => {
  it('render component with Awaiting data', () => {
    mountTableNodeComponent([], {});

    cy.get('th').should('have.length', 0);
    cy.dataCy('data-story-table-await-data').should('contain.text', 'Awaiting data');
  });
});

describe('test TableNodeComponent for tooltip', () => {
  it('render tooltip with normal data', () => {
    mountTableNodeComponent([normal]);

    cy.dataCy('data-story-table-th').eq(1).click();
    cy.dataCy('data-story-table-tooltip').should('have.text', 'property_b');
  });

  it('render tooltip with oversize data', () => {
    mountTableNodeComponent([oversize]);

    // test long key on tooltip
    const longKey = Object.keys(oversize)[1];
    cy.dataCy('data-story-table-th').eq(1).click();
    cy.dataCy('data-story-table-tooltip').should('have.text', longKey);

    // click on the table to close the tooltip
    cy.dataCy('data-story-table').click({ force: true });

    // test long value on tooltip
    const longValue = oversize['long_property'];
    cy.get('[data-cy="data-story-table-row"] > :nth-child(3)').click();
    cy.dataCy('data-story-table-tooltip').should('have.text', longValue);
  });

  it('render tooltip with line break data', () => {
    mountTableNodeComponent([nested]);

    cy.get('[data-cy="data-story-table-row"] > :nth-child(10)').click();
    cy.dataCy('data-story-table-tooltip').should('have.text', multiline`
      122 Main St
      Suite 100
      Anytown`
    );
  });

  it('render tooltip with formatted data', () => {
    mountTableNodeComponent([nested]);
    let jsonString = '[\n  {\n    "id": "123456789",\n    "type": "CONTACT_TO_COMPANY"\n  }\n]';

    cy.get('[data-cy="data-story-table-row"] > :nth-child(7)').click();
    cy.dataCy('data-story-table-tooltip').should('have.text', jsonString);
  });
});

describe('test TableNodeComponent for table', () => {
  it('render component with empty data', () => {
    mountTableNodeComponent([]);
    runSuccess();

    cy.dataCy('data-story-table').should('exist');
    cy.dataCy('data-story-table-no-data').should('have.text', 'No data');
  });

  it('render component with normal data', () => {
    mountTableNodeComponent([normal]);
    runSuccess();

    const headerLength = Object.keys(normal).length;

    cy.dataCy('data-story-table-th').should('have.length', headerLength);
    cy.dataCy('data-story-table-row').should('have.length', 1);
  });

  it('render component with nested data', () => {
    mountTableNodeComponent([nested]);

    cy.dataCy('data-story-table-th').eq(0).should('have.text', 'objectId');
    cy.dataCy('data-story-table-th').eq(1).should('have.text', 'properties.firstname');
    cy.get('[data-cy="data-story-table-row"] > :nth-child(2)').should('have.text', 'John');
  })

  it('render component with oversize key or value data', () => {
    mountTableNodeComponent([oversize]);

    cy.dataCy('data-story-table-th').eq(1).should('have.text', 'long_long_long_long_long_long_long_long_long_long_...');
    cy.get('[data-cy="data-story-table-row"] > :nth-child(3)').should('have.text', 'long_long_long_long_long_long_long_long_long_long_...');
  });

  it('render component with line break data', () => {
    mountTableNodeComponent([nested]);

    cy.dataCy('data-story-table-th').eq(9).should('have.text', 'address.street');
    cy.get('[data-cy="data-story-table-row"] > :nth-child(10)').should('have.text', '122 Main St\nSuite 100\nAnytown');
  });

  it('render component with boolean data', () => {
    mountTableNodeComponent([nested]);

    cy.dataCy('data-story-table-th').eq(7).should('have.text', 'booleanFalse');
    cy.get('[data-cy="data-story-table-row"] > :nth-child(8)').should('have.text', 'false');
    cy.dataCy('data-story-table-th').eq(8).should('have.text', 'booleanTrue');
    cy.get('[data-cy="data-story-table-row"] > :nth-child(9)').should('have.text', 'true');
  });

  it('render component with 1000 columns data', () => {
    const thousandCols = createLargeColsFn(1000);
    const start = performance.now();
    mountTableNodeComponent([thousandCols]);

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
    const start = performance.now();
    mountTableNodeComponent(thousandRows);

    cy.dataCy('data-story-table-row')
      .eq(1)
      .should('exist')
      .then(() => {
        const end = performance.now();
        const renderTime = end - start;
        cy.log(`cypress render Time: ${renderTime}ms`);
      });

    // table rows within the user's current viewable area are rendered
    cy.dataCy('data-story-table-row').should('have.length.lessThan', 20);
  });

  it('test table component scroll', () => {
    const thousandRows = createLargeRows(1000);
    testPerformanceLimit = thousandRows.length;
    let initialScreenCount1: number = 15;
    const items = thousandRows.slice(0, initialScreenCount1);
    const client =  {
      getDataFromStorage: (data:  Record<string, ItemValue[]>) => {
        initialScreenCount1--;
        console.log('initialScreenCount', initialScreenCount1);
        return Promise.resolve({ tableLinkId: items });
      },
      observeLinkUpdate: (params: ObserveLinkUpdate) => {
        if (initialScreenCount1 > 0) {
          params.onReceive(['tableLinkId']);
        }
      },
      cancelObservation: cy.spy()
    };

    const getDataSpy = cy.spy(client, 'getDataFromStorage').as('getDataSpy');
    mountTableNodeComponent(thousandRows, client);

    // wait 10ms for data to load
    cy.wait(10);

    const start = performance.now();
    cy.dataCy('data-story-table-scroll')
      .scrollTo('bottom', { duration: 300 })
      .scrollTo('bottom', { duration: 300 })
      .then(() => {
        const end = performance.now();
        const scrollTime = end - start;
        cy.log(`cypress scroll Time: ${scrollTime}ms`);
        expect(getDataSpy).to.have.called;
        expect(initialScreenCount1).lte(13);
      });
  });
})
