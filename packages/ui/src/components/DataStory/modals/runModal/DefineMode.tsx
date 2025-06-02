import { str } from '@data-story/core';

const DefineMode = ({ params, setParams, setDefineMode }) => {
  const sampleParam = str({
    name: 'sampleParam',
    label: 'sampleParam',
    help: '',
    multiline: false,
    canInterpolate: true,
    interpolate: true,
    evaluations: [],
    value: 'default value',
  })

  const content = params.length > 0 ? params : [sampleParam];

  const handleChange = (e) => {
    try {
      const newParams = JSON.parse(e.target.value);
      setParams(newParams);
    } catch (e) {
      console.log('Invalid JSON when trying to set params')
    }
  }

  return (
    <div>
      <div
        className="flex flex-col"
      >
        <label className="mt-2 mb-1 text-xs text-gray-400">Input Schema</label>
        <textarea
          placeholder={JSON.stringify(sampleParam, null, 2)}
          className="w-full bg-white h-48 text-xs text-gray-400 px-2 py-1 border rounded border-blue-200"
          value={JSON.stringify(content, null, 2)}
          onChange={handleChange}
        ></textarea>
      </div>
    </div>
  );
};

export default DefineMode;
