import { when } from '../../support/computerTester/ComputerTester';
import { Describe } from './Describe';

it('describes occurances', async () => {
  await when(Describe)
    .hasDefaultParams()
    .getsInput([
      {id: 1, isCool: true, name: {first: 'John', last: 'Doe'}},
      {id: 2, isCool: true, name: {first: 'Jane', last: 'Doe'}},
      {id: 3, isCool: false, name: {first: 'Copy', last: 'Cat'}},
    ])
    .doRun()
    .expectOutputs({
      truncated: [
        {
          id: {
            1: 1,
            2: 1,
            3: 1,
          },
          isCool: {
            true: 2,
            false: 1,
          },
          name: {
            first: {
              John: 1,
              Jane: 1,
              Copy: 1,
            },
            last: {
              Doe: 2,
              Cat: 1,
            },
          },
        }
      ],
      full: [
        {
          id: {
            1: 1,
            2: 1,
            3: 1,
          },
          isCool: {
            true: 2,
            false: 1,
          },
          name: {
            first: {
              John: 1,
              Jane: 1,
              Copy: 1,
            },
            last: {
              Doe: 2,
              Cat: 1,
            },
          },
        }
      ]
    })
    .ok()
})

it('describes occurances at a path', async () => {
  await when(Describe)
    .hasParams({
      path: 'name'
    })
    .getsInput([
      {id: 1, isCool: true, name: {first: 'John', last: 'Doe'}},
      {id: 2, isCool: true, name: {first: 'Jane', last: 'Doe'}},
      {id: 3, isCool: false, name: {first: 'Copy', last: 'Cat'}},
    ])
    .doRun()
    .expectOutputs({
      truncated: [
        {
          first: {
            John: 1,
            Jane: 1,
            Copy: 1,
          },
          last: {
            Doe: 2,
            Cat: 1,
          },
        }
      ],
      full: [
        {
          first: {
            John: 1,
            Jane: 1,
            Copy: 1,
          },
          last: {
            Doe: 2,
            Cat: 1,
          },
        }
      ],
    })
    .ok()
})

it('can truncate the description', async () => {
  await when(Describe)
    .hasParams({
      truncate_limit: 3
    })
    .getsInput([
      {id: 1, isCool: true},
      {id: 2, isCool: true},
      {id: 3, isCool: true},
      {id: 4, isCool: true},
      {id: 5, isCool: false},
    ])
    .doRun()
    .expectOutputs({
      truncated: [
        {
          id: {
            1: 1,
            2: 1,
            3: 1,
            'OTHER_VALUES': 2,
          },
          isCool: {
            true: 4,
            false: 1,
          },
        }
      ],
      full: [
        {
          id: {
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 1,
          },
          isCool: {
            true: 4,
            false: 1,
          },
        }
      ],
    })
    .ok()
})