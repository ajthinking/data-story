import { mapToRecord } from './mapToRecord';

it('converts a map to a record', () => {
  const map = new Map<string, number>()
    .set('a', 1)

  const record: Record<string, number> = mapToRecord(map)

  expect(record).toMatchObject({
    a: 1
  })
});