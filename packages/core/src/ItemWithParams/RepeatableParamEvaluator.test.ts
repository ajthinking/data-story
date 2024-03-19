import { Param, RepeatableParam } from '../Param';
import { beforeEach, describe, expect, SpyInstance } from 'vitest';
import { ParamEvaluator } from './ParamEvaluator';
import { RepeatableParamEvaluator } from './RepeatableParamEvaluator';
import { mockPortMapData, mockRepeatableData, removePropertyData } from './mock';


describe('RepeatableParamEvaluator', () => {
  let spy: SpyInstance;
  let evaluator: RepeatableParamEvaluator;

  beforeEach(() => {
    const paramEvaluator = new ParamEvaluator();
    spy = vi.spyOn(paramEvaluator, 'evaluate');
    evaluator = new RepeatableParamEvaluator(paramEvaluator);
  });

  it('should be able to evaluate RepeatableParam', () => {

    expect(evaluator instanceof RepeatableParamEvaluator).toBe(true);
    expect(evaluator.canEvaluate({ type: 'RepeatableParam' } as unknown as Param)).toBe(true);
  });

  it('should test evaluate method performs when param.row length is 0', () => {
    const result = evaluator.evaluate({}, {
      'name': 'remove_properties',
      'type': 'RepeatableParam',
      'row': [],
      'value': []
    } as unknown as RepeatableParam<any>);

    expect(result).toEqual([]);
  });

  it('should test RepeatableParam contain the StringableParam type ', () => {
    const result = evaluator.evaluate({}, removePropertyData as unknown as RepeatableParam<any>);

    expect(result).toEqual(removePropertyData.value);
  });

  it('should test RepeatableParam contain the PortSelectionParam type', () => {
    const result = evaluator.evaluate({}, mockPortMapData as unknown as RepeatableParam<any>);

    expect(result).toEqual(mockPortMapData.value);

  });

  it('should test RepeatableParam contain the RepeatableParam type', () => {
    const result = evaluator.evaluate({}, mockRepeatableData as unknown as RepeatableParam<any>);

    expect(result).toEqual(mockRepeatableData.value);
  });

  describe('call evaluator recursively', () => {
    beforeEach(() => {
      evaluator.evaluate({}, mockRepeatableData as unknown as RepeatableParam<any>);
    });

    it('recursive called count', () => {

      /**
       * count = 6 = (1                +  1                +  1                             ) * 2
       *             ([StringableParam] + [RepeatableParam] + [inner nested StringableParam]) * 2[repeatable value]
       */
      expect(spy).toHaveBeenCalledTimes(6);
    });

    it('recursive called with correct params', () => {
      const calls = spy.mock.calls;
      expect(calls).toMatchSnapshot();
    });
  })
});
