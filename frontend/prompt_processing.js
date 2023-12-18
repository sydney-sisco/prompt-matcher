import prompts from './src/prompts.json' assert { type: 'json' };

// console.log(prompts);

const domain = 'https://magic-8-ball.sfo3.cdn.digitaloceanspaces.com/';


const processPrompts = (prompts) => {
  return prompts.map((prompt) => {
    return {
      url: domain + prompt,
      prompt: prompt.replaceAll('_', ' ').replace('.png', '')
    };
  })
  .filter((prompt) => {
    // remove any prompt containing a double quote
    return !prompt.prompt.includes('"');
  })
}

const promptList = processPrompts(prompts);

// console.log(promptList);

// write promptList to file
import { writeFile } from 'fs/promises';

async function writeToFile(filename, data) {
  try {
    await writeFile(filename, JSON.stringify(data), 'utf8');
    console.log('Data written to file');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

const data = {
  key: 'value'
};

writeToFile('output.json', promptList);
