import { when } from '../../support/computerTester/ComputerTester';
import { CreateAttribute } from './CreateAttribute';

it('adds an attribute to objects', async () => {
  await when(CreateAttribute)
    .hasParams({
      key: "prio",
      value: "zero"
    })
    .getsInput([{}])
    .doRun()
    .expectOutput([{
      prio: "zero"
    }])
    .ok()
})

it('adds an interpolated attribute to objects', async () => {
  await when(CreateAttribute)
    .hasParams({
      key: "message",
      value: "Hi ${name}!"
    })
    .getsInput([{name: 'Bob'}])
    .doRun()
    .expectOutput([{
      message: "Hi Bob!"
    }])
    .ok()
})

it('adds attribute to objects computed by function evalMath', async () => {
  await when(CreateAttribute)
    .hasParams({
      key: "square",
      value: "@evalMath(${nbr}*${nbr})"
    })
    .getsInput([{nbr: 3}])
    .doRun()
    .expectOutput([{
      nbr: 3,
      square: "9"
    }])
    .ok()
})