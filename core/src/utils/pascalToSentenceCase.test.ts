import { pascalToSentenceCase } from './pascalToSentenceCase'

it('works for InputDevice', () => {
  const output = pascalToSentenceCase('InputDevice')
  
  expect(output).toEqual('Input Device')
})

it('separates uppercase chars next to eachother', () => {
  const output = pascalToSentenceCase('OutputJSON')
  
  expect(output).toEqual('Output J S O N')
})