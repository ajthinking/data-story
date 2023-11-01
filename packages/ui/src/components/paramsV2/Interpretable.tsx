export function Interpretable({value}: {value?: string}) {
  return (
    <div className="flex w-full">
      <input
        onChange={()=>{}}
        value={value || ''}
        className="border p-2 w-full">
      </input>
      <select
        className="text-xs appearance-none border p-2 focus:outline-none focus:ring focus:border-blue-300"
        onChange={(event) => {
          // setType(event.target.value as Type);
        }}
      >
        {['prop1', 'prop2', 'nested.prop'].map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <select
        className="text-xs appearance-none border p-2 focus:outline-none focus:ring focus:border-blue-300"
        onChange={(event) => {
          // setType(event.target.value as Type);
        }}
      >
        {['uppercase', 'lowercase', 'trim'].map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>      
    </div>
  );
}
