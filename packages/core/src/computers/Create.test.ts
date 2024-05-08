import { hjsonEvaluation } from '../Param/evaluations/hjsonEvaluation';
import { jsFunctionEvaluation } from '../Param/evaluations/jsFunctionEvaluation';
import { jsExpressionEvaluation } from '../Param/evaluations/jsExpressionEvaluation'
import { when } from '../support/computerTester/ComputerTester';
import { multiline } from '../utils/multiline';
import { Create } from './Create';
import Hjson from '@data-story/hjson';

it('reads json by default', async () => {
  await when(Create)
    .hasParams({ data: JSON.stringify([{a: 1}]) })
    .doRun()
    .expectOutput([{ a: 1 }])
    .ok()
})

it('wraps non array inputs', async () => {
  await when(Create)
    .hasParams({ data: JSON.stringify({a: 1}) })
    .doRun()
    .expectOutput([{a: 1}])
    .ok()
})

it('can parse hjson', async () => {
  await when(Create)
    .hasParam({
      name: 'data',
      value: '{ cool: "yes" }',
      evaluations: [
        { ...hjsonEvaluation, selected: true }
      ]
    })
    .doRun()
    .expectOutput([{ cool: 'yes' }])
    .ok()
})

it('can parse js function', async () => {
  await when(Create)
    .hasParam({
      name: 'data',
      value: '() => ({ sum: 1 + 1 })',
      evaluations: [
        { ...jsFunctionEvaluation, selected: true }
      ]
    })
    .doRun()
    .expectOutput([{ sum: 2 }])
    .ok()
})

it('can parse js expression', async () => {
  await when(Create)
    .hasParam({
      name: 'data',
      value: multiline`
      ({
        interesting: 'yes'
      })`,
      evaluations: [
        { ...jsExpressionEvaluation, selected: true }
      ]
    })
    .doRun()
    .expectOutput([{ interesting: 'yes' }])
    .ok()
})

it('cannot directly parse js objects starting with bracket', async () => {
  await when(Create)
    .hasParam({
      name: 'data',
      value: multiline`
      // JS eval thinks this is a block followed by a labeled statment
      // Probably not what you would expect but that is how eval works
      {
        label: 'statement'
      }`,
      evaluations: [
        { ...jsExpressionEvaluation, selected: true }
      ]
    })
    .doRun()
    // TODO this should throw an error.
    // We only allow object items.
    .expectOutput([ 'statement' ])
    .ok()
})