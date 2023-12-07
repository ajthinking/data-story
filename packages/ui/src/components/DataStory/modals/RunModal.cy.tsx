import React from 'react'
import { RunModal } from './runModal'
import { DataStoryProvider } from '../store/store';
import * as store from '../store/store';

function mountRunModal(): void {
  cy.mount(
    <DataStoryProvider>
      <RunModal setShowModal={(show) => show}/>
    </DataStoryProvider>
  )
}

function getEl(name: 'run-modal' | 'run-modal-server' | 'run-modal-button') {
  return cy.dataCy(name);
}

describe('<RunModal />', { tags: ['@ui'] }, () => {

  it('renders', () => {
    mountRunModal();

    getEl('run-modal').should('exist');
    getEl('run-modal-server').should('contain', 'localhost');
  });

  it('render type is JS', () => {

    cy.stub(store, 'createStore').returns(() => {
      return {
        serverConfig: { type: 'JS' },
      };
    });

    mountRunModal();

    getEl('run-modal-server').should('have.text', 'JS');
  });

  it('click run button', () => {

    cy.stub(store, 'createStore').returns(() => {
      return {
        serverConfig: { type: 'JS' },
        onRun: cy.spy().as('onRun'),
      };
    });

    mountRunModal();

    getEl('run-modal-button').should('have.text', 'Run');
    getEl('run-modal-button').click();
    cy.get('@onRun').should('have.been.calledOnce');
  });
})

