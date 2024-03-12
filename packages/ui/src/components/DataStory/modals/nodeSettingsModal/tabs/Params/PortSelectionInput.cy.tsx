/**
 * 1. 是否需要测试 useWatch (react-hook-form), 如何测试呢?
 * 2. 渲染一个 PortSelectionInput 组件
 * 3. 自己设置 form 的 outputs，然后测试 select 的 options 是否正确
 */
import { PortSelectionInput } from './PortSelectionInput';
import { useForm } from 'react-hook-form';
import { mount } from 'cypress/react';
import { FormComponentProps } from '../../../../types';

const TestedPortSelectionInput = () => {
  const form = useForm({
    defaultValues: {
      outputs: JSON.stringify([
        { name: 'output1' },
        { name: 'output2' },
      ]),
    },
  }) as unknown as FormComponentProps['form'];

  return (
    <>
      <PortSelectionInput
        param={{} as unknown as FormComponentProps['param']}
        form={form}
        name="ouputs-select"
        node={{} as unknown as FormComponentProps['node']}
      />
      {/*click button to change options*/}
      <button
        type="button"
        onClick={() =>
          form.setValue('outputs',  JSON.stringify([
            { name: 'output3' },
            { name: 'output4' },
          ]), {
            shouldValidate: true,
            shouldDirty: true
          })
        }
      >
        change options
      </button>
    </>
  );
}

const mountPortSelectionInput = () => {
  mount(<TestedPortSelectionInput/>);
}
describe('PortSelectionInput', () => {
  it('renders', () => {
    mountPortSelectionInput();

    cy.dataCy('data-story-port-selection-input').should('exist');
  });

  it('options are correct', () => {
    mountPortSelectionInput();

    cy.get('select').should('have.length', 1);
    cy.get('option').should('have.length', 2);
    cy.get('option').eq(0).should('have.text', 'output1');
    cy.get('option').eq(1).should('have.text', 'output2');
  });

  it('selects the correct option', () => {
    mountPortSelectionInput();

    cy.get('select').select('output2');
    cy.get('select').should('have.value', 'output2');
  });

  it('changes options when form.outputs changes', () => {

    mountPortSelectionInput();

    // click button to change options
    cy.get('button').click();
    cy.get('option').should('have.length', 2);
    cy.get('option').eq(0).should('have.text', 'output3');
    cy.get('option').eq(1).should('have.text', 'output4');
  });
})
