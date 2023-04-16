import axios from 'axios';

const openaiApiKey = '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';
const modelId = 'text-davinci-003';

async function generateChatCompletion(prompt: string) {
  const response = await axios.post(
    `https://api.openai.com/v1/engines/${modelId}/completions`,
    {
      prompt: `"${prompt}" levando em conta o que esta em aspas, o que a palavra de Deus poderia ajudar?`,
      max_tokens: 2000,
      n: 1,
      stop: [' Human:', ' AI:'],
      temperature: 0.9,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      }
    }
  );
  return response.data.choices[0].text.trim()
}

export { generateChatCompletion };
