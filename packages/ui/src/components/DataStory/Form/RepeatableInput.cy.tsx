import { DataStoryProvider } from '../store/store';
import { ReactFlowProvider } from '@xyflow/react';
import { RepeatableInput } from './RepeatableInput';
import { FormProvider, useForm } from 'react-hook-form';
import { FormCommonProps } from '../types';
import { ParamsComponentFactory } from '../modals/nodeSettingsModal/tabs/Params/ParamsComponentFactory';
import { defaultValues, mockNode, mockParam } from './mocks';
import { FormFieldWrapper, useFormField } from './UseFormField';

const MockComponent = ({ param, type }: {
  param: FormCommonProps & {param: unknown},
  type: 'StringableParam' | 'PortSelectionParam'
}) => {
  const { getValues } = useFormField();
  const value = getValues();
  return (
    <>
      {
        //The StringableParam` is composed of `stringInput` + `dropdown`. only mocked the `stringInput` part, so retrieve `value.value`
        type === 'StringableParam' && <div data-cy='data-story-stringable-param'>{value.value}</div>
      }
      {
        type === 'PortSelectionParam' && <div data-cy='data-story-port-selection-param'>{value}</div>
      }
    </>
  )
};

const RepeatableInputWithForm = () => {
  const mockForm = useForm({
    defaultValues
  });

  // change ParamsComponentFactory instance
  ParamsComponentFactory.defaultInstance.availableComponents = [
    {
      getComponent: (params) => {
        return <FormFieldWrapper fieldName={'value'}>
          <MockComponent param={params} type={'StringableParam'}/>
        </FormFieldWrapper>
      },
      getType: () => 'StringableParam'
    },
    {
      getComponent: (params) => {
        return <FormFieldWrapper fieldName={'port'}>
          <MockComponent param={params} type={'PortSelectionParam'} />
        </FormFieldWrapper>
      },
      getType: () => 'PortSelectionParam'
    }
  ];

  return (<DataStoryProvider>
    <ReactFlowProvider>
      <FormProvider {...mockForm}>
        <RepeatableInput node={mockNode} param={mockParam}/>
      </FormProvider>
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
