import React from 'react'
import { DataStoryCanvasProvider } from '../store/store';
import * as store from '../store/store';

function mountRunModal(): void {
  cy.mount(
    <></>,
    // <DataStoryCanvasProvider>
    // {/*<RunModal showModal={true} setShowModal={(show) => show}/>*/}
    // </DataStoryCanvasProvider>
  )
}

function getEl(name: 'run-modal' | 'run-modal-server' | 'run-modal-button') {
  return cy.dataCy(name);
}

describe('<RunModal />', () => {
  // it('renders', () => {
  //   mountRunModal();

  //   getEl('run-modal').should('exist');
  //   getEl('run-modal-server').should('contain', 'localhost');
  // });

  // it('render type is JS', () => {
  //   cy.stub(store, 'createStore').returns(() => {
  //     return {
  //       nodes: [],
  //       params: [], // This is not working?
  //       serverConfig: { type: 'JS' },
  //     };
  //   });

  //   mountRunModal();

  //   getEl('run-modal-server').should('have.text', 'JS');
  // });

  // it('click run button', () => {
  //   cy.stub(store, 'createStore').returns(() => {
  //     return {
  //       serverConfig: { type: 'JS' },
  //       onRun: cy.spy().as('onRun'),
  //     };
  //   });

  //   mountRunModal();

  //   getEl('run-modal-button').should('have.text', 'Run');
  //   getEl('run-modal-button').click();
  //   cy.get('@onRun').should('have.been.calledOnce');
  // });
})
