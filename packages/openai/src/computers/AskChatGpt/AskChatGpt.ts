import { Computer } from '@data-story/core';
import { Configuration, OpenAIApi } from 'openai';
import { createDefaultStringable } from '@data-story/core';

export const AskChatGpt: Computer = {
  name: 'AskChatGpt',
  label: 'AskChatGpt',
  tags: [],
  inputs: [{
    name: 'input',
    schema: {}
  }],
  outputs: [{
    name: 'completions',
    schema: {}
  }],
  params: [
    createDefaultStringable({
      name: 'prompt',
      label: 'Prompt',
      help: 'Chat prompt',
      multiline: true,
      canInterpolate: true,
      interpolate: true,
      evaluations: [],
      casts: [],
      value: 'What is the meaning of life?',
    }),
  ],

  category: 'API',

  async *run({ input, output }) {
    if(!process.env.OPEN_AI_SECRET) throw Error('OPEN_AI_SECRET env not set')

    const openai = new OpenAIApi(
      new Configuration({
        apiKey: process.env.OPEN_AI_SECRET,
      })
    );

    while(true) {
      const [ incoming ] = input.pull(1)

      const prompt = incoming.params.prompt as string

      const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        temperature: 0,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });

      output.pushTo('completions', completion.data.choices)

      yield;
    }
  },
};
