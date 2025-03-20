import { Param, RepeatableParam } from '../Param';
import { describe, expect, it, vi } from 'vitest';
import { ParamEvaluator } from './ParamEvaluator';
import { RepeatableParamEvaluator } from './RepeatableParamEvaluator';
import { mockPortMapData, mockRepeatableData, removePropertyData } from './mock';

describe('canEvaluate', () => {
  const paramEvaluator = new ParamEvaluator();
  const evaluator = new RepeatableParamEvaluator(paramEvaluator);

  it('should be able to evaluate RepeatableParam', () => {
    expect(evaluator instanceof RepeatableParamEvaluator).toBe(true);
    expect(evaluator.canEvaluate({ type: 'RepeatableParam' } as unknown as Param)).toBe(true);
  });
});

describe('evaluate', () => {
  const paramEvaluator = new ParamEvaluator();
  const evaluator = new RepeatableParamEvaluator(paramEvaluator);

  it('should test evaluate method performs when param.row length is 0', () => {
    const result = evaluator.evaluate(
      {},
      {
        'name': 'remove_properties',
        'type': 'RepeatableParam',
        'row': [],
        'input': [],
      } as unknown as RepeatableParam<any>,
      [],
    );

    expect(result).toEqual([]);
  });

  it('should test RepeatableParam contain the StringableParam type', () => {
    const result = evaluator.evaluate(
      {},
      removePropertyData as unknown as RepeatableParam<any>,
      [],
    );

    expect(result).toEqual([{ property: 'foo-1' }]);
  });

  it('should test RepeatableParam contain the PortSelectionParam type', () => {
    const result = evaluator.evaluate(
      {},
      mockPortMapData as unknown as RepeatableParam<any>,
      [],
    );

    expect(result).toEqual([
      { value: 22, port: 'unfiltered' },
      { value: 'id', port: 'outputzdbj' },
      { value: '222', port: 'outputzdbj' },
    ]);
  });

  it('should test RepeatableParam contain the RepeatableParam type', () => {
    const result = evaluator.evaluate(
      {},
      mockRepeatableData as unknown as RepeatableParam<any>,
      [],
    );

    expect(result).toEqual([
      { value: 'value-11', remove_properties: [{ property: 'property-11' }] },
      { value: 'value-22', remove_properties: [{ property: 'property-22' }] },
    ]);
  });

  it('recursive called count', () => {
    const spy = vi.spyOn(paramEvaluator, 'evaluate');
    evaluator.evaluate(
      {},
      mockRepeatableData as unknown as RepeatableParam<any>,
      [],
    );

    /**
     * count = 6 = (1                +  1                +  1                             ) * 2
     *             ([StringableParam] + [RepeatableParam] + [inner nested StringableParam]) * 2[repeatable value]
     */
    expect(spy).toHaveBeenCalledTimes(6);
    spy.mockRestore();
  });

  it('recursive called with correct params', () => {
    const spy = vi.spyOn(paramEvaluator, 'evaluate');
    evaluator.evaluate(
      {},
      mockRepeatableData as unknown as RepeatableParam<any>,
      [],
    );
    const calls = spy.mock.calls;

    expect(calls).toMatchInlineSnapshot(`
      [
        [
          {},
          {
            "input": {
              "rawValue": "value-11",
            },
            "name": "value",
            "type": "StringableParam",
          },
          [],
        ],
        [
          {},
          {
            "input": [
              {
                "property": {
                  "rawValue": "property-11",
                },
              },
            ],
            "name": "remove_properties",
            "row": [
              {
                "input": {
                  "rawValue": "id",
                },
                "name": "property",
                "type": "StringableParam",
              },
            ],
            "type": "RepeatableParam",
          },
          [],
        ],
        [
          {},
          {
            "input": {
              "rawValue": "property-11",
            },
            "name": "property",
            "type": "StringableParam",
          },
          [],
        ],
        [
          {},
          {
            "input": {
              "rawValue": "value-22",
            },
            "name": "value",
            "type": "StringableParam",
          },
          [],
        ],
        [
          {},
          {
            "input": [
              {
                "property": {
                  "rawValue": "property-22",
                },
              },
            ],
            "name": "remove_properties",
            "row": [
              {
                "input": {
                  "rawValue": "id",
                },
                "name": "property",
                "type": "StringableParam",
              },
            ],
            "type": "RepeatableParam",
          },
          [],
        ],
        [
          {},
          {
            "input": {
              "rawValue": "property-22",
            },
            "name": "property",
            "type": "StringableParam",
          },
          [],
        ],
      ]
    `);
    spy.mockRestore();
  });
});
