// mock PortSelectionParam and StringableParam component in RepeatableInput.tsx
import { DataStoryProvider } from '../store/store';
// import { RunModal } from '../modals/runModal';
import React from 'react';
// import { NodeSettingsModal } from '../modals/nodeSettingsModal/nodeSettingsModal';
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
        console.log('params', params);
        return <div data-cy='data-story-stringable-param'>{params.name}</div>
      },
      getType: () => 'StringableParam'
    },
    {
      getComponent: (params) => {
        return <div data-cy='data-story-port-selection-param'>{params.name}</div>
      },
      getType: () => 'PortSelectionParam'
    }
  ];

  return (<DataStoryProvider>
    <ReactFlowProvider>
      <RepeatableInput form={mockForm} node={mockNode} param={mockParam} />
    </ReactFlowProvider>
  </DataStoryProvider>)
}

function mountRepeatableInput() {
  cy.mount(<RepeatableInputWithForm />);
}

describe('<RepeatableInput />', () => {
  it('renders', () => {

    mountRepeatableInput();
    cy.dataCy('data-story-repeatable-input').should('exist');
  });
})
