import { DataStory } from './DataStory';
import { DataStoryProps } from './types';

const mountDataStory = (props: DataStoryProps) => {
  cy.mount(<DataStory {...props} />);
};

describe('DataStory', () => {
  it('should render', () => {
    mountDataStory({ client: {} as any });
    cy.get('[data-cy="data-story"]').should('exist');
  });

  // fix: Resolve issue where the `onInitialize` method in the diagram is executed twice on first load.
  it('should not execute onInitialize twice', () => {
    const spyOnInitialize = cy.spy();
    mountDataStory({ client: {} as any, onInitialize: spyOnInitialize });
    cy.get('[data-cy="data-story"]').should('exist');
    cy.wrap(spyOnInitialize).should('have.been.calledOnce');
    cy.wrap(spyOnInitialize).should('not.have.been.calledTwice');
  });
});