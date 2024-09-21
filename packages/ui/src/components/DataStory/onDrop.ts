import {
  NodeDescription,
  jsonEvaluation,
  hjsonEvaluation,
  jsExpressionEvaluation,
  jsFunctionEvaluation,
  json_
} from '@data-story/core';

export const onDrop = (event, addNodeFromDescription) => {
  event.preventDefault();

  const files = event.dataTransfer.files;

  if (files.length === 0) {
    console.error('You dragged and dropped something not supported yet.');
    console.log(event)
    console.log(JSON.stringify(event))
    return
  }

  const file = files[0];
  if (file.type !== 'application/json') {
    console.error('You dragged and dropped a file type not supported yet.');
    return
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      // Parse the JSON content
      const jsonFileContent = JSON.parse(event?.target?.result as string);

      // This is a hack, consider the following:
      // The UI now hardcodes the Create node details
      // We don't know if the server even provides a Create node
      // Furthermore, the definition of the Create node might change
      // Consider having datastory register DnD-ables?
      const description: NodeDescription = {
        name: 'Create',
        label: file.name,
        inputs: [],
        outputs: [{
          name: 'output',
          schema: {}
        }],
        params: [
          json_({
            name: 'data',
            help: 'You may use json, hson js function or expression',
            value: JSON.stringify(jsonFileContent, null, 2),
            evaluations: [
              { ...jsonEvaluation, selected: true },
              hjsonEvaluation,
              jsFunctionEvaluation,
              jsExpressionEvaluation,
            ]
          })
        ],
      }

      addNodeFromDescription(description);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };

  reader.onerror = (error) => {
    console.error('Error reading file:', error);
  };

  // Read the file content
  reader.readAsText(file);
}

export const onDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};