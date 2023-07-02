import { Configuration, OpenAIApi } from 'openai';
import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { ComputerConfig } from '../../types/ComputerConfig';
import { string } from '../../ParamBuilder';

export const AskChatGpt: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'AskChatGpt',
  inputs: ['input'],
  outputs: ['completions'],
  params: {
    prompt: string('prompt').value('What is the meaning of life?').get(),
  },
  category: 'API',

  async *run({ input, output }) {

    const openai = new OpenAIApi(
      new Configuration({
        apiKey: process.env.OPEN_AI_SECRET,
      })
    );

    while(true) {
      const [ { params: { prompt } } ] = input.pull(1)

      const completion = await openai.createCompletion({
        model: "text-davinci-003",
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
});
