import { multiline } from './multiline';


it('removes first line when it is empty', () => {
  const result = multiline`
    content
  `;

  expect(result).toEqual('content\n');
});

it('bases indentation on the first content line', () => {
  const result = multiline`
    heading
      p1
      p2
  `;

  expect(result).toEqual('heading\n  p1\n  p2\n');
});

it('throws if it gets content on first line', () => {
  expect(() => multiline`content-on-first-line`).toThrow();
});