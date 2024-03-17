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
  }
}