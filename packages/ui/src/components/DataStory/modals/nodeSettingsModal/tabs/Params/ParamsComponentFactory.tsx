import { Param, RepeatableParam, StringableParam } from '@data-story/core';
import { FormCommonProps, FormComponentProps } from '../../../../types';
import { StringableWithConfig } from './StringableWithConfig';
import { PortSelectionInput } from './PortSelectionInput';

interface FormComponent<TParams extends Param> {
  getComponent: (params: FormCommonProps & {param: TParams}) => React.ReactNode;
  getType: () => string;
}

class StringableComponent implements FormComponent<Param> {
  getComponent(params: FormComponentProps & {param: Param}) {
    return (<StringableWithConfig {...params} param={params.param as StringableParam} />);
  };
  getType() {
    return 'StringableParam';
  }
}

class PortSelectionComponent implements FormComponent<Param> {
  constructor() {
  }

  getComponent(params: FormComponentProps & {param: Param}) {
    return (<PortSelectionInput {...params} />);
  };

  getType() {
    return 'PortSelectionParam';
  }
}

export class ParamsComponentFactory implements FormComponent<Param>{
  private evaluators: FormComponent<Param>[] = [
    new StringableComponent(),
    new PortSelectionComponent()
  ]
  private evaluator?: FormComponent<Param> = undefined;
  private type: string;
  private restParams: FormComponentProps;

  constructor( params: FormComponentProps & {type: string}) {
    const { type, ...rest } = params;
    this.type = type;
    this.restParams = rest;
  }

  getComponent(){
    this.evaluator = this.evaluators.find(e => e.getType() === this.type);
    if (this.evaluator) {
      return this.evaluator.getComponent(this.restParams);
    } else {
      throw new Error(`No evaluator found for ${this.type}`);
    }
  }

  getEvaluator() {
    return this.evaluator;
  }

  getType() {
    return this.type;
  }
}
