export const normal = {
  property_a: 10000,
  property_b: 20000,
  property_c: 30000,
  property_d: 40000,
  property_e: 50000,
  property_f: 60000,
  property_g: 70000,
  property_h: 80000,
  property_i: 90000,
}

export const oversize = {
  normal: 'normal',
  ['long_'.repeat(20)]: 'normal', // Long key
  long_property: 'long_'.repeat(10000), // Long value
  normal2: 'normal',
}

export const createLargeColsFn = (count: number) => Array.from({ length: count }, (_, index) => ({
  [`column_${index}`]: `Value ${index}`,
})).reduce((acc, item) => {
  return { ...acc, ...item };
});

export const createLargeRows = (count: number) => Array.from({ length: count }, (_, index) => ({
  'foo1': 'bar1',
  'foo2': 'bar2',
  'foo3': 'bar3'
}));

export const address = {
  address: {
    street: '122\n Main St\nSuite 100\nAnytown',
    city: 'Anytown',
    state: 'Anystate',
    zipcode: '12344'
  }
}

export const booleanData = {
  booleanFalse: false,
  booleanTrue: true,
  StringFalse: 'false',
  StringTrue: 'true',
}

export const nested = {
  objectId: '123456789',
  properties: {
    firstname: 'John',
    lastname: 'Doe',
    email: '',
  },
  createdAt: '2021-01-01T00:00:00.000Z',
  updatedAt: '2021-01-01T00:00:00.000Z',
  associations: {
    contacts: [{
      id: '123456789',
      type: 'CONTACT_TO_COMPANY',
    }],
  },
  booleanFalse: false,
  booleanTrue: true,
  address: {
    street: '122 Main St\nSuite 100\nAnytown',
    city: 'Anytown',
    state: 'Anystate',
    zipcode: '12344'
  }
}

export const threeTierNested = [
  {
    'foo1': 'bar1',
    'foo2': 'bar2',
    'foo3': 'bar3'
  },
  {
    'foo1': 'bar1',
    'foo2': 'bar2',
    'foo3': 'bar3'
  },
  {
    'foo1': 'bar1',
    'foo2': 'bar2',
    'foo3': {
      'foo1': 'bar1',
      'foo2': 'bar2',
      'foo3': {
        'foo1': 'bar1',
        'foo2': 'bar2',
        'foo3': 'bar3'
      },
    },
  }
];
