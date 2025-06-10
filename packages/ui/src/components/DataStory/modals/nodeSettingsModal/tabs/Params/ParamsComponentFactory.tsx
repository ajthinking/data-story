import { Param  } from '@data-story/core';
import {  FormComponent, FormComponentProps } from '../../../../types';
import { StringableComponent } from './StringableWithConfig';

export class ParamsComponentFactory{
  availableComponents: FormComponent<Param>[] = [
    new StringableComponent(),
  ]
  private selectedComponent?: FormComponent<Param> = undefined;

  getComponent(params: FormComponentProps & { type: string }) {
    const { type, ...rest } = params;

    this.selectedComponent = this.availableComponents.find(e => e.getType() === type);
    if (this.selectedComponent) {
      return this.selectedComponent.getComponent(rest);
    } else {
      throw new Error(`No component found for ${type}`);
    }
  }

  getSelectedComponent() {
    return this.selectedComponent;
  }

  /**
   * shared instance
   */
  static defaultInstance = new ParamsComponentFactory();
}
