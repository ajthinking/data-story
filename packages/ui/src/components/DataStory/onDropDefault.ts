import {
  NodeDescription,
  jsonEvaluation,
  hjsonEvaluation,
  jsExpressionEvaluation,
  jsFunctionEvaluation,
  json_,
} from '@data-story/core';

export const fileDropper = {
  canHandle: (event) => {
    return event.dataTransfer.files.length > 0;
  },

  handle: (event, addNodeFromDescription) => {
    console.log('HANDLING IN FILE DROPPER')
    const files = event.dataTransfer.files;

    const file = files[0];
    if (file.type !== 'application/json') {
      console.error('You dragged and dropped a FILE TYPE not supported yet.');
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
            schema: {},
          }],
          params: [
            json_({
              name: 'data',
              help: 'You may use json, hson js function or expression',
              input: JSON.stringify(jsonFileContent, null, 2),
              evaluations: [
                { ...jsonEvaluation, selected: true },
                hjsonEvaluation,
                jsFunctionEvaluation,
                jsExpressionEvaluation,
              ],
            }),
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
  },
}

export const onDropDefault = (event, addNodeFromDescription) => {
  event.preventDefault();

  const handlers = [
    fileDropper,
  ]

  const handler = handlers.find(h => h.canHandle(event));
  if(!handler) {
    console.error('You dragged and dropped something not supported yet!');
    console.log(event)
    return;
  }

  handler.handle(event, addNodeFromDescription);
}