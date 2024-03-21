import { DataStoryProvider } from '../store/store';
import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import { RepeatableInput } from './RepeatableInput';
import { useForm } from 'react-hook-form';
import { RepeatableInputProps } from '../types';
import { ParamsComponentFactory } from '../modals/nodeSettingsModal/tabs/Params/ParamsComponentFactory';
import { defaultValues, mockNode, mockParam } from './mocks';

const RepeatableInputWithForm = () => {
  const mockForm = useForm({
    defaultValues
  }) as unknown as RepeatableInputProps['form'];

  // change ParamsComponentFactory instance
  ParamsComponentFactory.defaultInstance.availableComponents = [
    {
      getComponent: (params) => {
        const value = params.form.getValues(params.name as string);
        return <div data-cy='data-story-stringable-param'> {value} </div>
      },
      getType: () => 'StringableParam'
    },
    {
      getComponent: (params) => {
        const value = params.form.getValues(params.name as string);
        return <div data-cy='data-story-port-selection-param'>{value}</div>
      },
      getType: () => 'PortSelectionParam'
    }
  ];

  return (<DataStoryProvider>
    <ReactFlowProvider>
      <RepeatableInput form={mockForm} node={mockNode} param={mockParam}/>
    </ReactFlowProvider>
  </DataStoryProvider>)
}

function mountRepeatableInput() {
  cy.mount(<RepeatableInputWithForm/>);
}

describe('<RepeatableInput />', () => {
  beforeEach(() => {
    mountRepeatableInput();
  });

  it('renders', () => {
    cy.dataCy('data-story-repeatable-input').should('exist');
  });

  it('add new row', () => {
    cy.dataCy('data-story-repeatable-add-row').should('exist');
    cy.dataCy('data-story-repeatable-row').should('have.length', 2);
    cy.dataCy('data-story-repeatable-add-row').click();
    cy.dataCy('data-story-repeatable-row').should('have.length', 3);
  });

  it('delete row', () => {
    cy.dataCy('data-story-repeatable-delete-row').should('exist');
    cy.dataCy('data-story-repeatable-row').should('have.length', 2);
    cy.dataCy('data-story-repeatable-delete-row').first().click();
    cy.dataCy('data-story-repeatable-row').should('have.length', 1);
  })
  it('reorder row', () => {
    cy.dataCy('data-story-repeatable-drag-row').should('exist');
    cy.dataCy('data-story-repeatable-row').should('have.length', 2);
    cy.dataCy('data-story-repeatable-row').first().contains('id444');

    const firstDragRow = cy.dataCy('data-story-repeatable-drag-row').first();
    const secondDragRow = cy.dataCy('data-story-repeatable-drag-row').last();

    firstDragRow
      .trigger('dragstart', { which: 1, force: true });

    secondDragRow
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop')

    cy.dataCy('data-story-repeatable-row').first().contains('id333');
  })
})
