import { Configuration, OpenAIApi } from 'openai';
import { ComputerConfig } from '../../../types/ComputerConfig';

export const AskChatGpt: ComputerConfig = {
  name: 'AskChatGpt',
  inputs: ['input'],
  outputs: ['completions'],
  params: [
    {
      name: 'prompt',
      label: 'Prompt',
      help: 'Chat prompt',
      inputMode: {
        type: 'Stringable',
        multiline: true,
        canInterpolate: true,
        interpolate: true,
        evaluations: [],
        casts: [],
        value: 'What is the meaning of life?',
      },
      alternativeInputModes: [],
    },    
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
