import { PortSelectionInput } from './PortSelectionInput';
import { useForm } from 'react-hook-form';
import { mount } from 'cypress/react';
import { FormComponentProps } from '../../../../types';

const TestedPortSelectionInput = (props: {onForm: (f: FormComponentProps['form']) => any}) => {
  const form = useForm({
    defaultValues: {
      PortSelected: '',
      outputs: JSON.stringify([
        { name: 'output1', id: '1' },
        { name: 'output2', id: '2' },
      ]),
    },
  }) as unknown as FormComponentProps['form'];
  props.onForm(form);

  return (
    <>
      <PortSelectionInput
        param={{} as unknown as FormComponentProps['param']}
        form={form}
        name="PortSelected"
        node={{} as unknown as FormComponentProps['node']}
      />
    </>
  );
}

const mountPortSelectionInput = (formRef: {val: null | FormComponentProps['form']} = { val: null }) => {
  mount(<TestedPortSelectionInput onForm={(f) => formRef.val = f}/>);
}
describe('PortSelectionInput', () => {
  let formRef = { val: null };

  beforeEach(() => {
    mountPortSelectionInput(formRef);
  });

  it('renders', () => {

    cy.dataCy('data-story-port-selection-input').should('exist');
  });

  it('options are correct', () => {

    cy.get('option').should('have.length', 2);
    cy.get('option').eq(0).should('have.text', 'output1');
    cy.get('option').eq(1).should('have.text', 'output2');

  });

  it('selects the correct option', () => {

    cy.get('select').select('output2');
    cy.get('select').should('have.value', 'output2');
    cy.dataCy('data-story-port-selection-input').then(() => {
      // @ts-ignore
      const PortSelectedVal = formRef.val!.getValues('PortSelected');
      expect(PortSelectedVal).to.equal('output2');
    })
  });

  it('changes options when form.outputs changes', () => {

    cy.dataCy('data-story-port-selection-input').then(() => {
      // @ts-ignore
      formRef.val!.setValue('outputs', JSON.stringify([
        { name: 'output3', id: '3' },
        { name: 'output4', id: '4' },
      ]), {
        shouldValidate: true,
        shouldDirty: true
      });
    });

    cy.get('option').should('have.length', 2);
    cy.get('option').eq(0).should('have.text', 'output3');
    cy.get('option').eq(1).should('have.text', 'output4');
  });

  it('PortSelected value is not in options', () => {

    cy.dataCy('data-story-port-selection-input').then(() => {
      // @ts-ignore
      const PortSelectedVal = formRef.val!.getValues('PortSelected');
      expect(PortSelectedVal).to.equal('');
    });
    cy.get('select').should('have.value', null);
    cy.get('option').eq(0).should('have.text', 'output1');
    cy.get('option').eq(1).should('have.text', 'output2');
  });

  it('outputs is empty', () => {
    cy.dataCy('data-story-port-selection-input').then(() => {
      // @ts-ignore
      formRef.val!.setValue('outputs', JSON.stringify([]), {
        shouldValidate: true,
        shouldDirty: true
      });
    });

    cy.get('option').should('have.length', 0);
  });

  it('outputs contain duplicate name', () => {
    cy.dataCy('data-story-port-selection-input').then(() => {
      // @ts-ignore
      formRef.val!.setValue('outputs', JSON.stringify([
        { name: 'output3', id: '3' },
        { name: 'output3', id: '4' },
      ]), {
        shouldValidate: true,
        shouldDirty: true
      });
    });

    cy.get('option').should('have.length', 2);
    cy.get('option').eq(0).should('have.text', 'output3');
    cy.get('option').eq(1).should('have.text', 'output3');
  });

})
