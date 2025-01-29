import { Param  } from '@data-story/core';
import {  FormComponent, FormComponentProps } from '../../../../types';
import { StringableComponent } from './StringableWithConfig';
import { PortSelectionComponent } from '../../../../Form/PortSelectionInput';
import { SelectComponent } from '../../../../Form/SelectInput';
import { StringListComponent } from '../../../../Form/StringListInput';

export class ParamsComponentFactory{
  availableComponents: FormComponent<Param>[] = [
    new StringableComponent(),
    new PortSelectionComponent(),
    new SelectComponent(),
    new StringListComponent(),
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
