import { Param  } from '@data-story/core';
import {  FormComponent, FormComponentProps } from '../../../../types';
import { StringableComponent } from './StringableWithConfig';
import { PortSelectionComponent } from './PortSelectionInput';

export class ParamsComponentFactory implements FormComponent<Param>{
  private availableComponents: FormComponent<Param>[] = [
    new StringableComponent(),
    new PortSelectionComponent()
  ]
  private selectedComponent?: FormComponent<Param> = undefined;
  private type: string;
  private restParams: FormComponentProps;

  constructor( params: FormComponentProps & {type: string}) {
    const { type, ...rest } = params;
    this.type = type;
    this.restParams = rest;
  }

  getComponent(){
    this.selectedComponent = this.availableComponents.find(e => e.getType() === this.type);
    if (this.selectedComponent) {
      return this.selectedComponent.getComponent(this.restParams);
    } else {
      throw new Error(`No component found for ${this.type}`);
    }
  }

  getSelectedComponent() {
    return this.selectedComponent;
  }

  getType() {
    return this.type;
  }
}
