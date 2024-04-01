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
    street: '122 Main St\nSuite 100\n Anytown',
    city: 'Anytown',
    state: 'Anystate',
    zipcode: '12344'
  }
}
