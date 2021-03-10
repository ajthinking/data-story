import Feature from '../../../src/core/Feature'

const variations = [
    'str',
    123,
    [],
    {},
    {foo: 'bar'},
]
test('a Feature can be instantiate from various types', () => {
    variations.forEach(value => {
        expect(new Feature(value)).toBeInstanceOf(Feature)
    })
});

test('a Feature can hold attributes', () => {
    let feature = new Feature({
        foo: 'bar'
    })

    expect(feature.get('foo')).toBe('bar')
});