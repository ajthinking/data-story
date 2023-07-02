import fs from 'fs'
import { Configuration, OpenAIApi } from 'openai';

export const guessComputerContent = async (computerName: string) => {
  const prompt = fs.readFileSync(__dirname + '/prompt.md')
    .toString()
    .replace('__NAME__', computerName);

  const openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.OPEN_AI_SECRET,
    })
  );

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  if(!completion.data.choices.at(0)) throw Error("Could not get completion")
  
  const result = completion.data.choices.at(0)!.text!.trimStart();

  console.log(result)

  return result;
}