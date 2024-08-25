function getEl(name: 'playground' | 'add-node-button' | 'add-node-modal' | 'add-node-modal-input' | 'add-node-modal-node-list' | 'data-story-node-component') {
  return cy.dataCy(name);
}

describe('add console.log node to playground', () => {
  beforeEach(() => {
    cy.visit('/playground');
  });

  it('visit playground', () => {
    getEl('playground').should('exist');
  });

  it('trigger addNodeModal', () => {
    getEl('add-node-button').click();

    cy.wait(1000);
    getEl('add-node-modal').should('exist');
  });

  it('add node to playground', () => {
    getEl('add-node-button').click();
    getEl('add-node-modal-input').type('console');
    getEl('add-node-modal-node-list').children().first().click();

    getEl('data-story-node-component').should('exist');
    getEl('data-story-node-component').should('contain.text', 'Console');
  });
})
