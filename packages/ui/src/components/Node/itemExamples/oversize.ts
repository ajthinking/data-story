export const oversize = {
  normal: 'normal',
  long_property: 'long_'.repeat(10000), // Long value
  normal2: 'normal',
  ['long_'.repeat(20)]: 'normal', // Long key
}