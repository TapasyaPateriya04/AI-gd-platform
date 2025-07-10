import { OpenAI } from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const getAIResponse = async (message, topic) => {
  const res = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: `You are participating in a group discussion on "${topic}"` },
      { role: 'user', content: message }
    ]
  });
  return res.choices[0].message.content;
};
